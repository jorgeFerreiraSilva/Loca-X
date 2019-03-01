require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const HTTP_PORT = process.env.PORT;

const app = express();

app.listen(HTTP_PORT, () => {
  console.log(`My server is listening on port ${HTTP_PORT}!`);
});