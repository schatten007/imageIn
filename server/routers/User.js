const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST@user/register
router.post('/register', async (req, res) => {
  // Sign the token with the payload, secret key, and options
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

    
    res.status(201).json({ message: "User registered successfully", user: { user }})
  } catch(e){
    console.log(e);
    res.status(400).send({message: e.message});
  }
});

// POST@user/login
router.post('/login', (req, res) => {
  // your code here
  res.status(200).send(req.headers.authorization)
});

// GET user profile
router.get('/profile/:userId',(req, res) => {
  res.status(200).send(`Here is the information for user ${req.params.userId}`)
});

// POST logout
router.post('/logout', (req, res) => {
  // your code here
});


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



module.exports = router;