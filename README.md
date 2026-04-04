# Durar AI — Landing Page

Personal AI Assistant gateway landing site. Built with vanilla HTML/Tailwind CSS, served by Express.

## Project Structure

```
durar-ai/
├── public/
│   ├── index.html          ← Main landing page
│   └── releases/           ← Drop release .zip files here to serve downloads
├── server.js               ← Express server
├── package.json
├── render.yaml             ← Render deployment config
└── README.md
```

## Local Development

```bash
npm install
npm start
# → http://localhost:3000
```

## Deploy to Render

### Option A — render.yaml (recommended)
1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo — Render will auto-detect `render.yaml`
4. Click **Deploy**

### Option B — Manual
1. Push to GitHub
2. New Web Service on Render
3. Set:
   - **Build command:** `npm install`
   - **Start command:** `npm start`
   - **Environment:** Node

## Routes

| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/health` | Health check (used by Render) |
| `/version` | JSON API version info |
| `/releases/:file` | File downloads (place files in `public/releases/`) |

## Adding Release Downloads

Drop your release zip into `public/releases/`:
```bash
cp durar-ai-node-1.0.0.zip public/releases/
```
It will be served at `/releases/durar-ai-node-1.0.0.zip`.
