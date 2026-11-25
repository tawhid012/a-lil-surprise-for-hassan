import {
  buildSessionCookie,
  checkRateLimit,
  clearAuthFailures,
  createSessionToken,
  getClientIp,
  isHttpsRequest,
  isPasswordConfigured,
  jsonResponse,
  recordAuthFailure,
  verifyPassword
} from './_lib/security.mjs';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { ok: false, error: 'Method not allowed.' });
  }

  if (!isPasswordConfigured()) {
    return jsonResponse(503, {
      ok: false,
      error: 'The scrapbook password is not configured on the server yet.'
    });
  }

  const clientIp = getClientIp(event);
  const limit = checkRateLimit(clientIp);
  if (!limit.allowed) {
    return jsonResponse(
      429,
      {
        ok: false,
        error: `Too many attempts. Please wait ${limit.retryAfter} seconds and try again.`,
        retryAfter: limit.retryAfter
      },
      { 'Retry-After': String(limit.retryAfter) }
    );
  }

  let password = '';
  try {
    const parsed = JSON.parse(event.body || '{}');
    password = typeof parsed.password === 'string' ? parsed.password : '';
  } catch {
    return jsonResponse(400, { ok: false, error: 'Invalid request body.' });
  }

  if (!/^\d{6}$/.test(password.trim())) {
    return jsonResponse(400, { ok: false, error: 'Please enter a 6-digit PIN.' });
  }

  if (!verifyPassword(password.trim())) {
    const failure = recordAuthFailure(clientIp);
    if (failure.locked) {
      return jsonResponse(
        429,
        {
          ok: false,
          error: `Too many incorrect attempts. Please wait ${failure.retryAfter} seconds.`,
          retryAfter: failure.retryAfter
        },
        { 'Retry-After': String(failure.retryAfter) }
      );
    }
    return jsonResponse(401, {
      ok: false,
      error: 'That password does not match. Please try again.'
    });
  }

  clearAuthFailures(clientIp);
  const token = createSessionToken();
  const cookie = buildSessionCookie(token, isHttpsRequest(event));

  return jsonResponse(
    200,
    { ok: true, token },
    { 'Set-Cookie': cookie }
  );
};

