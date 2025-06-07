const express = require('express');
const Message = require('../models/message');
const User = require('../models/user');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// POST /messages/send
router.post('/send', auth, async (req, res) => {
  const { toUsername, content } = req.body;

  const recipient = await User.findOne({ username: toUsername });
  if (!recipient) return res.status(404).json({ error: 'Recipient not found' });

  await Message.create({
    sender: req.user._id, // Sender is from the token
    recipient: recipient._id,
    content,
  });

  res.status(201).json({ message: 'Message sent' });
});

// GET /messages
router.get('/', auth, async (req, res) => {
  const messages = await Message.find({ recipient: req.user._id })
    .populate('sender', 'username') // Show sender username
    .sort({ timestamp: -1 }); // Newest first

  res.json(messages);
});

module.exports = router;
