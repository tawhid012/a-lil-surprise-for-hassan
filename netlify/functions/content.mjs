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

  try {
    const contentPath = resolvePrivatePath('content.json');
    const raw = fs.readFileSync(contentPath, 'utf8');
    const data = JSON.parse(raw);

    // Check if an authorized full background song exists at private-data/audio/bgm.mp3
    const localBgmPath = resolvePrivatePath('audio', 'bgm.mp3');
    const hasLocalBgm = fs.existsSync(localBgmPath);
    if (data.music) {
      data.music = {
        ...data.music,
        bgmUrl: data.music.audioUrl || (hasLocalBgm ? '/api/bgm' : '')
      };
    }

    return jsonResponse(200, { ok: true, content: data });
  } catch (err) {
    return jsonResponse(500, { ok: false, error: 'Failed to load scrapbook content.' });
  }
};

