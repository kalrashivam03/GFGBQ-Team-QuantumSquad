const mongoose = require('mongoose');

const ScanSchema = new mongoose.Schema({
  type: String, // text or image
  aiGenerated: Boolean,
  confidence: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scan', ScanSchema);
