import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BsBook } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { generateImage } from "../app/services/image.service";

const ImageGeneration = () => {
  const [ apiKey, setApiKey ] = useState(null);
  const [ textInput, setTextInput ] = useState({ prompts: "", key: "", negativePrompts: "", seed: ""});
  const [ sliderInput, setSliderInput ] = useState({ cfg: 7, steps: 15})
  const [ generatedImage, setGeneratedImage ] = useState(null);
  const [ message, setMessage ] = useState({ keyMessage: null, promptsMessage: null });
  const [ imageURL, setImageURL ] = useState("");
  const [ imageLoading, setImageLoading ] = useState(false);
  const [ balance, setBalance ] = useState(null);

  const dispatch = useDispatch();

  const submitKey = async (e) => {
    e.preventDefault();
    const { key } = textInput;
    const regex = /^sk-[A-Za-z0-9-_]{22,64}$/;
    if(!regex.test(key)){
      setMessage({...message, keyMessage: "API Key pattern is not valid."});
      return;
    }
    try {
      const keyCheck = await axios.get("https://api.stability.ai/v1/user/balance", {
      headers: { Authorization: `Bearer ${key}`}
      });
      setMessage({...message, keyMessage: `API connected successfully!`});
      setBalance(keyCheck.data.credits);
      setApiKey(textInput.key);
    }catch(e){
      (e.message==="Request failed with status code 401") ? 
        setMessage({...message, keyMessage: "Invalid API key provided"})
      :
        setMessage({...message, keyMessage: e.message})
    }
  }

  const beginGeneration = (event) => {
    event.preventDefault();
    const { prompts, key, negativePrompts } = textInput;
    const { cfg, steps } = sliderInput;
    if(!key){
      setMessage({...message, promptsMessage: "Enter a valid API key before attempting to generate image."});
      return;
    }
    if(!prompts){
      setMessage({...message, promptsMessage: "Prompts cannot be empty."});
      return;
    }
    if(balance<=0.8){
      setMessage({...message, promptsMessage: "Not enough credits to generate image."})
      return;
    }
    setImageLoading(true);
    const body = {
      key: apiKey,
      textPrompts: prompts,
      negativePrompts: negativePrompts || "",
      height: 512,
      width: 512,
      cfgScale: cfg || 7,
      samples: 1,
      seed: (textInput.seed && Number(textInput.seed)) || 0,
      steps,
      engine: "stable-diffusion-v1-5"
    };
    
    generateImage(body)
      .then(async (response) => {
        setImageURL(response.data.imgURL);
        const keyCheck = await axios.get("https://api.stability.ai/v1/user/balance", {
        headers: { Authorization: `Bearer ${key}`}
        });
        setBalance(keyCheck.data.credits);
        setImageLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setMessage({...message, promptMessage: error.message});
        setImageLoading(false);
    });
  }

  return (
      <div className="flex min-h-screen">
        <div className="w-8/12 bg-gray-200 flex-col flex space-y-8 p-12">
          <h3 className="text-3xl font-bold dark:text-white mx-0 sm:mx-12 sm:mt-0">Generation</h3>
          {balance && <h4 class="text-2xl font-bold dark:text-white mx-0 sm:mx-12 sm:mt-0">Credits: {balance.toString().substring(0, 5)}</h4>}

          <form className="mx-0 sm:mx-12 flex" onSubmit={beginGeneration}>
            <div className='w-full py-2 px-4 block'>
              <textarea
                className="w-full h-28 resize-none placeholder-gray-500 focus:outline-none focus:bg-white focus:shadow-outline focus:border-blue-300 dark:bg-gray-900 dark:text-gray-300 dark:focus:bg-gray-800 dark:focus:border-blue-300 dark:placeholder-gray-400 dark:border-gray-600 rounded-md border-gray-300 sm:text-md mb-2 md:mb-0"
                placeholder="Enter Prompts"
                onChange={(event)=> setTextInput({ ...textInput, prompts: event.target.value })}
                value={textInput.prompts}>  
              </textarea>
              {message.promptsMessage && <p class={`mt-2 text-sm text-red-700 dark:text-red-500`}><span class="font-medium"></span>{message.promptsMessage}</p>}
            </div>
            <div className="space-y-2 pt-2 self-center">
            <button disabled={imageLoading} className="bg-gray-900 whitespace-nowrap hover:bg-gray-700 text-white px-4 py-4 ml-4 rounded-md text-md">
            {imageLoading && <svg aria-hidden="true" role="status" class="inline w-6 h-6 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>}
              {(imageLoading) ? "Generating..." : "Lets Go!"}
            </button>
            </div>
          </form>
          <div className="h-3/4 border border-solid p-4 sm:p-8 border-white dark:border-gray-500 mx-0 sm:mx-12 sm:mt-10">
            {(!imageURL && !imageLoading) && <h3 className="text-3xl font-bold text-gray-500 dark:text-white text-center">Generated image will be displayed here</h3>}
            {imageLoading && <h3 className="text-3xl font-bold text-gray-500 dark:text-white text-center">Generating Image. Should take up to 20 seconds....</h3>}
            {imageURL && <img src={imageURL} alt="Generated Image" className="max-w-full h-auto mx-auto" />}
          </div>
        </div>

        <div className="w-4/12 bg-gray-300 flex flex-col pb-4">
          <div className="flex justify-between items-center  mx-0 sm:mx-12 sm:mt-10">
            <h3 className="text-3xl font-bold dark:text-white">Settings</h3>
            <button className='bg-transparent text-black font-semibold text-md flex gap-2 items-center justify-center hover:text-gray-600'>
              <BsBook /> Guide
            </button>
          </div>

          <form className="flex flex-col justify-content-center" onSubmit={submitKey}>
            <div className="mx-12 mt-10 text-xs p-2">
              <label for="success" class={`block mb-2 text-sm font-medium ${message.keyMessage && (message.keyMessage==="API Key pattern is not valid." ? 'text-red-700 dark:text-red-500' : 'text-green-700 dark:text-green-500')}`}>Enter API Key</label>
              <input 
              type="text" id="success" 
              value={textInput.key}
              onChange={(event) => setTextInput({...textInput, key: event.target.value})}
              class={`bg-white border block w-full p-2.5 dark:bg-gray-700 text-sm rounded-lg ${message.keyMessage && (message.keyMessage==="API Key pattern is not valid." ? 'border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500  focus:ring-red-500 focus:border-red-500 dark:border-red-500' : 'border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500  focus:ring-green-500 focus:border-green-500 dark:border-green-500')}`}
              placeholder="Enter API Key" />
              {message.keyMessage && <p class={`mt-2 text-sm ${(message.keyMessage==="API Key pattern is not valid." ? 'text-red-700 dark:text-red-500' : 'text-green-700 dark:text-green-500')}`}><span class="font-medium"></span>{message.keyMessage}</p>}
            </div>
            <button className="bg-gray-900 hover:bg-gray-700 text-white px-2 py-2 mx-12 rounded-md float-right text-xs self-end mt-2">
              Connect
            </button> 
          </form>

          <div className="flex flex-col justify-between space-y-6  mx-0 sm:mx-12 sm:mt-10">
            <div className="flex flex-col justify-between items-left space-y-2">
              <h5 className="text-xl font-bold dark:text-white">Negative Prompts</h5>
              <textarea
              className="w-full h-28 py-2 px-4 resize-none block placeholder-gray-500 focus:outline-none focus:bg-white focus:shadow-outline focus:border-blue-300 dark:bg-gray-900 dark:text-gray-300 dark:focus:bg-gray-800 dark:focus:border-blue-300 dark:placeholder-gray-400 dark:border-gray-600 rounded-md border-gray-300 sm:text-md mb-2 md:mb-0"
              placeholder="Enter Negative Prompts"
              onChange={(event)=> setTextInput({ ...textInput, negativePrompts: event.target.value })}
              value={textInput.negativePrompts}>
            </textarea>
            </div>
            <div className="flex flex-wrap justify-between items-center space-y-3">
              <h5 className="text-xl block font-bold dark:text-white">CFG Scale</h5>              
              <input id="minmax-range" type="range" min="0" max="35" value={sliderInput.cfg} onChange={(e) => setSliderInput({...sliderInput, cfg: e.target.value})} class="w-full h-2 bg-gray-200  rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
              <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{sliderInput.cfg}</label>
            </div>
            <div className="flex flex-wrap justify-between items-center space-y-3">
              <h5 className="text-xl block font-bold dark:text-white">Sampling Steps</h5>              
              <input id="minmax-range" type="range" min="1" max="25" value={sliderInput.steps} onChange={(e) => setSliderInput({...sliderInput, steps: e.target.value})} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
              <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{sliderInput.steps}</label>
            </div>
            <div className="flex flex-wrap justify-between items-center space-y-3">
              <div className="w-full">
                  <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><h5 class="text-xl block font-bold dark:text-white">Seed</h5></label>
                  <input value={textInput.seed} onChange={(e) => {
                    const regex = /^[0-9\b]+$/;
                    const newValue = e.target.value;
                    if (newValue === "" || regex.test(newValue) && newValue.length<=10) {
                      if(Number(e.target.value)>4294967295){
                        e.target.value = "4294967295"
                        setTextInput({...textInput, seed: "4294967295"})
                      }
                      setTextInput({...textInput, seed: e.target.value})
                    }
                  }} 
                  placeholder='Leave blank for Random Seed' type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ImageGeneration;