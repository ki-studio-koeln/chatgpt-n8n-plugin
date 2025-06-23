import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Damit __dirname funktioniert:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// OpenAPI-Spec ausliefern
app.get('/openapi.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'openapi.json'));
});

// /trigger ans Webhook weiterreichen
app.post('/trigger', async (req, res) => {
  try {
    await fetch('https://primary-production-b3a0.up.railway.app/webhook/52ddde1a-a8c6-465e-ba03-61816f18ec07', {
      method: 'POST'
    });
    res.status(200).send('Webhook getriggert');
  } catch (err) {
    console.error(err);
    res.status(500).send('Fehler beim Triggern');
  }
});

app.listen(PORT, () => {
  console.log(`Plugin-Server läuft auf Port ${PORT}`);
});
