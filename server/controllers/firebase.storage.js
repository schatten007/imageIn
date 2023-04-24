const { storage } = require('../config/firebase'); 
const { ref, uploadString  } = require("firebase/storage");

const { testimg } = require("./testimg");
const base64img = testimg.image.data;

const uploadImage = async() => {
    const testRef = ref(storage, 'test.jpg');
    
    uploadString(testRef, base64img, 'base64').then((snapshot) => {
    console.log('Uploaded a base64 string!');
    });

}


module.exports = {
    uploadImage
}