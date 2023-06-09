const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const sendVerificationEmail = require('../middleware/mailer');

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
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
  }
});

// Middleware to generate Auth Tokens
userSchema.methods.generateAuthToken = async function(){
  try{
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET);

  user.tokens = user.tokens.concat( { token } );

  await user.save();

  return token;
} catch(e) {
  return e.message;
}
}

// Middleware to remove the password field from user object before returning it
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.tokens;
  return user;
};


// Password Encryption Middleware
userSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) {
     return next();
  }

  bcrypt.genSalt((saltError, salt) => {
     if (saltError) {
        return next(saltError);
     }

     bcrypt.hash(user.password, salt, (hashError, hashedPassword) => {
        if (hashError) {
           return next(hashError);
        }

        user.password = hashedPassword;
        next();
     });
  });
});

// Password Matching Middleware
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
     if (error) {
        return callback(error);
     }

     callback(null, isMatch);
  });
};


userSchema.post('save', function(doc, next){
 try{ 
  const email = this.email;
  const token = this.verifyToken;
  
  // sendVerificationEmail(email, token);
  next();
}catch(e) {
  next(e.message);
}
})

// Virtual = Images, Likes, API Keys

const User = mongoose.model('User', userSchema);

module.exports = User;
