const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fs = require("fs");
const app = express();
const path = require("path");
const PORT = 443;
const https = require('https');
app.use(cors());
app.use(express.json());

const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'Boostserver.key')),
  cert: fs.readFileSync(path.join(__dirname, 'Boostserver.cert')),
};

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  message: 'Too many requests, please try again later.',
});

app.use(limiter);

let currentdata = {};

app.get('/', (req, res) => {
  res.json(currentdata);
});

app.post('/', (req, res) => {
  currentdata = req.body;
  res.send('Data received!');
  console.log(req.body);
});


https.createServer(sslOptions, app).listen(PORT, '0.0.0.0', () => {
  console.log(`HTTPS Server is running on https://0.0.0.0:${PORT}`);
});
