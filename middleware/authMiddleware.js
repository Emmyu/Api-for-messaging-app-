const jwt = require('jsonwebtoken');
const User = require('../models/user');

// This function runs before routes that require authentication
module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get the Bearer token
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
    req.user = await User.findById(decoded.id).select('-password'); // Attach user to request
    next(); // Allow access to route
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};
