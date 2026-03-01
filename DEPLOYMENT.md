# Deployment guide — Netlify & Vercel

Overview
- This project builds with Vite and outputs a static `dist` folder. You can host `dist` on Netlify, Vercel, GitHub Pages, or any static host.

Prerequisites
- Node 18+ (Node 20 recommended)
- `npm ci` to install deps

Local build (quick test)
```bash
cd Senior-Designer
npm ci
npm run build
npx serve dist   # or use any static file server
```

Netlify (recommended quick deploy)
- In Netlify dashboard, create a new site → Connect to your Git provider and select the repo.
- Set Build command: `npm run build`
- Set Publish directory: `dist`
- (Optional) Configure Node version in Netlify UI to 20.
- If you prefer CLI:
```bash
# login once
npx netlify login

# build locally then deploy the production folder
npm ci
npm run build
npx netlify deploy --prod --dir=dist
```
- I added a Netlify config: [Senior-Designer/netlify.toml](Senior-Designer/netlify.toml)

Vercel (zero-config)
- From Vercel dashboard click "New Project" → Import your repo.
- Vercel auto-detects Vite. Set Build command: `npm run build` and Output Directory: `dist` if not auto-filled.
- Or use CLI:
```bash
npm ci
npm run build
npx vercel --prod
```
- I added a Vercel config: [Senior-Designer/vercel.json](Senior-Designer/vercel.json)

Notes & environment variables
- If your app uses runtime env (API keys, etc.) set them in the Netlify/Vercel project settings.
- For SPA routes, both configs include rewrites so client-side routing works.

Custom domain
- Add your domain in the provider dashboard and follow DNS instructions (Netlify/Vercel will give records).

If you want, I can:
- Push this folder to a new GitHub repo and connect it to Netlify/Vercel for you, or
- Run a deploy now via Netlify/Vercel CLI (you'll need to run auth steps interactively on your machine).
