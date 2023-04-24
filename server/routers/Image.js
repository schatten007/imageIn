const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { ensureAuthenticated } = require('../middleware/auth');
const { uploadImage } = require('../controllers/firebase.storage');

// 2. GET_All images
router.get("/all")

// 3. GET_User images-PROTECTED
router.get("/user")

// 1. POST_Generate New Image-PROTECTED
router.post("/generate", ensureAuthenticated, async (req, res) => {
    uploadImage();
    res.send(200);
})

// 4. DELETE_USER Image-PROTECTED
router.delete("/user/:id")



module.exports = router;