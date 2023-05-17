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
router.get("/user", async (req, res) => {
  
  try{
    const { page = 1, limit = 5 } = req.query;
    const images = await Image.find()

  }catch(e){

  }
})

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
        const { textPrompts, steps = 20, key } = req.body;
        if(!key) throw new Error("Add a valid API key to request body");
        if (!textPrompts) throw new Error("Prompts cannot be empty.");
      
        const negativePrompts = req.body.negativePrompts || "";
        // 1. Send Body to Image Generation Service - REVAMP
        const image = await textToImage(
          key,
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
        res.status(200).json({ message: "Image Generated Successfully.", imgURL });
      } catch (error) {
        // Handle errors based on their type or message.
        if (error.message === "Prompts cannot be empty.") {
          return res.status(400).json({ message: error.message });
        } else {
          return res.status(500).send({ message: error.message });
        }
      }
})

// 4. DELETE_USER Image-PROTECTED
router.delete("/user/:id")


module.exports = router;