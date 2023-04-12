const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        });
      },
      message:
        'Password should contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Invalid email address']
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: true
  }
});

// Virtual = Images, Likes, API Keys

const User = mongoose.model('User', userSchema);

module.exports = User;
