const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function ensureAuthenticated(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, verified) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
      if(!verified){
        return res.status(401).json({ success: false, message: 'Error: Not Verified. Please check your email for verification code before logging in.' });
      }
      req.user = user;
      req.token = req.header('Authorization').replace('Bearer ', '');
      return next();
    })(req, res, next);
  }

  const loginMiddleware = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password )
    return res.status(401).json({message: 'Email or Password Field Missing'});
    
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({message: 'Incorrect email or password.' });
      }
  
      if (!user.isVerified) {
        return res.status(401).json({message: 'Please verify your account before logging in. Check your email for verification.' });
      }
  
      await user.comparePassword(password, async (error, isMatch) => {
        if(error){
          throw new Error(error)
        }
        if (!isMatch) {
          return res.status(401).json({ message: 'Incorrect email or password.' });
        }
        
        const token = await user.generateAuthToken();
        req.token = token;
        req.user = user;
        next();
      });
  
    } catch (err) {
      console.log(err);
      return res.status(500).json({message: 'The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again'})
    }
  }

  const preventLogin = (req, res, next) => {
    if(!req.headers.authorization)
    return next();
    
    const token = req.headers.authorization.replace('Bearer ', '');
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return next();
        } else {
          return res.status(400).json({ message: 'User is already logged in' });
        }
      });
    } else {
      next();
    }  
  }

  
  module.exports = {
    ensureAuthenticated,
    loginMiddleware,
    preventLogin
  }
  