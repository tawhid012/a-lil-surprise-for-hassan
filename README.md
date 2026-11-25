# Happy Birthday, Hassan — Interactive Digital Scrapbook

A personalized, password-protected interactive birthday scrapbook built with HTML5, CSS3, ES6+ JavaScript, custom inline SVG illustrations, and Netlify Functions.

**Credit:** Gifted by Manisha

---

## Project Structure

```text
├── public/                     # Published static site (contains NO private letter or photos)
│   ├── index.html              # Password gate + 6-scene scrapbook shell
│   ├── styles.css              # Cream graph-paper scrapbook theme & animations
│   └── js/
│       ├── app.js              # Scene navigation, envelope, gallery, gifts, music, auth
│       └── illustrations.js    # Original navy-ink & cream SVG artwork
├── private-data/               # Private content bundled ONLY into Netlify Functions
│   ├── content.json            # Single configuration file for letter, captions & gifts
│   └── photos/                 # Protected JPEGs served only after authentication
│       ├── photo-1.jpg
│       ├── photo-2.jpg
│       ├── photo-3.jpg
│       └── photo-4.jpg
├── netlify/
│   └── functions/
│       ├── _lib/security.mjs   # Timing-safe password check, HMAC cookies & rate limiting
│       ├── auth.mjs            # POST /api/auth
│       ├── session.mjs         # GET /api/session, DELETE /api/session
│       ├── content.mjs         # GET /api/content
│       ├── photo.mjs           # GET /api/photo?id=1..4
│       └── audio.mjs           # GET /api/audio (optional licensed audio file)
├── images/                     # Original supplied photographs (not published)
├── tests/
│   └── server.test.mjs         # Security & API verification tests
├── dev-server.mjs              # Local Node dev server (serves public/ + Netlify Functions)
├── netlify.toml                # Netlify build, redirects & security headers
├── .env.example                # Environment variable template
└── package.json
```

---

## Local Development

1. **Requirements:** Node.js 20+ (no external npm packages required).
2. **Configure a local password:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set `BIRTHDAY_PASSWORD` and `SESSION_SECRET`.
3. **Start the local server:**
   ```bash
   npm run dev
   ```
   Open [http://127.0.0.1:8888](http://127.0.0.1:8888) in your browser.
4. **Run automated security & API tests:**
   ```bash
   npm test
   ```

---

## Configuring the Password Securely (Netlify)

The secret password is **never** stored in frontend code or `public/`. It is validated server-side by `netlify/functions/auth.mjs` using `crypto.timingSafeEqual` and issues an `HttpOnly`, `SameSite=Strict`, HMAC-SHA256 signed session cookie (`hb_session`), with per-IP rate limiting (5 failed attempts trigger a 60-second cooldown).

Before deploying to Netlify, set these environment variables in **Netlify Dashboard → Site configuration → Environment variables**:

- `BIRTHDAY_PASSWORD` — The secret password Hassan will enter to unlock the scrapbook.
- `SESSION_SECRET` — A random 32+ character string used to sign session cookies.

---

## Background Music (Spotify Embed)

Requested song: **“I Think They Call This Love” — Elliot James Reay**

The website embeds the official Spotify track player directly in a scrapbook soundtrack dock (`public/index.html`):
- Embed URL: `https://open.spotify.com/embed/track/4oHQ8n9OKQ3599e8noCrDX?theme=0`
- Official track page: `https://open.spotify.com/track/4oHQ8n9OKQ3599e8noCrDX`

Because browsers block unmuted autoplay before user interaction, the visitor presses **Play** inside the embedded Spotify player. Full-track playback vs. 30-second preview depends on whether the visitor is signed in to Spotify in their browser.

---

## Customizing the Letter, Captions, and Gifts

All personalized text lives in a single file: `private-data/content.json`.

- **Birthday opening:** `opening`
- **Gift invitation:** `invitation`
- **Personal letter:** `letter.salutation`, `letter.paragraphs`, `letter.closing`, `letter.signature`
- **Photo captions & notes:** `gallery.photos`
- **Three gift choices:** `gifts.choices`
- **Final surprise:** `final`

---

## Deploying to Netlify

1. Push this repository to GitHub/GitLab/Bitbucket (`.env` and `.DS_Store` are ignored by `.gitignore`).
2. In Netlify, choose **Add new site → Import an existing project**.
3. Netlify will automatically read `netlify.toml`:
   - **Publish directory:** `public`
   - **Functions directory:** `netlify/functions`
   - **Included private files:** `private-data/**`
4. Add `BIRTHDAY_PASSWORD` and `SESSION_SECRET` in **Site configuration → Environment variables**.
5. Trigger a deploy. Your private birthday scrapbook will be live at your Netlify URL.

