// chorus-proxy-server.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const CHORUS_API_KEY = 'e3be84dc6c55424e9e81d1fc32865749';
const CHORUS_BASE_URL = 'https://chorus.ai/v3';

app.use(express.json());

// GET /users
app.get('/users', async (req, res) => {
  try {
    const response = await axios.get(`${CHORUS_BASE_URL}/users`, {
      headers: { Authorization: CHORUS_API_KEY }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

// GET /engagements?user_id=...
app.get('/engagements', async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) return res.status(400).json({ error: 'Missing user_id' });

  try {
    const response = await axios.get(`${CHORUS_BASE_URL}/engagements`, {
      headers: { Authorization: CHORUS_API_KEY },
      params: { user_id }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

// POST /engagements/filter
app.post('/engagements/filter', async (req, res) => {
  try {
    const response = await axios.post(`${CHORUS_BASE_URL}/engagements/filter`, req.body, {
      headers: {
        Authorization: CHORUS_API_KEY,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

// GET /conversations?email=...
app.get('/conversations', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Missing email parameter' });

  try {
    const response = await axios.get(`${CHORUS_BASE_URL}/conversations`, {
      headers: { Authorization: CHORUS_API_KEY },
      params: { email }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Chorus proxy running at http://localhost:${PORT}`);
});
