import fs from 'node:fs';
import {
  isRequestAuthorized,
  jsonResponse,
  resolvePrivatePath
} from './_lib/security.mjs';

const ALLOWED_PHOTOS = new Map([
  ['1', 'photo-1.jpg'],
  ['2', 'photo-2.jpg'],
  ['3', 'photo-3.jpg'],
  ['4', 'photo-4.jpg']
]);

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return jsonResponse(405, { ok: false, error: 'Method not allowed.' });
  }

  if (!isRequestAuthorized(event)) {
    return jsonResponse(401, { ok: false, error: 'Authentication required.' });
  }

  const id = event.queryStringParameters?.id;
  const filename = ALLOWED_PHOTOS.get(String(id || ''));
  if (!filename) {
    return jsonResponse(404, { ok: false, error: 'Photo not found.' });
  }

  try {
    const filePath = resolvePrivatePath('photos', filename);
    const buffer = fs.readFileSync(filePath);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'private, no-store, max-age=0',
        'Content-Length': String(buffer.length)
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true
    };
  } catch {
    return jsonResponse(404, { ok: false, error: 'Photo file unavailable.' });
  }
};

