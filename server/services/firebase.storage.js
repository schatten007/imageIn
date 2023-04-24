const { storage } = require('../config/firebase'); 
const { ref, uploadString, getDownloadURL } = require("firebase/storage");

// const { testimg } = require("./testimg");
// const base64img = testimg.image.data;

const uploadImage = async (base64img, imageID) => {
    try {
        const imageRef = ref(storage, `images/${imageID}.jpg`);
        const uploadTask = await uploadString(imageRef, base64img, 'base64');
    } catch(error){
        console.error(error.message);
        return (error && error.message) ? error.message : error;
    }
}

const getImageURL = async(imageID) => {
    try{
        const testRef = ref(storage, `images/${imageID}.jpg`);
        const url = await getDownloadURL(testRef);
        return url;
    }catch(error){  
        return (error && error.message) ? error.message : error;
    }
}


module.exports = {
    uploadImage,
    getImageURL
}