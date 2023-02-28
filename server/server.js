const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const PORT = 3000;

mongoose.connect(
  'mongodb+srv://mleong:U1bZDeMV5MKoClSW@soloproject.zjpkk6b.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve('./client/index.html'));
});

app.get('/nutrients', (req, res) => {
  return res.status(200).json({});
});

app.post('/:name', (req, res) => {
  return res.status(200).json({});
});

app.delete('/:name', (req, res) => {
  return res.status(200).json({});
});

app.use((req, res) => {
  return res.status(404).send('page not found');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log('err.log is: ', err.log);

  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});
