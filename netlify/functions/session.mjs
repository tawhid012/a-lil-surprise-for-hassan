import {
  clearSessionCookie,
  isHttpsRequest,
  isPasswordConfigured,
  isRequestAuthorized,
  jsonResponse
} from './_lib/security.mjs';

export const handler = async (event) => {
  if (event.httpMethod === 'DELETE') {
    return jsonResponse(
      200,
      { ok: true, authenticated: false },
      { 'Set-Cookie': clearSessionCookie(isHttpsRequest(event)) }
    );
  }

  if (event.httpMethod !== 'GET') {
    return jsonResponse(405, { ok: false, error: 'Method not allowed.' });
  }

  return jsonResponse(200, {
    ok: true,
    configured: isPasswordConfigured(),
    authenticated: isRequestAuthorized(event)
  });
};

