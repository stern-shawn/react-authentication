const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

// connect to the database and load models
require('./server/models').connect(config.dbUri);

const app = express();

// Tell the app to serve up static files from these directories
app.use(express.static('./server/static/'));
app.use(express.static('./dist/'));

// Tell the app to parse HTTP body messages as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use passport middleware
app.use(passport.initialize());

// Load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// Use the authenticaion checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// Server-side routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Always serve up the app (in case they navigate to a route other than /)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'server', 'static', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});
