const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../../config');

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) { return res.status(401).end(); }

  // Get the last part of the authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];
  // Decode the token
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;

    // Check if the user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) { return res.status(401).end(); }

      // No errors? Proceed to next middleware!
      return next();
    });
  });
};
