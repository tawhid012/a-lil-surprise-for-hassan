import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const USER_DATA = '/tmp/chrome-bddy-e2e';
fs.rmSync(USER_DATA, { recursive: true, force: true });

const chrome = spawn(CHROME, [
  '--headless=new',
  '--remote-debugging-port=9229',
  `--user-data-dir=${USER_DATA}`,
  '--no-first-run',
  '--no-default-browser-check',
  'about:blank'
], { stdio: 'ignore' });

async function getWsUrl() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9229/json/list');
      const list = await res.json();
      const page = list.find((t) => t.type === 'page');
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error('Chrome DevTools failed to start');
}

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.consoleErrors = [];
    ws.addEventListener('message', (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      } else if (msg.method === 'Runtime.exceptionThrown') {
        this.consoleErrors.push(msg.params.exceptionDetails.text);
      }
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true
    });
    if (res.exceptionDetails) {
      throw new Error(res.exceptionDetails.exception?.description || res.exceptionDetails.text);
    }
    return res.result?.value;
  }
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  const wsUrl = await getWsUrl();
  const ws = new WebSocket(wsUrl);
  await new Promise((r) => ws.addEventListener('open', r));
  const cdp = new CDP(ws);
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1280, height: 800, deviceScaleFactor: 1, mobile: false
  });
  await cdp.send('Page.navigate', { url: 'http://127.0.0.1:8888/' });
  await wait(1200);

  // 1. Wrong PIN test (also triggers first-interaction BGM start if browser blocked unmuted autoplay on load)
  const inputRect = await cdp.eval(`(() => {
    const r = document.getElementById('password-input').getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  })()`);
  await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: inputRect.x, y: inputRect.y, button: 'left', clickCount: 1 });
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: inputRect.x, y: inputRect.y, button: 'left', clickCount: 1 });
  await cdp.eval(`
    document.getElementById('password-input').value = '000000';
    document.getElementById('password-form').requestSubmit();
  `);
  await wait(600);
  const wrongErr = await cdp.eval(`document.getElementById('password-error').textContent`);
  if (!wrongErr) throw new Error('Expected error message for wrong PIN');

  // 2. Valid PIN unlock (trusted Enter/click so BGM auto-starts!)
  await cdp.eval(`document.getElementById('password-input').value = '061209';`);
  const submitRect = await cdp.eval(`(() => {
    const r = document.getElementById('password-submit').getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  })()`);
  await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: submitRect.x, y: submitRect.y, button: 'left', clickCount: 1 });
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: submitRect.x, y: submitRect.y, button: 'left', clickCount: 1 });
  await wait(1200);
  const scene1Active = await cdp.eval(`!document.getElementById('scene-1').hidden`);
  if (!scene1Active) throw new Error('Scene 1 did not activate after valid PIN');

  // 3. Check custom BGM player auto-started, loops, and Spotify is removed
  const bgmInfo = await cdp.eval(`(() => {
    const hasSpotify = Boolean(document.getElementById('spotify-embed'));
    const dock = document.getElementById('music-dock');
    const audio = document.getElementById('bgm-audio');
    return {
      hasSpotify,
      dockVisible: !dock.hidden,
      loop: audio.loop,
      paused: audio.paused,
      duration: audio.duration,
      src: audio.src
    };
  })()`);
  if (bgmInfo.hasSpotify || !bgmInfo.dockVisible || !bgmInfo.loop || bgmInfo.paused || !Number.isFinite(bgmInfo.duration) || bgmInfo.duration < 100) {
    throw new Error('Custom BGM check failed: ' + JSON.stringify(bgmInfo));
  }

  // 4. Scene 1: Blocked NEXT before blow, then Blow candle -> NEXT -> Scene 2
  await cdp.eval(`document.getElementById('btn-opening-next').click()`);
  await wait(120);
  const stillScene1 = await cdp.eval(`!document.getElementById('scene-1').hidden && !document.getElementById('candle-lock-hint').hidden`);
  if (!stillScene1) throw new Error('NEXT should be blocked before blowing candle');
  await cdp.eval(`document.getElementById('btn-blow-candle').click()`);
  await wait(200);
  const blown = await cdp.eval(`document.getElementById('opening-cake').classList.contains('is-blown') && document.getElementById('btn-opening-next').getAttribute('aria-disabled') === 'false'`);
  if (!blown) throw new Error('Blowing candle did not unlock NEXT');
  await cdp.eval(`document.getElementById('btn-opening-next').click()`);
  await wait(500);

  // 5. Scene 2: NO -> crying -> TRY AGAIN -> YES -> Scene 3
  await cdp.eval(`document.getElementById('btn-accept-no').click()`);
  await wait(150);
  const noText = await cdp.eval(`document.getElementById('accept-title').textContent`);
  if (!noText.includes('WHY DID YOU CLICK NO')) throw new Error('NO state failed');
  await cdp.eval(`document.getElementById('btn-accept-retry').click()`);
  await wait(150);
  await cdp.eval(`document.getElementById('btn-accept-yes').click()`);
  await wait(500);

  // 6. Scene 3: Envelope, Flowers, Box
  await cdp.eval(`document.getElementById('hub-open-envelope').click()`);
  await wait(150);
  await cdp.eval(`document.getElementById('envelope-trigger').click()`);
  await wait(900);
  const letterText = await cdp.eval(`document.getElementById('letter-sheet').textContent`);
  if (!letterText.includes('Dear my kucchupucchu') || !letterText.includes('Manisha')) {
    throw new Error('Letter content missing');
  }
  await cdp.eval(`document.querySelector('#subview-envelope .btn-back-hub').click()`);
  await wait(150);

  await cdp.eval(`document.getElementById('hub-open-flowers').click()`);
  await wait(150);
  await cdp.eval(`document.querySelector('#subview-flowers .btn-back-hub').click()`);
  await wait(150);

  await cdp.eval(`document.getElementById('hub-open-box').click()`);
  await wait(150);
  await cdp.eval(`document.getElementById('btn-reveal-heart-note').click()`);
  await wait(150);
  const boxOk = await cdp.eval(`!document.getElementById('heart-revealed-note').hidden`);
  if (!boxOk) throw new Error('Heart note did not reveal');
  await cdp.eval(`document.querySelector('#subview-box .btn-back-hub').click()`);
  await wait(150);

  // Verify gallery is still blocked until all 4 memory keepsakes are read
  await cdp.eval(`document.getElementById('btn-hub-to-gallery').click()`);
  await wait(120);
  const blockedBeforeMemories = await cdp.eval(`!document.getElementById('scene-3').hidden && document.getElementById('scene-4').hidden`);
  if (!blockedBeforeMemories) throw new Error('Gallery should be blocked before reading all 4 memory keepsakes');

  // Open and close all 4 memory keepsakes
  for (let m = 0; m < 4; m++) {
    await cdp.eval(`document.querySelectorAll('.memory-slip-card')[${m}].click()`);
    await wait(150);
    const noteVisible = await cdp.eval(`!document.getElementById('subview-memory').hidden && document.getElementById('memory-note-body').textContent.length > 20`);
    if (!noteVisible) throw new Error('Memory note did not reveal for index ' + m);
    if (m === 0) {
      await cdp.eval(`document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))`);
    } else {
      await cdp.eval(`document.getElementById('btn-memory-close-x').click()`);
    }
    await wait(120);
  }
  const galleryUnlocked = await cdp.eval(`document.getElementById('btn-hub-to-gallery').getAttribute('aria-disabled') === 'false'`);
  if (!galleryUnlocked) throw new Error('Gallery did not unlock after opening all gifts and memories');

  // 7. Scene 4: All 4 photos + lightbox + Escape
  await cdp.eval(`document.getElementById('btn-hub-to-gallery').click()`);
  await wait(500);
  const captions = [];
  for (let i = 0; i < 4; i++) {
    await wait(350);
    const p = await cdp.eval(`(() => {
      const img = document.querySelector('#album-frame-wrap img');
      const cap = document.querySelector('.polaroid-caption').textContent;
      return { complete: img.complete, naturalWidth: img.naturalWidth, cap };
    })()`);
    if (!p.complete || p.naturalWidth === 0) throw new Error('Photo failed to load: ' + JSON.stringify(p));
    captions.push(p.cap);
    if (i < 3) await cdp.eval(`document.getElementById('gallery-next').click()`);
  }
  if (new Set(captions).size !== 4) throw new Error('Duplicate captions found');

  await cdp.eval(`document.getElementById('polaroid-zoom-btn').click()`);
  await wait(150);
  const lbOpen = await cdp.eval(`!document.getElementById('photo-lightbox').hidden`);
  if (!lbOpen) throw new Error('Lightbox did not open');
  await cdp.eval(`document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))`);
  await wait(150);
  const lbClosed = await cdp.eval(`document.getElementById('photo-lightbox').hidden`);
  if (!lbClosed) throw new Error('Lightbox did not close on Escape');

  // 8. Scene Story: A Page From My Heart -> Scene 5
  await cdp.eval(`document.getElementById('btn-gallery-continue').click()`);
  await wait(500);
  const storyOk = await cdp.eval(`(() => {
    const label = document.getElementById('story-label').textContent;
    const title = document.getElementById('story-title').textContent;
    const marks = Array.from(document.querySelectorAll('#story-body .ink-highlight')).map(m => m.textContent);
    const sig = document.getElementById('story-signature').textContent;
    return label === 'A PAGE FROM MY HEART ♡' && title.includes('Somehow, I got you') && marks.length === 2 && sig === '— Manisha ♡';
  })()`);
  if (!storyOk) throw new Error('Story section verification failed');

  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 390, height: 844, deviceScaleFactor: 2, mobile: true
  });
  await wait(150);
  const storyMobileOverflow = await cdp.eval(`document.documentElement.scrollWidth > window.innerWidth`);
  if (storyMobileOverflow) throw new Error('Story section overflowed on 390x844 mobile');

  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1280, height: 800, deviceScaleFactor: 1, mobile: false
  });
  await cdp.eval(`document.getElementById('btn-story-continue').click()`);
  await wait(500);

  // 8b. Scene Voice: Manisha's Voice Note
  const voiceUiOk = await cdp.eval(`(() => {
    const title = document.getElementById('voice-title').textContent;
    const label = document.getElementById('voice-card-label').textContent;
    const cap = document.getElementById('voice-caption').textContent;
    const bars = document.querySelectorAll('#voice-waveform .voice-bar').length;
    return title.includes('in my own voice') && label.includes('Manisha') && cap.includes('Just for you, bacha') && bars === 32;
  })()`);
  if (!voiceUiOk) throw new Error('Voice note UI check failed');

  // Test play, pause, seek, and duration using a real trusted CDP mouse click
  const btnRect = await cdp.eval(`(() => {
    const r = document.getElementById('voice-play-btn').getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  })()`);
  await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: btnRect.x, y: btnRect.y, button: 'left', clickCount: 1 });
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: btnRect.x, y: btnRect.y, button: 'left', clickCount: 1 });
  await wait(800);
  const playbackState = await cdp.eval(`(() => {
    const a = document.getElementById('voice-audio');
    return { paused: a.paused, duration: a.duration, currentTime: a.currentTime, errHidden: document.getElementById('voice-error').hidden };
  })()`);
  if (!playbackState.errHidden || playbackState.paused || !Number.isFinite(playbackState.duration) || playbackState.duration < 35) {
    throw new Error('Voice audio metadata/playback failed: ' + JSON.stringify(playbackState));
  }
  await cdp.eval(`
    const s = document.getElementById('voice-scrubber');
    s.value = '50';
    s.dispatchEvent(new Event('input'));
  `);
  await wait(150);
  const seekedTime = await cdp.eval(`document.getElementById('voice-audio').currentTime`);
  if (seekedTime < 15) throw new Error('Seek failed: ' + seekedTime);
  await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: btnRect.x, y: btnRect.y, button: 'left', clickCount: 1 });
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: btnRect.x, y: btnRect.y, button: 'left', clickCount: 1 });
  await wait(150);

  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 390, height: 844, deviceScaleFactor: 2, mobile: true
  });
  await wait(150);
  const voiceMobileOverflow = await cdp.eval(`document.documentElement.scrollWidth > window.innerWidth`);
  if (voiceMobileOverflow) throw new Error('Voice scene overflowed on 390x844 mobile');

  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1280, height: 800, deviceScaleFactor: 1, mobile: false
  });
  await cdp.eval(`document.getElementById('btn-voice-continue').click()`);
  await wait(700);

  // 9. Scene 5: Final Surprise + Replay
  const finalOk = await cdp.eval(`(() => {
    const t = document.getElementById('final-title').textContent;
    const e = document.getElementById('final-emphasis').textContent;
    const s = document.getElementById('final-signature').textContent;
    const c = document.getElementById('final-credit').textContent;
    return t === 'One last thing, my bacha…' && e.includes('Always rooting for you') && s === '— Manisha ♡' && c === 'Gifted by Manisha';
  })()`);
  if (!finalOk) throw new Error('Final surprise content mismatch');

  // 9. Mobile 390x844 overflow check
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 390, height: 844, deviceScaleFactor: 2, mobile: true
  });
  await wait(200);
  const mobileOverflow = await cdp.eval(`document.documentElement.scrollWidth > window.innerWidth`);
  if (mobileOverflow) throw new Error('Horizontal overflow detected on 390x844 mobile');

  // Replay
  await cdp.eval(`document.getElementById('btn-replay').click()`);
  await wait(500);
  const replayed = await cdp.eval(`!document.getElementById('scene-1').hidden`);
  if (!replayed) throw new Error('Replay did not return to Scene 1');

  console.log('CHROME_E2E_PASS', JSON.stringify({ bgmInfo, captionsCount: captions.length, mobileOverflow, consoleErrors: cdp.consoleErrors }));
  ws.close();
} finally {
  chrome.kill('SIGKILL');
  fs.rmSync(USER_DATA, { recursive: true, force: true });
}

