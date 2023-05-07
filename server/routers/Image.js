const express = require('express');
const router = express.Router();

const Image = require('../models/Image');
const { ensureAuthenticated } = require('../middleware/auth');
const { uploadImage, getImageURL } = require('../services/firebase.storage');
const { getBalance, getEngines, textToImage } = require('../services/stability.api');
const { img } = require('../constants/testimg');

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
    try {
        const user = req.user;
        const { textPrompts, steps } = req.body;
        if (!textPrompts) throw new Error("Prompts cannot be empty.");
      
        const negativePrompts = req.body.negativePrompts || "";
        // 1. Send Body to Image Generation Service - REVAMP
        const image = await textToImage(
          process.env.STABILITY_API_KEY,
          textPrompts,
          req.body
        );
        // 2. Create the image database document and get ID.
        const imageDocument = new Image({
          createdBy: user._id, // Assuming a valid ObjectId for the creator
          textPrompts,
          negativePrompts,
          seed: image.artifacts[0].seed,
          steps,
        });
        // 3. Save the image to cloud storage.
        await uploadImage(image.artifacts[0].base64, imageDocument._id.toString());
        // 4. Get image URL from cloud.
        const imgURL = await getImageURL(imageDocument._id.toString());
        // 5. Save add URL to image document, save the document.
        imageDocument.set("url", imgURL);
        const savedImage = await imageDocument.save();
        // 6. Respond with image URL to Client.
        res.status(200).json({ message: "Done", imgURL });
      } catch (error) {
        // Handle errors based on their type or message.
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ message: error.message });
        } else if (error.message === "Prompts cannot be empty.") {
          return res.status(400).json({ message: error.message });
        } else {
          return res.status(500).send({ message: error.message });
        }
      }
})

// 4. DELETE_USER Image-PROTECTED
router.delete("/user/:id")


module.exports = router;