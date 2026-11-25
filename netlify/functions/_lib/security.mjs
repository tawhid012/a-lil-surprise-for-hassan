import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const COOKIE_NAME = 'hb_session';
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 2 * 60 * 1000;
const LOCKOUT_MS = 60 * 1000;

const attemptsByClient = new Map();

function sha256(value) {
  return crypto.createHash('sha256').update(String(value), 'utf8').digest();
}

const DEFAULT_PIN = '061209';

function getConfiguredPassword() {
  return typeof process.env.BIRTHDAY_PASSWORD === 'string' && process.env.BIRTHDAY_PASSWORD.length > 0
    ? process.env.BIRTHDAY_PASSWORD
    : DEFAULT_PIN;
}

export function isPasswordConfigured() {
  return getConfiguredPassword().length > 0;
}

function getSigningKey() {
  const password = getConfiguredPassword();
  const explicitSecret = process.env.SESSION_SECRET;
  if (explicitSecret && explicitSecret.length >= 16) {
    return sha256(explicitSecret);
  }
  return crypto.createHmac('sha256', password).update('hassan-scrapbook-session-v1').digest();
}

export function verifyPassword(candidate) {
  if (typeof candidate !== 'string') {
    return false;
  }
  const a = sha256(candidate);
  const b = sha256(getConfiguredPassword());
  return crypto.timingSafeEqual(a, b);
}

export function createSessionToken(ttlSeconds = 4 * 60 * 60) {
  const key = getSigningKey();
  if (!key) throw new Error('BIRTHDAY_PASSWORD is not configured');
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(
    JSON.stringify({ iat: now, exp: now + ttlSeconds, v: 1 }),
    'utf8'
  ).toString('base64url');
  const sig = crypto.createHmac('sha256', key).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

export function verifySessionToken(token) {
  const key = getSigningKey();
  if (!key || typeof token !== 'string' || !token.includes('.')) {
    return false;
  }
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const expectedSig = crypto.createHmac('sha256', key).update(payload).digest('base64url');
  const sigBuf = Buffer.from(sig, 'utf8');
  const expectedBuf = Buffer.from(expectedSig, 'utf8');
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return false;
  }
  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    const now = Math.floor(Date.now() / 1000);
    return typeof parsed.exp === 'number' && parsed.exp > now;
  } catch {
    return false;
  }
}

export function parseCookies(cookieHeader = '') {
  const out = {};
  for (const part of String(cookieHeader).split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const val = part.slice(idx + 1).trim();
    if (key) out[key] = decodeURIComponent(val);
  }
  return out;
}

export function isRequestAuthorized(event) {
  const headers = event.headers || {};
  const cookieHeader = headers.cookie || headers.Cookie || '';
  const cookies = parseCookies(cookieHeader);
  return verifySessionToken(cookies[COOKIE_NAME]);
}

export function isHttpsRequest(event) {
  const headers = event.headers || {};
  const proto = (headers['x-forwarded-proto'] || headers['X-Forwarded-Proto'] || '').toLowerCase();
  return proto === 'https';
}

export function buildSessionCookie(token, isHttps, maxAge = 4 * 60 * 60) {
  const parts = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    `Max-Age=${maxAge}`
  ];
  if (isHttps) parts.push('Secure');
  return parts.join('; ');
}

export function clearSessionCookie(isHttps) {
  const parts = [
    `${COOKIE_NAME}=`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    'Max-Age=0'
  ];
  if (isHttps) parts.push('Secure');
  return parts.join('; ');
}

export function getClientIp(event) {
  const headers = event.headers || {};
  const ip =
    headers['x-nf-client-connection-ip'] ||
    headers['x-forwarded-for'] ||
    headers['client-ip'] ||
    'local';
  return String(ip).split(',')[0].trim();
}

export function checkRateLimit(clientKey) {
  const now = Date.now();
  const entry = attemptsByClient.get(clientKey);
  if (!entry) return { allowed: true, retryAfter: 0 };
  if (entry.lockedUntil && entry.lockedUntil > now) {
    return {
      allowed: false,
      retryAfter: Math.ceil((entry.lockedUntil - now) / 1000)
    };
  }
  if (now - entry.firstAttemptAt > WINDOW_MS) {
    attemptsByClient.delete(clientKey);
    return { allowed: true, retryAfter: 0 };
  }
  return { allowed: true, retryAfter: 0 };
}

export function recordAuthFailure(clientKey) {
  const now = Date.now();
  const entry = attemptsByClient.get(clientKey);
  if (!entry || now - entry.firstAttemptAt > WINDOW_MS) {
    attemptsByClient.set(clientKey, {
      count: 1,
      firstAttemptAt: now,
      lockedUntil: 0
    });
    return { remaining: MAX_ATTEMPTS - 1, locked: false, retryAfter: 0 };
  }
  entry.count += 1;
  if (entry.count >= MAX_ATTEMPTS) {
    entry.lockedUntil = now + LOCKOUT_MS;
    return {
      remaining: 0,
      locked: true,
      retryAfter: Math.ceil(LOCKOUT_MS / 1000)
    };
  }
  return {
    remaining: MAX_ATTEMPTS - entry.count,
    locked: false,
    retryAfter: 0
  };
}

export function clearAuthFailures(clientKey) {
  attemptsByClient.delete(clientKey);
}

export function resolvePrivatePath(...segments) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.resolve(process.cwd(), 'private-data', ...segments),
    path.resolve(__dirname, '..', '..', '..', 'private-data', ...segments),
    path.resolve(__dirname, '..', '..', 'private-data', ...segments)
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return candidates[0];
}

export function jsonResponse(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      ...extraHeaders
    },
    body: JSON.stringify(body)
  };
}

