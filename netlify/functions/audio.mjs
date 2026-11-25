import fs from 'node:fs';
import {
  isRequestAuthorized,
  jsonResponse,
  resolvePrivatePath
} from './_lib/security.mjs';

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return jsonResponse(405, { ok: false, error: 'Method not allowed.' });
  }

  if (!isRequestAuthorized(event)) {
    return jsonResponse(401, { ok: false, error: 'Authentication required.' });
  }

  const filePath = resolvePrivatePath('audio', 'voice-note.mp3');
  if (!fs.existsSync(filePath)) {
    return jsonResponse(404, {
      ok: false,
      error: 'Voice note audio file is unavailable.'
    });
  }

  const buffer = fs.readFileSync(filePath);
  const total = buffer.length;
  const rangeHeader = event.headers?.range || event.headers?.Range;

  if (rangeHeader && typeof rangeHeader === 'string' && rangeHeader.startsWith('bytes=')) {
    const [startStr, endStr] = rangeHeader.replace('bytes=', '').split('-');
    const start = Math.max(0, Number.parseInt(startStr, 10) || 0);
    const end = endStr ? Math.min(total - 1, Number.parseInt(endStr, 10)) : total - 1;

    if (start >= total || start > end) {
      return {
        statusCode: 416,
        headers: {
          'Content-Range': `bytes */${total}`,
          'Cache-Control': 'private, no-store, max-age=0'
        },
        body: ''
      };
    }

    const slice = buffer.subarray(start, end + 1);
    return {
      statusCode: 206,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Accept-Ranges': 'bytes',
        'Content-Range': `bytes ${start}-${end}/${total}`,
        'Content-Length': String(slice.length),
        'Cache-Control': 'private, no-store, max-age=0'
      },
      body: slice.toString('base64'),
      isBase64Encoded: true
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'audio/mpeg',
      'Accept-Ranges': 'bytes',
      'Content-Length': String(total),
      'Cache-Control': 'private, no-store, max-age=0'
    },
    body: buffer.toString('base64'),
    isBase64Encoded: true
  };
};
