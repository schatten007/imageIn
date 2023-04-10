import React, {useState } from 'react'

const SearchBox = () => {
    const [ searchInput, setSearchInput ] = useState('');


    return (
        <>
        <div className='items-center flex flex-col mt-2 py-2 text-gray-200'>
            <h1 className="block text-[20px] font-rhodium relative text-3xl md:text-4xl mb-1">
                ImageIn
            </h1>
            <h2 className='font-inter font-medium text-[13px] leading-none uppercase tracking-widest'>
                AI Image Generation Engine
            </h2>
        </div>
        <form className="bg-transparent p-6 rounded-md w-1/2">
            <textarea
            className="w-full h-32 px-3 py-2 resize-none mb-3 text-white bg-transparent rounded-md border border-white focus:outline-none focus:border-blue-500"
            placeholder="Search Keywords/Prompt"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            ></textarea>
            <button className="bg-blue-600 text-white px-3 py-2 rounded-md float-right text-xs hover:bg-blue-500">
            Search
            </button>
        </form>
        </>
    )
}

export default SearchBox