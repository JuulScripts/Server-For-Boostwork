const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
