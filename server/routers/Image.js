const express = require('express');
const router = express.Router();

const Image = require('../models/Image');
const { ensureAuthenticated } = require('../middleware/auth');
const { uploadImage, getImageURL } = require('../services/firebase.storage');
const { getBalance, getEngines } = require('../services/stability.api');

// ADD 1. Rate Limiter, 2. Cache

// 2. GET_All images
router.get("/all", async (req, res) => {
    downloadImage();
    res.status(200).json({});
})

// 3. GET_User images-PROTECTED
router.get("/user")

// Replace later with Error handling middleware
router.get("/info", ensureAuthenticated ,async(req, res) => {
    try{
        const balance = await getBalance(process.env.STABILITY_API_KEY);
        const engines = await getEngines(process.env.STABILITY_API_KEY);
        res.status(200).json({ balance, engines });
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

// POST_Generate New Image-PROTECTED
router.post("/generate/text2img", ensureAuthenticated, async (req, res) => {
    try{
        const user = req.user;
        const { textPrompts } = req.body;
        if(!textPrompts) throw new Error("Prompts cannot be empty.");

        // 1. Send Body to Image Generation Service
        // 2. Wait and recieve image.
        // 3. Save the image to a cloud storage.
        // 4. Get Image URL from storage.
        // 5. Save the URL into my database, along with metadata.
        // 6. Respond with image URL to Client.
        
        res.status(200).json({message: "Done"})
    } catch(error){
        
        if(error.message==="Prompts cannot be empty."){
            return res.status(400).json({message: error.message});
        }

        return res.status(500).send({message: error.message})
    }
})

// 4. DELETE_USER Image-PROTECTED
router.delete("/user/:id")


module.exports = router;