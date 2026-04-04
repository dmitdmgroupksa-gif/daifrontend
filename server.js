const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// ── Static files ──────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, "public")));

// ── /version — API info endpoint ──────────────────────────────────────────────
app.get("/version", (req, res) => {
  res.json({
    name: "durar-ai",
    version: "1.0.0",
    description: "Durar AI — Personal AI Gateway",
    status: "ok",
    uptime: process.uptime(),
    endpoints: {
      health: "/health",
      version: "/version",
      docs: "https://github.com/openclaw/openclaw"
    }
  });
});

// ── /health — Render health check ────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── /releases/:file — serve release downloads ────────────────────────────────
app.get("/releases/:file", (req, res) => {
  const filePath = path.join(__dirname, "public", "releases", req.params.file);
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({
      error: "Release not found",
      message: `${req.params.file} has not been published yet. Check GitHub releases.`,
      github: "https://github.com/openclaw/openclaw/releases"
    });
  }
});

// ── Fallback → index.html (SPA-style) ────────────────────────────────────────
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Durar AI server running on port ${PORT}`);
});
