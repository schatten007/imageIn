import React, { useEffect, useState } from 'react'
import ImageResource from '../assets/TestPng'
import LoadingSpinner from './LoadingSpinner';


const ImageGallery = () => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    const waitBeforeAssign = async () => {
      function waitTwoSeconds() {
        setTimeout(() => {
          setImages(ImageResource);
        }, 2000);
      }
      waitTwoSeconds();
    }
    waitBeforeAssign();
  }, [ImageResource])

  const ImageComponent = () => {
    return(
      <section className="overflow-hidden text-neutral-700">
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
          <div className="-m-1 flex flex-wrap md:-m-2">
            {
              images.map(image => {
                return(
                  <div className="flex w-1/3 flex-wrap">
                    <div className="w-full p-1 md:p-2">
                      <img
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center"
                        src={image} />
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>

    )
  }

  return (images) ? <ImageComponent /> : <LoadingSpinner />
}

export default ImageGallery;