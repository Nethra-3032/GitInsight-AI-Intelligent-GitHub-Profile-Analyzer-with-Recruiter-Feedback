const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  score: Number,
  lastAnalyzed: Date
});

module.exports = mongoose.model('User', userSchema);