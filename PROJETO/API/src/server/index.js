require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

require('../configurations/passport');

// Configuration MongoDB.
const connectionDb = require('../configurations/mongoose');
connectionDb();

// Middlewares imports.
const notFound = require('../middlewares/404.js');
const bodyParser = require('body-parser');

// Port on Server configuration.
const HTTP_PORT = process.env.PORT;

// Server import.
const app = express();

// Configuration on Starter Server.
app.use(morgan('combined'));
app.use(bodyParser.json());

// Session Settings
app.use(session({
  secret: 'project aluguel mjm',
  resave: true,
  saveUninitialized: true
}));

// Starting Passport
app.use(passport.initialize());
app.use(passport.session());


//  Cors Settings
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

//Call Endpoints.
const authRoutes = require('../endpoints/auth-routes');
app.use('/api/auth', authRoutes);
const userEndpoint = require('../endpoints/user');
app.use('/api/users', userEndpoint);
const adRoutes = require('../endpoints/ad');
app.use('/api/ads', adRoutes);
const commentRoutes = require('../endpoints/comment');
app.use('/api/comments', commentRoutes);
const reservationRoutes = require('../endpoints/reservation');
app.use('/api/reservation', reservationRoutes);

app.get('*', (req, res) => notFound(req, res));

// Starting the Server.
app.listen(HTTP_PORT, () => {
  console.log(`My server is listening on port ${HTTP_PORT}!`);
});

module.exports = app;