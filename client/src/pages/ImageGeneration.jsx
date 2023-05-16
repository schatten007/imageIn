import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BsBook } from "react-icons/bs"

const ImageGeneration = () => {
  const [ apiKey, setApiKey ] = useState(null);
  const [ textInput, setTextInput ] = useState({ prompts: "", key: "", negativePrompts: "", seed: ""});
  const [ sliderInput, setSliderInput ] = useState({ cfg: 7, steps: 15})
  const [ generatedImage, setGeneratedImage ] = useState(null);
  const [ message, setMessage ] = useState({ keyMessage: null, promptsMessage: null });

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
      setMessage({...message, keyMessage: `Your remaining balance is ${keyCheck.data.credits}`});
      setApiKey(textInput.key);
    }catch(e){
      (e.message==="Request failed with status code 401") ? 
        setMessage({...message, keyMessage: "Invalid API key provided"})
      :
        setMessage({...message, keyMessage: e.message})
    }
  }

  const generateImage = (e) => {
    e.preventDefault();
    const { prompts } = textInput;
    if(!prompts) return; //Display error message that prompts are needed before returning.
    
  }

  return (
      <div className="flex min-h-screen">
        <div className="w-8/12 bg-gray-200 flex-col flex space-y-8 p-12">
          <h3 class="text-3xl font-bold dark:text-white mx-0 sm:mx-12 sm:mt-0">Generation</h3>
          <form className="mx-0 sm:mx-12 sm:mt-10 flex items-center" onSubmit={generateImage}>
            <textarea
              className="w-full h-28 py-2 px-4 resize-none block placeholder-gray-500 focus:outline-none focus:bg-white focus:shadow-outline focus:border-blue-300 dark:bg-gray-900 dark:text-gray-300 dark:focus:bg-gray-800 dark:focus:border-blue-300 dark:placeholder-gray-400 dark:border-gray-600 rounded-md border-gray-300 sm:text-sm mb-2 md:mb-0"
              placeholder="Enter Prompts"
              onChange={(event)=> setTextInput({ ...textInput, prompts: event.target.value })}
              value={textInput.prompts}>  
            </textarea>
            
            <button className="bg-gray-900 hover:bg-gray-700 text-white px-8 py-2 ml-4 rounded-md text-md self-center">
              Lets Go!
            </button>
          </form>
          <div className="h-3/4 border border-solid p-4 sm:p-8 border-white dark:border-gray-500 mx-0 sm:mx-12 sm:mt-10">
            <h3 class="text-3xl font-bold text-gray-500 dark:text-white text-center">Generated image will be displayed here</h3>
          </div>
        </div>

        <div className="w-4/12 bg-gray-300 flex flex-col pb-4">
          <div className="flex justify-between items-center  mx-0 sm:mx-12 sm:mt-10">
            <h3 class="text-3xl font-bold dark:text-white">Settings</h3>
            <button className='bg-transparent text-black font-semibold text-md flex gap-2 items-center justify-center hover:text-gray-600'>
              <BsBook /> Guide
            </button>
          </div>

          <form className="flex flex-col justify-content-center" onSubmit={submitKey}>
            <div class="mx-12 mt-10 text-xs p-2">
              <label for="success" class={`block mb-2 text-sm font-medium ${message.keyMessage && (message.keyMessage==="API Key pattern is not valid." ? 'text-red-700 dark:text-red-500' : 'text-green-700 dark:text-green-500')}`}>Enter API Key</label>
              <input 
              type="text" id="success" 
              value={textInput.key}
              onChange={(event) => setTextInput({...textInput, key: event.target.value})}
              class={`bg-green-50 border block w-full p-2.5 dark:bg-gray-700 text-sm rounded-lg ${message.keyMessage && (message.keyMessage==="API Key pattern is not valid." ? 'border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500  focus:ring-red-500 focus:border-red-500 dark:border-red-500' : 'border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500  focus:ring-green-500 focus:border-green-500 dark:border-green-500')}`}
              placeholder="Enter API Key" />
              {message.keyMessage && <p class={`mt-2 text-sm ${(message.keyMessage==="API Key pattern is not valid." ? 'text-red-700 dark:text-red-500' : 'text-green-700 dark:text-green-500')}`}><span class="font-medium"></span>{message.keyMessage}</p>}
            </div>
            <button className="bg-gray-900 hover:bg-gray-700 text-white px-2 py-2 mx-12 rounded-md float-right text-xs self-end mt-2">
              Connect
            </button> 
          </form>

          <div className="flex flex-col justify-between space-y-6  mx-0 sm:mx-12 sm:mt-10">
            <div className="flex flex-col justify-between items-left space-y-2">
              <h5 class="text-xl font-bold dark:text-white">Negative Prompts</h5>
              <textarea
              className="w-full h-28 py-2 px-4 resize-none block placeholder-gray-500 focus:outline-none focus:bg-white focus:shadow-outline focus:border-blue-300 dark:bg-gray-900 dark:text-gray-300 dark:focus:bg-gray-800 dark:focus:border-blue-300 dark:placeholder-gray-400 dark:border-gray-600 rounded-md border-gray-300 sm:text-sm mb-2 md:mb-0"
              placeholder="Enter Negative Prompts"
              onChange={(event)=> setTextInput({ ...textInput, negativePrompts: event.target.value })}
              value={textInput.negativePrompts}>  
            </textarea>
            </div>
            <div className="flex flex-wrap justify-between items-center space-y-3">
              <h5 class="text-xl block font-bold dark:text-white">CFG Scale</h5>              
              <input id="minmax-range" type="range" min="0" max="35" value={sliderInput.cfg} onChange={(e) => setSliderInput({...sliderInput, cfg: e.target.value})} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
              <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{sliderInput.cfg}</label>
            </div>
            <div className="flex flex-wrap justify-between items-center space-y-3">
              <h5 class="text-xl block font-bold dark:text-white">Sampling Steps</h5>              
              <input id="minmax-range" type="range" min="1" max="25" value={sliderInput.steps} onChange={(e) => setSliderInput({...sliderInput, steps: e.target.value})} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
              <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{sliderInput.steps}</label>
            </div>
            <div className="flex flex-wrap justify-between items-center space-y-3">
              <div class="w-full">
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