const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const apiRouter = require(path.resolve('./server/routes/api.js'));
require('dotenv').config({ path: path.resolve('./server/.env') });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

const corsOptions = { origin: 'http://localhost:8080' };
const configuredCors = cors(corsOptions);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.options('*', configuredCors);
app.use(cors());
app.use(morgan('dev'));

app.use('/dist', express.static(path.resolve('./dist')));
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve('./client/index.html'));
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

app.listen(process.env.PORT, () => {
  console.log(`server listening on port: ${process.env.PORT}`);
});
