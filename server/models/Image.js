const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
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
    type: String,
    required: true,
    trim: true,
  },
  steps: {
    type: Number,
    required: true,
  },
});


module.exports = mongoose.model('Image', imageSchema);