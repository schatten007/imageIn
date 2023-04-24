const express = require('express');
const router = express.Router();

const Image = require('../models/Image');
const { ensureAuthenticated } = require('../middleware/auth');
const { uploadImage, getImageURL } = require('../services/firebase.storage');

// 2. GET_All images
router.get("/all", async (req, res) => {
    downloadImage();
    res.status(200).json({});
})

// 3. GET_User images-PROTECTED
router.get("/user")

// 1. POST_Generate New Image-PROTECTED
router.post("/generate", ensureAuthenticated, async (req, res) => {
    uploadImage();
    res.status(200).json({});
})

// 4. DELETE_USER Image-PROTECTED
router.delete("/user/:id")



module.exports = router;