# Suhasa Nayak — Portfolio

Next.js portfolio with the **Retro Anime Pop** design system, GSAP + Three.js animations, and a built-in CMS.

## Run

```bash
cd site
npm install
ADMIN_PASSWORD=your-secret npm run dev
```

Open http://localhost:3000 — admin at http://localhost:3000/admin.

## CMS

- `/admin` — password-protected (env `ADMIN_PASSWORD`, defaults to `change-me`)
- Add / edit / delete projects (stored in `data/projects.json`)
- Upload thumbnails (image or looping video) → saved to `public/uploads/`
- Upload a new resume PDF → served live at `/api/resume` (nav + contact links point there)

## Structure

- `app/page.jsx` — home: Three.js hero, ticker, filterable project grid, about, contact
- `app/work/[slug]/page.jsx` — case study: impact metrics first, meta bar, pull quote, body
- `app/admin/page.jsx` — CMS UI
- `app/api/{projects,resume,upload}` — JSON-file-backed API
- `app/globals.css` — design tokens from `design-system.md`

## Deploy note

The file-based CMS needs a persistent filesystem (a VPS, Railway, Render, or `next start` on any server). On Vercel/Netlify serverless, writes don't persist — swap `lib/store.js` for a database or use git-based content if deploying there.
