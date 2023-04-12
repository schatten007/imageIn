const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

// POST@user/register
router.post('/register', (req, res) => {
  // Sign the token with the payload, secret key, and options
  const token = jwt.sign({_id: req.headers._id}, process.env.SECRET, { expiresIn: '1d'});
  // Add User to DB
  // Generate Token using UserID
  // Send Confirmation Email using Nodemailer
  // Send Response

  res.status(200).json(token)
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

module.exports = router;