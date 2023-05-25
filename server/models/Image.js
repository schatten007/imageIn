const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  textPrompts: {
    type: String,
    required: true,
    trim: true,
  },
  negativePrompts: {
    type: String,
    required: false,
    trim: true,
  },
  seed: {
    type: Number,
    required: true,
    trim: true,
  },
  steps: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true
});


module.exports = mongoose.model('Image', imageSchema);