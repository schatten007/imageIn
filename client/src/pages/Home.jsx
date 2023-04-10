import React from 'react'
import { ImageGallery, SearchBox } from '../components'

const Home = () => {
  return (
    <div className="flex flex-col justify-start items-center min-h-screen">
      <SearchBox />
      <ImageGallery />
    </div>
  )
}

export default Home