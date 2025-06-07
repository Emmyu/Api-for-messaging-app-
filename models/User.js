const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Used to hash passwords

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true }, // Must be unique
  password: { type: String, required: true }
});

// Before saving a user, hash the password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip if already hashed
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords during login
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema); // Export the model
