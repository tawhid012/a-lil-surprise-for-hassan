import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

process.env.BIRTHDAY_PASSWORD = '251126';
process.env.SESSION_SECRET = 'test-signing-secret-at-least-32-chars';

const { createDevServer } = await import('../dev-server.mjs');

let server;
let baseUrl;

test.before(async () => {
  server = createDevServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const addr = server.address();
  baseUrl = `http://127.0.0.1:${addr.port}`;
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

test('public static files do not expose private letter or photos', () => {
  const html = fs.readFileSync(path.resolve('public/index.html'), 'utf8');
  const js = fs.readFileSync(path.resolve('public/js/app.js'), 'utf8');
  assert.equal(html.includes('251126'), false);
  assert.equal(js.includes('251126'), false);
  assert.equal(html.includes('Gifted by Manisha'), false);
  assert.equal(fs.existsSync(path.resolve('public/images')), false);
});

test('unauthenticated requests to protected endpoints return 401', async () => {
  const contentRes = await fetch(`${baseUrl}/api/content`);
  assert.equal(contentRes.status, 401);

  const audioRes = await fetch(`${baseUrl}/api/audio`);
  assert.equal(audioRes.status, 401);

  const bgmRes = await fetch(`${baseUrl}/api/bgm`);
  assert.equal(bgmRes.status, 401);

  for (const id of ['1', '2', '3', '4']) {
    const photoRes = await fetch(`${baseUrl}/api/photo?id=${id}`);
    assert.equal(photoRes.status, 401);
  }
});

test('wrong password returns 401 and rate limits after 5 failures', async () => {
  const ip = '203.0.113.42';
  for (let i = 0; i < 4; i++) {
    const res = await fetch(`${baseUrl}/api/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': ip },
      body: JSON.stringify({ password: '000000' })
    });
    assert.equal(res.status, 401);
  }
  const fifth = await fetch(`${baseUrl}/api/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify({ password: '000000' })
  });
  assert.equal(fifth.status, 429);
  assert.ok(fifth.headers.get('retry-after'));
});

test('valid password issues HttpOnly cookie and unlocks content + all 4 photos', async () => {
  const authRes = await fetch(`${baseUrl}/api/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '203.0.113.99' },
    body: JSON.stringify({ password: '251126' })
  });
  assert.equal(authRes.status, 200);
  const setCookie = authRes.headers.get('set-cookie');
  assert.ok(setCookie && setCookie.includes('hb_session='));
  assert.ok(setCookie.includes('HttpOnly'));

  const cookiePair = setCookie.split(';')[0];

  const sessionRes = await fetch(`${baseUrl}/api/session`, {
    headers: { Cookie: cookiePair }
  });
  const sessionData = await sessionRes.json();
  assert.equal(sessionData.authenticated, true);

  const contentRes = await fetch(`${baseUrl}/api/content`, {
    headers: { Cookie: cookiePair }
  });
  assert.equal(contentRes.status, 200);
  const { content } = await contentRes.json();
  assert.equal(content.recipient, 'Hassan');
  assert.equal(content.senderCredit, 'Gifted by Manisha');
  assert.equal(content.gallery.photos.length, 4);
  assert.equal(content.gifts.choices.length, 4);
  assert.equal(content.music.title, 'I Think They Call This Love');
  assert.equal(content.music.artist, 'Elliot James Reay');

  for (const id of ['1', '2', '3', '4']) {
    const photoRes = await fetch(`${baseUrl}/api/photo?id=${id}`, {
      headers: { Cookie: cookiePair }
    });
    assert.equal(photoRes.status, 200);
    assert.equal(photoRes.headers.get('content-type'), 'image/jpeg');
    const buf = await photoRes.arrayBuffer();
    assert.ok(buf.byteLength > 10000);
  }

  const badPhoto = await fetch(`${baseUrl}/api/photo?id=99`, {
    headers: { Cookie: cookiePair }
  });
  assert.equal(badPhoto.status, 404);

  const audioOk = await fetch(`${baseUrl}/api/audio`, {
    headers: { Cookie: cookiePair }
  });
  assert.equal(audioOk.status, 200);
  assert.equal(audioOk.headers.get('content-type'), 'audio/mpeg');
  const audioRange = await fetch(`${baseUrl}/api/audio`, {
    headers: { Cookie: cookiePair, Range: 'bytes=0-1023' }
  });
  assert.equal(audioRange.status, 206);
  assert.equal(audioRange.headers.get('content-range')?.startsWith('bytes 0-1023/'), true);

  const bgmOk = await fetch(`${baseUrl}/api/bgm`, {
    headers: { Cookie: cookiePair }
  });
  assert.equal(bgmOk.status, 200);
  assert.equal(bgmOk.headers.get('content-type'), 'audio/mpeg');
});

