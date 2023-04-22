const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('../config/passport');
const { ensureAuthenticated, loginMiddleware, preventLogin } = require('../middleware/auth');
 

// POST@user/register
router.post('/register', async (req, res) => {
  try{
    if(!req.body.username || !req.body.email || !req.body.password)
    throw new Error('Error! Request Missing Username, Email or Password. Please try again');

    const { username, password, email } = req.body;
    const user = new User({
      username,
      password,
      email
    });

    const token = jwt.sign({email}, process.env.SECRET, { expiresIn: '1d'});
    user.verifyToken = token;
    
    await user.save();

    res.status(201).json({ message: "User registered successfully, please check your email for verification code before you can login.", user: { user }})
  } catch(e){

    console.log(e);
    res.status(400).json({message: e.message});
  }
});

// POST@user/login
router.post('/login', preventLogin, loginMiddleware, (req, res) => {
    const { user, token } = req;
    res.status(200).send({token})
  });


// POST logout
router.post('/logout', ensureAuthenticated, async (req, res) => {
  // Remove the Token from User Document
  try{

    req.user.tokens = req.user.tokens.filter(token =>{
      console.log(token.token === req.token)
      return token.token != req.token
    })

    await req.user.save();

    res.status(200).json({
      success: true,
      message: 'User successfully logged out.'
    });
  }catch(e){
    res.status(500).json({ success: false, message: e.message });
  }
});

router.post('/logoutall', ensureAuthenticated, async (req, res) => {
  // Remove the All Tokens from User Document
  try{
    req.user.tokens = [];

    await req.user.save();

    res.status(200).json({
      success: true,
      message: 'User successfully logged from all devices.'
    });
  }catch(e){
    res.status(500).json({ success: false, message: e.message });
  }
});


// GET@Email Verification
router.get('/verify-email/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await User.findOneAndUpdate(
      { email: decoded.email, verifyToken: token },
      { $set: { isVerified: true }, $unset: { verifyToken: 1 } },
      { new: true }
    );

    if (user) {
      res.status(200).json({ message: 'Email verified successfully' });
    } else {
      res.status(404).json({ message: 'Email verification failed' });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Email verification failed' });
  }
});

// GET user profile
router.get('/me', ensureAuthenticated, (req, res) => {
  
  res.status(200).json({ message: 'User information retrieved', user: req.user})
});


module.exports = router;