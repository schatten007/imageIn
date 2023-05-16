const { apiClient } = require('../config/stability.api');
const axios = require("axios")
// engine_id = stable-diffusion-v1-5 
// or        = stable-diffusion-v1

const apiRequest = async(path, key, body = {}, method = "GET") => {
    if (!key) throw new Error("Missing API Key");

    const config = {
        headers: {
            Authorization: `Bearer ${key}`, 
            Accept: 'application/json'
        }
    }


    if(method==="POST"){
        const response = await apiClient.post(path, body, config);
        if (response.status!=200) throw new Error(`HTTP error! status: ${response.status}`);

        return response.data;
    }else{
        const response = await apiClient.get(path, config);
        if (response.status!==200) throw new Error(`HTTP error! status: ${response.status}`)

        return response.data;
    }
}


const getBalance = async (key) => {
    try{
        const balance = await apiRequest('user/balance', key, null, "GET");
        return balance;
    }catch(error){
        throw error;
    }
}

const getEngines = async (key) => {
    try {
        const engines = await apiRequest('engines/list', key, null, "GET");
        return engines;
    } catch(error){
        throw error;
    }
}

const textToImage = async(key, positivePrompts, config = {}) => {
    try{
        const negativePrompts = config.negativePrompts || null;


        const body = {
        text_prompts: [
            {
                text: positivePrompts,
                weight: 0.6
            },
            {
                text: negativePrompts,
                weight: -0.6
            }
        ],
        height: 512,
        width: 512,
        cfg_scale: 7,
        samples: 1,
        seed: 0,
        steps: 25,
        }
        

        const image = await apiRequest(`generation/${config.engine}/text-to-image`, key, body, "POST");
        return image;
    }catch(error){
        throw error;
    }
}

module.exports = {
    getBalance,
    getEngines,
    textToImage
}