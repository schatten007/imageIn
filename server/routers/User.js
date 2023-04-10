const express = require('express');
const router = express.Router();

// POST signup
router.post('/signup', (req, res) => {
  // your code here
});

// POST login
router.post('/login', (req, res) => {
  // your code here
});

// GET user profile
router.get('/profile/:userId', (req, res) => {
  res.status(200).send(`Here is the information for user ${req.params.userId}`)
});

// POST logout
router.post('/logout', (req, res) => {
  // your code here
});

module.exports = router;