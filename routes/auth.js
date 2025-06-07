const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// POST /auth/register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    await User.create({ username, password }); // Automatically hashes password
    res.status(201).json({ message: 'User registered successfully' });
  } catch {
    res.status(400).json({ error: 'Username already exists' });
  }
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d', // Token lasts for 1 day
  });

  res.json({ token }); // Send token back to user
});

module.exports = router;
