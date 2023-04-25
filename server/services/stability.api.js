const { apiClient } = require('../config/stability.api');

// engine_id = stable-diffusion-v1-5 
// or        = stable-diffusion-v1

const apiRequest = async(path, key, body = "", method = "GET") => {
    if (!key) throw new Error("Missing API Key");

    const config = {
        headers: {Authorization: `Bearer ${key}`},
        data: body
    }

    if(method==="POST"){
        const response = await apiClient.post(path, config);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        return response.data;
    }else{
        const response = await apiClient.get(path, config);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

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

const textToImage = async(key, textPrompts, config = {}) => {
    try{

        const body = {
        textPrompts: textPrompts,
        negativePrompts: [],
        height: 512,
        width: 512,
        cfgScale: 7,
        samples: 1,
        seed: 0,
        steps: 25,
        engineId: "stable-diffusion-v1-5"
        }
        const image = await apiRequest(`generation/${configuration.engineId}/text-to-image`, key, body, "POST");
    }catch(error){
        throw error;
    }
}

module.exports = {
    getBalance,
    getEngines
}