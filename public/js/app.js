import {
  createBouquetSVG,
  createBuntingSVG,
  createCakeSVG,
  createCornerDecorSVG,
  createCuteDoodleSVG,
  createEnvelopeObjectSVG,
  createFinalKeepsakeSVG,
  createGateEmblemSVG,
  createMemoryKeepsakeSVG,
  createNavyGiftBoxSVG,
  createPressedFlowerSVG,
  createVinylSVG
} from './illustrations.js';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const state = {
  content: null,
  sessionToken: '',
  currentScene: 'scene-gate',
  isTransitioning: false,
  galleryIndex: 0,
  viewedPhotos: new Set(),
  visitedGifts: new Set(),
  envelopeOpened: false,
  confettiRaf: null,
  lastFocusedBeforeLightbox: null
};

const el = {
  cornerTL: document.getElementById('corner-tl'),
  cornerTR: document.getElementById('corner-tr'),
  gateIllustration: document.getElementById('gate-illustration'),
  passwordForm: document.getElementById('password-form'),
  passwordInput: document.getElementById('password-input'),
  togglePassword: document.getElementById('toggle-password'),
  passwordError: document.getElementById('password-error'),
  passwordSubmit: document.getElementById('password-submit'),

  musicDock: document.getElementById('music-dock'),
  bgmPlayerBar: document.getElementById('bgm-player-bar'),
  bgmToggleBtn: document.getElementById('bgm-toggle-btn'),
  bgmEq: document.getElementById('bgm-eq'),
  bgmStatusText: document.getElementById('bgm-status-text'),
  bgmAudio: document.getElementById('bgm-audio'),

  openingBunting: document.getElementById('opening-bunting'),
  openingEyebrow: document.getElementById('opening-eyebrow'),
  openingCake: document.getElementById('opening-cake'),
  openingTitle: document.getElementById('opening-title'),
  openingSubtitle: document.getElementById('opening-subtitle'),
  btnBlowCandle: document.getElementById('btn-blow-candle'),
  btnOpeningNext: document.getElementById('btn-opening-next'),
  candleLockHint: document.getElementById('candle-lock-hint'),

  acceptTitle: document.getElementById('accept-title'),
  acceptDoodle: document.getElementById('accept-doodle'),
  acceptChoices: document.getElementById('accept-choices'),
  btnAcceptYes: document.getElementById('btn-accept-yes'),
  btnAcceptNo: document.getElementById('btn-accept-no'),
  acceptRetryWrap: document.getElementById('accept-retry-wrap'),
  btnAcceptRetry: document.getElementById('btn-accept-retry'),

  hubView: document.getElementById('hub-view'),
  artHubEnvelope: document.getElementById('art-hub-envelope'),
  artHubFlowers: document.getElementById('art-hub-flowers'),
  artHubBox: document.getElementById('art-hub-box'),
  hubOpenEnvelope: document.getElementById('hub-open-envelope'),
  hubOpenFlowers: document.getElementById('hub-open-flowers'),
  hubOpenBox: document.getElementById('hub-open-box'),
  btnHubToGallery: document.getElementById('btn-hub-to-gallery'),
  hubLockHint: document.getElementById('hub-lock-hint'),

  subviewEnvelope: document.getElementById('subview-envelope'),
  subviewFlowers: document.getElementById('subview-flowers'),
  subviewBox: document.getElementById('subview-box'),
  subviewMemory: document.getElementById('subview-memory'),
  memoryGiftsTitle: document.getElementById('memory-gifts-title'),
  memoryGiftsSubtitle: document.getElementById('memory-gifts-subtitle'),
  memoryKeepsakesGrid: document.getElementById('memory-keepsakes-grid'),
  memoryNoteTag: document.getElementById('memory-note-tag'),
  memoryNoteTitle: document.getElementById('memory-note-title'),
  memoryNoteBody: document.getElementById('memory-note-body'),
  btnMemoryCloseX: document.getElementById('btn-memory-close-x'),
  artCoolDoodle: document.getElementById('art-cool-doodle'),
  artBouquetLarge: document.getElementById('art-bouquet-large'),
  artVinyl: document.getElementById('art-vinyl'),
  btnRevealHeartNote: document.getElementById('btn-reveal-heart-note'),
  heartRevealedNote: document.getElementById('heart-revealed-note'),
  artArmsOpen: document.getElementById('art-arms-open'),

  envelopeTrigger: document.getElementById('envelope-trigger'),
  envelopePrompt: document.getElementById('envelope-prompt'),
  letterSheet: document.getElementById('letter-sheet'),
  letterSalutation: document.getElementById('letter-salutation'),
  letterBody: document.getElementById('letter-body'),
  letterClosing: document.getElementById('letter-closing'),
  letterSignature: document.getElementById('letter-signature'),

  galleryTitle: document.getElementById('gallery-title'),
  gallerySubtitle: document.getElementById('gallery-subtitle'),
  scrapbookAlbum: document.getElementById('scrapbook-album'),
  albumFrameWrap: document.getElementById('album-frame-wrap'),
  galleryDots: document.getElementById('gallery-dots'),
  galleryCounter: document.getElementById('gallery-counter'),
  galleryPrev: document.getElementById('gallery-prev'),
  galleryNext: document.getElementById('gallery-next'),
  btnGalleryBack: document.getElementById('btn-gallery-back'),
  btnGalleryContinue: document.getElementById('btn-gallery-continue'),
  galleryLockHint: document.getElementById('gallery-lock-hint'),

  storyFlower: document.getElementById('story-flower'),
  storyLabel: document.getElementById('story-label'),
  storyTitle: document.getElementById('story-title'),
  storyBody: document.getElementById('story-body'),
  storySignature: document.getElementById('story-signature'),
  btnStoryBack: document.getElementById('btn-story-back'),
  btnStoryContinue: document.getElementById('btn-story-continue'),

  voiceCardLabel: document.getElementById('voice-card-label'),
  voiceTitle: document.getElementById('voice-title'),
  voiceSubtitle: document.getElementById('voice-subtitle'),
  voicePlayBtn: document.getElementById('voice-play-btn'),
  voiceWaveform: document.getElementById('voice-waveform'),
  voiceScrubber: document.getElementById('voice-scrubber'),
  voiceTimeCurrent: document.getElementById('voice-time-current'),
  voiceTimeTotal: document.getElementById('voice-time-total'),
  voiceCaption: document.getElementById('voice-caption'),
  voiceError: document.getElementById('voice-error'),
  voiceRetryBtn: document.getElementById('voice-retry-btn'),
  voiceAudio: document.getElementById('voice-audio'),
  btnVoiceBack: document.getElementById('btn-voice-back'),
  btnVoiceContinue: document.getElementById('btn-voice-continue'),

  lightbox: document.getElementById('photo-lightbox'),
  lightboxBackdrop: document.getElementById('lightbox-backdrop'),
  lightboxClose: document.getElementById('lightbox-close'),
  lightboxImg: document.getElementById('lightbox-img'),
  lightboxCaption: document.getElementById('lightbox-caption'),
  lightboxPrev: document.getElementById('lightbox-prev'),
  lightboxNext: document.getElementById('lightbox-next'),

  confettiCanvas: document.getElementById('confetti-canvas'),
  finalIllustration: document.getElementById('final-illustration'),
  finalEyebrow: document.getElementById('final-eyebrow'),
  finalTitle: document.getElementById('final-title'),
  finalMessage: document.getElementById('final-message'),
  finalEmphasis: document.getElementById('final-emphasis'),
  finalSignature: document.getElementById('final-signature'),
  finalCredit: document.getElementById('final-credit'),
  btnReplay: document.getElementById('btn-replay')
};

function goToScene(nextId) {
  if (state.isTransitioning || state.currentScene === nextId) return;
  const currentEl = document.getElementById(state.currentScene);
  const nextEl = document.getElementById(nextId);
  if (!nextEl) return;

  state.isTransitioning = true;
  if (currentEl) currentEl.classList.remove('is-active');

  const delay = prefersReducedMotion() ? 10 : 260;
  window.setTimeout(() => {
    if (currentEl) currentEl.hidden = true;
    nextEl.hidden = false;
    void nextEl.offsetWidth;
    nextEl.classList.add('is-active');
    state.currentScene = nextId;
    state.isTransitioning = false;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });

    if (state.currentScene === 'scene-voice' && nextId !== 'scene-voice') {
      stopVoiceNote();
    }

    if (nextId === 'scene-5') {
      startConfetti();
    } else {
      stopConfetti();
    }
  }, delay);
}

function showHubSubview(subviewEl) {
  el.hubView.hidden = true;
  el.subviewEnvelope.hidden = true;
  el.subviewFlowers.hidden = true;
  el.subviewBox.hidden = true;
  el.subviewMemory.hidden = true;
  subviewEl.hidden = false;
}

function showGateError(message) {
  el.passwordError.textContent = message;
  el.passwordError.hidden = false;
  const card = el.passwordForm.closest('.paper-sheet');
  if (card && !prefersReducedMotion()) {
    card.classList.remove('shake');
    void card.offsetWidth;
    card.classList.add('shake');
  }
}

function clearGateError() {
  el.passwordError.hidden = true;
  el.passwordError.textContent = '';
}

async function loadProtectedContent() {
  const headers = state.sessionToken
    ? { Authorization: `Bearer ${state.sessionToken}` }
    : {};
  const res = await fetch('/api/content', { credentials: 'same-origin', headers });
  if (!res.ok) throw new Error(`Unable to load content (${res.status})`);
  const data = await res.json();
  if (!data.ok || !data.content) throw new Error('Invalid content payload');
  state.content = data.content;
  hydrateExperience(state.content);
  goToScene('scene-1');
}

function getProtectedUrl(basePath) {
  if (!state.sessionToken) return basePath;
  const sep = basePath.includes('?') ? '&' : '?';
  return `${basePath}${sep}token=${encodeURIComponent(state.sessionToken)}`;
}

function hydrateExperience(c) {
  // Scene 1
  el.openingBunting.innerHTML = createBuntingSVG();
  el.openingCake.innerHTML = createCakeSVG();
  el.openingTitle.textContent = c.opening.title;
  el.openingSubtitle.textContent = c.opening.subtitle;

  // Scene 2
  el.acceptDoodle.innerHTML = createCuteDoodleSVG('pleading');

  // Scene 3 Hub & Subviews
  el.artHubEnvelope.innerHTML = createEnvelopeObjectSVG();
  el.artHubFlowers.innerHTML = createBouquetSVG();
  el.artHubBox.innerHTML = createNavyGiftBoxSVG();
  el.artCoolDoodle.innerHTML = createCuteDoodleSVG('cool');
  el.artBouquetLarge.innerHTML = createBouquetSVG();
  el.artVinyl.innerHTML = createVinylSVG();
  el.artArmsOpen.innerHTML = createCuteDoodleSVG('arms-open');
  document.getElementById('heart-revealed-sub').textContent = c.senderCredit;

  // Letter
  el.letterSalutation.textContent = c.letter.salutation;
  el.letterBody.innerHTML = '';
  for (const para of c.letter.paragraphs) {
    const p = document.createElement('p');
    p.textContent = para;
    el.letterBody.appendChild(p);
  }
  el.letterClosing.textContent = c.letter.closing;
  el.letterSignature.textContent = c.letter.signature;

  // 4 Real Memory Keepsakes
  el.memoryGiftsTitle.textContent = c.gifts.title;
  el.memoryGiftsSubtitle.textContent = c.gifts.subtitle;
  renderMemoryKeepsakes();
  updateHubLockState();

  // Scene 4 Gallery
  el.galleryTitle.textContent = c.gallery.title;
  el.gallerySubtitle.textContent = c.gallery.subtitle;
  renderGallery(0);
  for (const photo of c.gallery.photos) {
    const img = new Image();
    img.src = getProtectedUrl(`/api/photo?id=${encodeURIComponent(photo.id)}`);
  }

  // Scene Story
  if (c.story) {
    el.storyFlower.innerHTML = createPressedFlowerSVG();
    el.storyLabel.textContent = c.story.label;
    el.storyTitle.textContent = c.story.title;
    renderHighlightedParagraphs(el.storyBody, c.story.paragraphs, c.story.highlights || []);
    el.storySignature.textContent = c.story.signature;
    el.btnStoryContinue.textContent = c.story.continueLabel;
  }

  // Scene Voice Note
  if (c.voiceNote) {
    setupVoiceNote(c.voiceNote);
  }

  // Scene 5 Final
  el.finalIllustration.innerHTML = createFinalKeepsakeSVG();
  el.finalEyebrow.textContent = c.final.eyebrow;
  el.finalTitle.textContent = c.final.title;
  el.finalMessage.innerHTML = '';
  for (const para of c.final.paragraphs || []) {
    const p = document.createElement('p');
    p.textContent = para;
    el.finalMessage.appendChild(p);
  }
  el.finalEmphasis.textContent = c.final.emphasis || '';
  el.finalSignature.textContent = c.final.signature || '';
  el.finalCredit.textContent = c.final.credit;
  el.btnReplay.textContent = c.final.replayLabel;
}

/* Gallery */
function renderGallery(index) {
  const photos = state.content.gallery.photos;
  const total = photos.length;
  state.galleryIndex = ((index % total) + total) % total;
  state.viewedPhotos.add(state.galleryIndex);
  const item = photos[state.galleryIndex];
  const photoUrl = getProtectedUrl(`/api/photo?id=${encodeURIComponent(item.id)}`);

  el.albumFrameWrap.innerHTML = `
    <figure class="polaroid-card" style="transform: rotate(${item.rotation}deg)">
      <div class="washi-tape washi-top-center" aria-hidden="true"></div>
      <span class="photo-corner photo-corner-tl" aria-hidden="true"></span>
      <span class="photo-corner photo-corner-tr" aria-hidden="true"></span>
      <button type="button" class="polaroid-photo-btn" id="polaroid-zoom-btn" aria-label="Enlarge photograph: ${escapeAttr(item.caption)}">
        <img src="${photoUrl}" alt="${escapeAttr(item.caption)}" loading="eager" />
      </button>
      <p class="polaroid-note">${escapeHtml(item.note)}</p>
      <figcaption class="polaroid-caption">${escapeHtml(item.caption)}</figcaption>
    </figure>
  `;

  document.getElementById('polaroid-zoom-btn')?.addEventListener('click', openLightbox);

  el.galleryDots.innerHTML = '';
  photos.forEach((p, idx) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = `gallery-dot${idx === state.galleryIndex ? ' is-active' : ''}`;
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-selected', String(idx === state.galleryIndex));
    dot.setAttribute('aria-label', `Photo ${idx + 1} of ${total}`);
    dot.addEventListener('click', () => renderGallery(idx));
    el.galleryDots.appendChild(dot);
  });

  el.galleryCounter.textContent = `Memory ${state.galleryIndex + 1} of ${total}`;
  updateGalleryLockState();

  if (!el.lightbox.hidden) {
    el.lightboxImg.src = photoUrl;
    el.lightboxImg.alt = item.caption;
    el.lightboxCaption.textContent = item.caption;
  }
}

function openLightbox() {
  const item = state.content.gallery.photos[state.galleryIndex];
  state.lastFocusedBeforeLightbox = document.activeElement;
  el.lightboxImg.src = getProtectedUrl(`/api/photo?id=${encodeURIComponent(item.id)}`);
  el.lightboxImg.alt = item.caption;
  el.lightboxCaption.textContent = item.caption;
  el.lightbox.hidden = false;
  el.lightboxClose.focus();
}

function closeLightbox() {
  el.lightbox.hidden = true;
  if (state.lastFocusedBeforeLightbox && typeof state.lastFocusedBeforeLightbox.focus === 'function') {
    state.lastFocusedBeforeLightbox.focus();
  }
}

/* Confetti */
function startConfetti() {
  if (prefersReducedMotion()) return;
  const canvas = el.confettiCanvas;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#1A2B4C', '#B24545', '#E3A23C', '#D7C6A5'];
  const pieces = Array.from({ length: 42 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    w: 6 + Math.random() * 6,
    h: 4 + Math.random() * 5,
    vy: 1.1 + Math.random() * 1.4,
    vx: (Math.random() - 0.5) * 0.8,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.05,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));

  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of pieces) {
      p.y += p.vy;
      p.x += p.vx;
      p.rot += p.vr;
      if (p.y > canvas.height + 20) {
        p.y = -15;
        p.x = Math.random() * canvas.width;
      }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.78;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    state.confettiRaf = requestAnimationFrame(tick);
  };
  state.confettiRaf = requestAnimationFrame(tick);
}

function stopConfetti() {
  if (state.confettiRaf) {
    cancelAnimationFrame(state.confettiRaf);
    state.confettiRaf = null;
  }
  const ctx = el.confettiCanvas?.getContext('2d');
  if (ctx) ctx.clearRect(0, 0, el.confettiCanvas.width, el.confettiCanvas.height);
}

function resetExperience() {
  // Reset Scene 1
  state.candleBlown = false;
  el.openingCake.classList.remove('is-blown');
  el.btnBlowCandle.hidden = false;
  el.btnBlowCandle.disabled = false;
  el.btnOpeningNext.classList.add('is-locked');
  el.btnOpeningNext.classList.remove('btn-primary');
  el.btnOpeningNext.classList.add('btn-secondary');
  el.btnOpeningNext.setAttribute('aria-disabled', 'true');
  el.candleLockHint.hidden = true;

  // Reset Scene 2
  el.acceptTitle.textContent = 'PLEASE ACCEPT THE GIFT';
  el.acceptDoodle.innerHTML = createCuteDoodleSVG('pleading');
  el.acceptChoices.hidden = false;
  el.acceptRetryWrap.hidden = true;

  // Reset Scene 3
  showHubSubview(el.hubView);
  state.envelopeOpened = false;
  el.envelopeTrigger.classList.remove('is-open');
  el.envelopeTrigger.setAttribute('aria-expanded', 'false');
  el.envelopePrompt.textContent = 'Tap the wax seal to open your letter';
  el.letterSheet.hidden = true;
  el.btnRevealHeartNote.hidden = false;
  el.heartRevealedNote.hidden = true;
  state.visitedGifts.clear();
  el.hubOpenEnvelope.classList.remove('is-visited');
  el.hubOpenFlowers.classList.remove('is-visited');
  el.hubOpenBox.classList.remove('is-visited');
  renderMemoryKeepsakes();
  updateHubLockState();

  state.viewedPhotos.clear();
  renderGallery(0);
  goToScene('scene-1');
}

function renderMemoryKeepsakes() {
  if (!state.content?.gifts?.choices) return;
  el.memoryKeepsakesGrid.innerHTML = '';
  for (const item of state.content.gifts.choices) {
    const btn = document.createElement('button');
    btn.type = 'button';
    const isRead = state.visitedGifts.has(item.id);
    btn.className = `memory-slip-card${isRead ? ' is-visited' : ''}`;
    btn.innerHTML = `
      <span class="memory-slip-art" aria-hidden="true">${createMemoryKeepsakeSVG(item.type)}</span>
      <span class="memory-slip-title">${escapeHtml(item.label)}</span>
      <span class="memory-slip-tag">${escapeHtml(item.tag)}</span>
      <span class="memory-slip-cta">${isRead ? 'Opened ✓ (Tap to re-read)' : 'Tap to open →'}</span>
    `;
    btn.addEventListener('click', () => {
      state.visitedGifts.add(item.id);
      renderMemoryKeepsakes();
      updateHubLockState();
      el.memoryNoteTag.textContent = item.tag;
      el.memoryNoteTitle.textContent = item.messageTitle;
      el.memoryNoteBody.textContent = item.messageBody;
      showHubSubview(el.subviewMemory);
      el.btnMemoryCloseX.focus();
    });
    el.memoryKeepsakesGrid.appendChild(btn);
  }
}

function updateGalleryLockState() {
  const total = state.content?.gallery?.photos?.length || 4;
  const count = state.viewedPhotos.size;
  const unlocked = count >= total;
  if (unlocked) {
    el.btnGalleryContinue.classList.remove('is-locked', 'btn-secondary');
    el.btnGalleryContinue.classList.add('btn-primary');
    el.btnGalleryContinue.setAttribute('aria-disabled', 'false');
    el.galleryLockHint.textContent = 'All 4 photos viewed — ready to continue!';
    el.galleryLockHint.style.color = 'var(--navy-soft)';
  } else {
    el.btnGalleryContinue.classList.add('is-locked', 'btn-secondary');
    el.btnGalleryContinue.classList.remove('btn-primary');
    el.btnGalleryContinue.setAttribute('aria-disabled', 'true');
    el.galleryLockHint.textContent = `View all ${total} photos first (${count} of ${total} viewed) to continue.`;
    el.galleryLockHint.style.color = '';
  }
}

function updateHubLockState() {
  const totalRequired = 3 + (state.content?.gifts?.choices?.length || 4);
  const count = state.visitedGifts.size;
  const unlocked = count >= totalRequired;
  if (unlocked) {
    el.btnHubToGallery.classList.remove('is-locked', 'btn-secondary');
    el.btnHubToGallery.classList.add('btn-primary');
    el.btnHubToGallery.setAttribute('aria-disabled', 'false');
    el.hubLockHint.textContent = `All ${totalRequired} gifts & memory notes opened — Photo Scrapbook unlocked!`;
    el.hubLockHint.style.color = 'var(--navy-soft)';
  } else {
    el.btnHubToGallery.classList.add('is-locked', 'btn-secondary');
    el.btnHubToGallery.classList.remove('btn-primary');
    el.btnHubToGallery.setAttribute('aria-disabled', 'true');
    el.hubLockHint.textContent = `Open all gifts & memory notes first (${count} of ${totalRequired} opened) to unlock the Photo Scrapbook.`;
    el.hubLockHint.style.color = '';
  }
}

let bgmPausedForVoice = false;

function setBgmPlayingUI(playing, statusText) {
  el.bgmToggleBtn.textContent = playing ? 'Pause' : 'Play';
  el.bgmToggleBtn.setAttribute('aria-pressed', String(playing));
  el.bgmEq.classList.toggle('is-playing', playing);
  el.bgmStatusText.textContent = statusText;
}

function startBgmOnVisit() {
  el.musicDock.hidden = false;
  el.bgmAudio.src = '/audio/bgm.mp3';
  el.bgmAudio.loop = true;
  el.bgmAudio.volume = 0.55;

  const tryPlay = () => {
    el.bgmAudio.play().then(() => {
      setBgmPlayingUI(true, 'Playing (looping)');
      window.removeEventListener('pointerdown', tryPlay);
      window.removeEventListener('keydown', tryPlay);
    }).catch(() => {
      setBgmPlayingUI(false, 'Tap anywhere to play');
    });
  };

  tryPlay();
  window.addEventListener('pointerdown', tryPlay, { once: true, passive: true });
  window.addEventListener('keydown', tryPlay, { once: true });
}

function formatTime(sec) {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function setupVoiceNote(vn) {
  el.voiceCardLabel.textContent = vn.cardLabel;
  el.voiceTitle.textContent = vn.title;
  el.voiceSubtitle.textContent = vn.subtitle;
  el.voiceCaption.textContent = vn.caption;
  el.btnVoiceContinue.textContent = vn.continueLabel;
  el.voiceTimeTotal.textContent = formatTime(vn.durationSec || 0);

  el.voiceWaveform.innerHTML = '';
  for (const amp of vn.waveform || []) {
    const bar = document.createElement('span');
    bar.className = 'voice-bar';
    bar.style.height = `${Math.round(amp * 100)}%`;
    el.voiceWaveform.appendChild(bar);
  }

  el.voiceAudio.src = getProtectedUrl(vn.audioUrl);
  el.voiceError.hidden = true;
}

function updateVoiceProgressUI() {
  const duration = Number.isFinite(el.voiceAudio.duration) && el.voiceAudio.duration > 0
    ? el.voiceAudio.duration
    : state.content?.voiceNote?.durationSec || 0;
  const current = el.voiceAudio.currentTime || 0;
  const pct = duration > 0 ? Math.min(100, (current / duration) * 100) : 0;

  el.voiceScrubber.value = String(pct);
  el.voiceTimeCurrent.textContent = formatTime(current);
  if (duration > 0) el.voiceTimeTotal.textContent = formatTime(duration);

  const bars = el.voiceWaveform.querySelectorAll('.voice-bar');
  const filledCount = Math.round((pct / 100) * bars.length);
  bars.forEach((b, idx) => b.classList.toggle('is-played', idx < filledCount));
}

function setVoicePlayingState(isPlaying) {
  el.voicePlayBtn.setAttribute('aria-pressed', String(isPlaying));
  el.voicePlayBtn.setAttribute(
    'aria-label',
    isPlaying ? 'Pause voice note from Manisha' : 'Play voice note from Manisha'
  );
  el.voicePlayBtn.querySelector('.voice-icon-play').hidden = isPlaying;
  el.voicePlayBtn.querySelector('.voice-icon-pause').hidden = !isPlaying;
}

function stopVoiceNote() {
  if (!el.voiceAudio.paused) {
    el.voiceAudio.pause();
  }
  setVoicePlayingState(false);
  if (bgmPausedForVoice) {
    bgmPausedForVoice = false;
    el.bgmAudio.play().then(() => setBgmPlayingUI(true, 'Playing (looping)')).catch(() => {});
  }
}

function renderHighlightedParagraphs(container, paragraphs, highlights) {
  container.innerHTML = '';
  for (const text of paragraphs) {
    const p = document.createElement('p');
    let remaining = text;
    while (remaining.length > 0) {
      let earliestIdx = -1;
      let matchedTerm = '';
      for (const term of highlights) {
        const idx = remaining.indexOf(term);
        if (idx !== -1 && (earliestIdx === -1 || idx < earliestIdx)) {
          earliestIdx = idx;
          matchedTerm = term;
        }
      }
      if (earliestIdx === -1) {
        p.appendChild(document.createTextNode(remaining));
        break;
      }
      if (earliestIdx > 0) {
        p.appendChild(document.createTextNode(remaining.slice(0, earliestIdx)));
      }
      const mark = document.createElement('mark');
      mark.className = 'ink-highlight';
      mark.textContent = matchedTerm;
      p.appendChild(mark);
      remaining = remaining.slice(earliestIdx + matchedTerm.length);
    }
    container.appendChild(p);
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function escapeAttr(str) {
  return escapeHtml(str).replaceAll('"', '&quot;');
}

function bindEvents() {
  el.togglePassword.addEventListener('click', () => {
    const isHidden = el.passwordInput.type === 'password';
    el.passwordInput.type = isHidden ? 'text' : 'password';
    el.togglePassword.textContent = isHidden ? 'Hide' : 'Show';
    el.togglePassword.setAttribute('aria-pressed', String(isHidden));
  });

  el.passwordInput.addEventListener('input', () => {
    el.passwordInput.value = el.passwordInput.value.replace(/\D/g, '').slice(0, 6);
  });

  el.passwordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearGateError();
    const password = el.passwordInput.value.trim();
    if (!/^\d{6}$/.test(password)) {
      showGateError('Please enter a 6-digit PIN.');
      el.passwordInput.focus();
      return;
    }

    el.passwordSubmit.disabled = true;
    el.passwordSubmit.querySelector('.btn-label').textContent = 'Checking…';

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ password })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        showGateError(data.error || 'That PIN does not match.');
        el.passwordInput.select();
        return;
      }
      if (data.token) state.sessionToken = data.token;
      el.passwordInput.value = '';
      await loadProtectedContent();
    } catch {
      showGateError('Connection issue. Please try again.');
    } finally {
      el.passwordSubmit.disabled = false;
      el.passwordSubmit.querySelector('.btn-label').textContent = 'Unlock Keepsake';
    }
  });

  el.bgmToggleBtn.addEventListener('click', () => {
    if (el.bgmAudio.paused) {
      el.bgmAudio.play().then(() => {
        setBgmPlayingUI(true, 'Playing (looping)');
      }).catch(() => {});
    } else {
      el.bgmAudio.pause();
      setBgmPlayingUI(false, 'Paused');
    }
  });

  // Scene 1: Blow candle -> unlocks NEXT (NEXT is blocked until candle is blown)
  el.btnBlowCandle.addEventListener('click', () => {
    state.candleBlown = true;
    el.openingCake.classList.add('is-blown');
    el.btnBlowCandle.hidden = true;
    el.candleLockHint.hidden = true;
    el.btnOpeningNext.classList.remove('is-locked', 'btn-secondary');
    el.btnOpeningNext.classList.add('btn-primary');
    el.btnOpeningNext.setAttribute('aria-disabled', 'false');
  });

  el.btnOpeningNext.addEventListener('click', () => {
    if (!state.candleBlown) {
      el.candleLockHint.hidden = false;
      if (!prefersReducedMotion()) {
        el.btnOpeningNext.classList.remove('shake');
        void el.btnOpeningNext.offsetWidth;
        el.btnOpeningNext.classList.add('shake');
      }
      return;
    }
    goToScene('scene-2');
  });

  // Scene 2: YES / NO / TRY AGAIN
  el.btnAcceptNo.addEventListener('click', () => {
    el.acceptTitle.textContent = 'WHY DID YOU CLICK NO?';
    el.acceptDoodle.innerHTML = createCuteDoodleSVG('crying');
    el.acceptChoices.hidden = true;
    el.acceptRetryWrap.hidden = false;
  });

  el.btnAcceptRetry.addEventListener('click', () => {
    el.acceptTitle.textContent = 'PLEASE ACCEPT THE GIFT';
    el.acceptDoodle.innerHTML = createCuteDoodleSVG('pleading');
    el.acceptChoices.hidden = false;
    el.acceptRetryWrap.hidden = true;
  });

  el.btnAcceptYes.addEventListener('click', () => goToScene('scene-3'));

  // Scene 3: Gift Hub
  el.hubOpenEnvelope.addEventListener('click', () => {
    state.visitedGifts.add('envelope');
    el.hubOpenEnvelope.classList.add('is-visited');
    updateHubLockState();
    showHubSubview(el.subviewEnvelope);
  });
  el.hubOpenFlowers.addEventListener('click', () => {
    state.visitedGifts.add('flowers');
    el.hubOpenFlowers.classList.add('is-visited');
    updateHubLockState();
    showHubSubview(el.subviewFlowers);
  });
  el.hubOpenBox.addEventListener('click', () => {
    state.visitedGifts.add('box');
    el.hubOpenBox.classList.add('is-visited');
    updateHubLockState();
    showHubSubview(el.subviewBox);
  });

  document.querySelectorAll('.btn-back-hub').forEach((btn) => {
    btn.addEventListener('click', () => showHubSubview(el.hubView));
  });

  el.btnMemoryCloseX.addEventListener('click', () => showHubSubview(el.hubView));

  el.btnHubToGallery.addEventListener('click', () => {
    const totalRequired = 3 + (state.content?.gifts?.choices?.length || 4);
    if (state.visitedGifts.size < totalRequired) {
      el.hubLockHint.textContent = `First open all ${totalRequired} gifts & memory notes (${state.visitedGifts.size} of ${totalRequired} opened) — otherwise the Photo Scrapbook is blocked!`;
      if (!prefersReducedMotion()) {
        el.btnHubToGallery.classList.remove('shake');
        void el.btnHubToGallery.offsetWidth;
        el.btnHubToGallery.classList.add('shake');
      }
      return;
    }
    goToScene('scene-4');
  });

  // Envelope open
  el.envelopeTrigger.addEventListener('click', () => {
    if (state.envelopeOpened) return;
    state.envelopeOpened = true;
    el.envelopeTrigger.classList.add('is-open');
    el.envelopeTrigger.setAttribute('aria-expanded', 'true');
    el.envelopePrompt.textContent = 'For Hassan';

    const revealDelay = prefersReducedMotion() ? 20 : 740;
    window.setTimeout(() => {
      el.letterSheet.hidden = false;
    }, revealDelay);
  });

  // Box OPEN heart card
  el.btnRevealHeartNote.addEventListener('click', () => {
    el.btnRevealHeartNote.hidden = true;
    el.heartRevealedNote.hidden = false;
  });

  // Gallery
  el.galleryPrev.addEventListener('click', () => renderGallery(state.galleryIndex - 1));
  el.galleryNext.addEventListener('click', () => renderGallery(state.galleryIndex + 1));

  let touchStartX = 0;
  el.scrapbookAlbum.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0]?.clientX || 0;
    },
    { passive: true }
  );
  el.scrapbookAlbum.addEventListener(
    'touchend',
    (e) => {
      const dx = (e.changedTouches[0]?.clientX || 0) - touchStartX;
      if (Math.abs(dx) > 42) {
        renderGallery(dx < 0 ? state.galleryIndex + 1 : state.galleryIndex - 1);
      }
    },
    { passive: true }
  );

  document.addEventListener('keydown', (e) => {
    if (!el.lightbox.hidden) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') renderGallery(state.galleryIndex - 1);
      if (e.key === 'ArrowRight') renderGallery(state.galleryIndex + 1);
      return;
    }
    if (state.currentScene === 'scene-3' && !el.subviewMemory.hidden && e.key === 'Escape') {
      showHubSubview(el.hubView);
      return;
    }
    if (state.currentScene === 'scene-4') {
      if (e.key === 'ArrowLeft') renderGallery(state.galleryIndex - 1);
      if (e.key === 'ArrowRight') renderGallery(state.galleryIndex + 1);
    }
  });

  el.lightboxClose.addEventListener('click', closeLightbox);
  el.lightboxBackdrop.addEventListener('click', closeLightbox);
  el.lightboxPrev.addEventListener('click', () => renderGallery(state.galleryIndex - 1));
  el.lightboxNext.addEventListener('click', () => renderGallery(state.galleryIndex + 1));

  el.btnGalleryBack.addEventListener('click', () => goToScene('scene-3'));
  el.btnGalleryContinue.addEventListener('click', () => {
    const total = state.content?.gallery?.photos?.length || 4;
    if (state.viewedPhotos.size < total) {
      el.galleryLockHint.textContent = `First view all ${total} photos (${state.viewedPhotos.size} of ${total} viewed) — otherwise Continue is blocked!`;
      if (!prefersReducedMotion()) {
        el.btnGalleryContinue.classList.remove('shake');
        void el.btnGalleryContinue.offsetWidth;
        el.btnGalleryContinue.classList.add('shake');
      }
      return;
    }
    goToScene('scene-story');
  });
  el.btnStoryBack.addEventListener('click', () => goToScene('scene-4'));
  el.btnStoryContinue.addEventListener('click', () => goToScene('scene-voice'));
  el.btnVoiceBack.addEventListener('click', () => goToScene('scene-story'));
  el.btnVoiceContinue.addEventListener('click', () => goToScene('scene-5'));
  el.btnReplay.addEventListener('click', resetExperience);

  // Voice Note Player Events
  el.voicePlayBtn.addEventListener('click', async () => {
    el.voiceError.hidden = true;
    if (el.voiceAudio.paused) {
      if (!el.bgmAudio.paused) {
        el.bgmAudio.pause();
        setBgmPlayingUI(false, 'Paused for voice note');
        bgmPausedForVoice = true;
      }
      try {
        await el.voiceAudio.play();
        setVoicePlayingState(true);
      } catch {
        setVoicePlayingState(false);
        el.voiceError.hidden = false;
      }
    } else {
      el.voiceAudio.pause();
      setVoicePlayingState(false);
      if (bgmPausedForVoice) {
        bgmPausedForVoice = false;
        el.bgmAudio.play().then(() => setBgmPlayingUI(true, 'Playing (looping)')).catch(() => {});
      }
    }
  });

  el.voiceAudio.addEventListener('timeupdate', updateVoiceProgressUI);
  el.voiceAudio.addEventListener('loadedmetadata', updateVoiceProgressUI);
  el.voiceAudio.addEventListener('ended', () => {
    setVoicePlayingState(false);
    updateVoiceProgressUI();
    if (bgmPausedForVoice) {
      bgmPausedForVoice = false;
      el.bgmAudio.play().then(() => setBgmPlayingUI(true, 'Playing (looping)')).catch(() => {});
    }
  });
  el.voiceAudio.addEventListener('error', () => {
    setVoicePlayingState(false);
    el.voiceError.hidden = false;
  });

  el.voiceScrubber.addEventListener('input', () => {
    const duration = Number.isFinite(el.voiceAudio.duration) && el.voiceAudio.duration > 0
      ? el.voiceAudio.duration
      : state.content?.voiceNote?.durationSec || 0;
    if (duration > 0) {
      el.voiceAudio.currentTime = (Number(el.voiceScrubber.value) / 100) * duration;
      updateVoiceProgressUI();
    }
  });

  el.voiceRetryBtn.addEventListener('click', async () => {
    el.voiceError.hidden = true;
    el.voiceAudio.load();
    try {
      await el.voiceAudio.play();
      setVoicePlayingState(true);
    } catch {
      setVoicePlayingState(false);
      el.voiceError.hidden = false;
    }
  });
}

async function init() {
  el.cornerTL.innerHTML = createCornerDecorSVG();
  el.cornerTR.innerHTML = createCornerDecorSVG();
  el.gateIllustration.innerHTML = createGateEmblemSVG();
  bindEvents();
  startBgmOnVisit();

  try {
    const res = await fetch('/api/session', { credentials: 'same-origin' });
    const data = await res.json();
    if (data.authenticated) {
      await loadProtectedContent();
    } else if (data.configured === false) {
      showGateError('Server PIN is not configured yet (set BIRTHDAY_PASSWORD).');
    }
  } catch {
    // Stay on password gate
  }
}

init();
