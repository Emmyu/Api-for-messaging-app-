const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Who sent it
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Who it's for
  content: { type: String, required: true }, // Message text
  timestamp: { type: Date, default: Date.now } // When it was sent
});

module.exports = mongoose.model('Message', messageSchema);
