const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Tell the app to serve up static files from these directories
app.use(express.static('./server/static/'));
app.use(express.static('./dist/'));

// Tell the app to parse HTTP body messages as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Server-side routes
const authRoutes = require('./server/routes/auth');
app.use('/auth', authRoutes);

// Always serve up the app (in case they navigate to a route other than /)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'server', 'static', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});
