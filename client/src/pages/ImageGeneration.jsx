import React, { useState, useEffect } from 'react' 

const ImageGeneration = () => {
  const [ apiKey, setApiKey ] = useState(null);
  const [ textInput, setTextInput ] = useState({ prompts: "", key: ""});
  const [ generatedImage, setGeneratedImage ] = useState(null);

  const submitKey = (e) => {
    e.preventDefault();
    if(textInput.key.length)
    setApiKey(textInput.key);
  }

  const generateImage = () => {

  }

  return (
      <div className="flex h-screen">
        <div className="w-8/12 bg-gray-300 flex flex-col space-y-12 p-12">
          <form className="mx-0 sm:mx-12 sm:mt-10 flex flex-col items-center">
            <textarea
              className="w-full h-20 py-2 px-4 resize-none block placeholder-gray-500 focus:outline-none focus:bg-white focus:shadow-outline focus:border-blue-300 dark:bg-gray-900 dark:text-gray-300 dark:focus:bg-gray-800 dark:focus:border-blue-300 dark:placeholder-gray-400 dark:border-gray-600 rounded-md border-gray-300 sm:text-sm mb-2 md:mb-0"
              placeholder="Enter Prompts"
              onChange={(event)=> setTextInput({ ...textInput, prompts: event.target.value })}
              value={textInput.prompts}>
            </textarea>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-md float-right text-xs hover:bg-blue-500 self-end mt-2">
              Go!
            </button>
          </form>
          <div className="border border-solid p-4 sm:p-8 border-white dark:border-gray-500 mx-0 sm:mx-12 sm:mt-10">
            <h3 className='text-xl'>Generated Image Here</h3>
          </div>
        </div>

        <div className="w-4/12 bg-gray-400 flex flex-col">
            <form className="flex flex-col justify-content-center" onSubmit={submitKey}>
              <input type="text" className="mx-12 mt-10 text-xs p-2" placeholder='API KEY HERE' 
              value={textInput.key}
              onChange={(event) => setTextInput({...textInput, key: event.target.value})}
              />
              <button className="bg-blue-600 text-white px-2 py-2 mx-12 rounded-md float-right text-xs hover:bg-blue-500 self-end mt-2">
                Connect
              </button>
            </form>
        </div>
      </div>
  )
}

export default ImageGeneration