import express from 'express';
import NodeCache from 'node-cache';
import { fetchStellarToml } from './fetcher.js';
import { parseAnchorMetadata } from './parser.js';

const app = express();
const cache = new NodeCache({ stdTTL: 300 }); // 5-min cache

async function getAnchor(domain) {
  const cached = cache.get(domain);
  if (cached) return cached;
  const raw = await fetchStellarToml(domain);
  const data = parseAnchorMetadata(domain, raw);
  cache.set(domain, data);
  return data;
}

// GET /anchor/:domain — full anchor metadata
app.get('/anchor/:domain', async (req, res) => {
  try {
    res.json(await getAnchor(req.params.domain));
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

// GET /anchor/:domain/capabilities — just the capabilities flags
app.get('/anchor/:domain/capabilities', async (req, res) => {
  try {
    const { capabilities } = await getAnchor(req.params.domain);
    res.json(capabilities);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

// GET /anchor/:domain/currencies — supported currencies
app.get('/anchor/:domain/currencies', async (req, res) => {
  try {
    const { currencies } = await getAnchor(req.params.domain);
    res.json(currencies);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`smart-anchor listening on :${PORT}`));
