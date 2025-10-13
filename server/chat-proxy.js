#!/usr/bin/env node
/* Simple chat proxy to call Google's Generative Language API (Gemini)
   Usage: set GEMINI_API_KEY=your_key && node server/chat-proxy.js
   Optional env: GEMINI_MODEL (default: models/text-bison-001)
*/
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const MODEL = process.env.GEMINI_MODEL || 'models/text-bison-001';
if (!API_KEY) {
  console.warn('No GEMINI_API_KEY env var found. The proxy will return errors until set.');
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message, lang } = req.body || {};
    if (!message) return res.status(400).json({ error: 'missing message' });

    if (!API_KEY) return res.status(500).json({ error: 'server not configured with GEMINI_API_KEY' });

    // Build a prompt that instructs the model to respond in the selected language
    const promptText = `You are a helpful assistant. Reply concisely in the user's language (${lang || 'en'}).\nUser: ${message}`;

    const endpoint = `https://generativelanguage.googleapis.com/v1beta2/${MODEL}:generate?key=${API_KEY}`;

    const body = {
      prompt: { text: promptText },
      temperature: 0.2,
      maxOutputTokens: 512,
    };

    const r = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!r.ok) {
      const text = await r.text();
      return res.status(r.status).json({ error: 'upstream_error', details: text });
    }

    const data = await r.json();
    // Attempt to extract a readable reply from common shapes
    let reply = null;
    if (data.candidates && Array.isArray(data.candidates) && data.candidates[0]) {
      // some responses put text in `output` or `output[0].content`
      const cand = data.candidates[0];
      if (typeof cand.output === 'string') reply = cand.output;
      else if (cand.output && cand.output[0] && cand.output[0].content) reply = cand.output[0].content;
      else if (cand.content) reply = cand.content;
    }
    // Fallback: stringify entire body (last resort)
    if (!reply) reply = JSON.stringify(data);

    return res.json({ reply });
  } catch (err) {
    console.error('chat proxy error', err);
    return res.status(500).json({ error: 'internal_error', details: err.message });
  }
});

const port = process.env.PORT || 5178;
app.listen(port, () => console.log(`Chat proxy listening on http://localhost:${port}`));
