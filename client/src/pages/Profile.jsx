import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { Tab } from '@headlessui/react';

import {Avatar, Alert} from '../components';
import { getUserImages, postImage } from "../app/services/image.service";

const Profile = () => {
  const user = useSelector((state) => state.user)
  
  return (
    <>
    <div className="min-h-screen space-y-8 flex flex-col align-center mx-8 sm:mx-16 lg:mx-32 py-6 sm:py-8 lg:py-12">
      <div className="min-w-full">
        <Avatar />  
      </div>

      <div className="min-w-full">
        <h1 className="font-bold text-[28px] text-white dark:text-gray-200">Welcome {(user && user.username) && user.username || "Username"}</h1>
      </div>
      
      <TabComponent user={user} />
    </div>
    </>
  )
}

function TabComponent({ user }) {
  const [currentTab, setCurrentTab] = useState(0);
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const Modal = ({ activeImage, setActiveImage, setActiveAlert }) => {
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null);
    const [imageTitle, setImageTitle] = useState(null);
    const [showMessage, setShowMessage] = useState("Image posted succesffully!");
    const errorStyle = "focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500";
    const textRef = useRef();
    
    useEffect(() => {
      (activeImage) ? setShowModal(true) : setShowModal(false)
      setShowMessage(null);
      setImageTitle(null);
    }, [activeImage])

    useEffect(() => {
      function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setShowModal(false);
          setActiveImage(null);
        }
      }
      if(activeImage) 
      document.addEventListener('click', handleClickOutside);  
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [activeImage]);  

    const publishImage = async () => {
      if(!imageTitle){
        textRef.current.focus();
        setShowMessage("Error: Need to add an image title");
        return;
      }
      try{
        const response = await postImage(activeImage._id, imageTitle);
        setActiveAlert({
          type: "success",
          message: "Image posted succesffully!"
        });
      }catch(e){
        const msg = (e && e.message) || e.toString();
        setActiveAlert({
          type: "error",
          message: `Error: ${msg}`
        });
      }
    }

    return (
      <>
        {
        showModal ?
         (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-fit" ref={modalRef}>
                {/*content*/}
                <div className="dark:bg-gray-800 dark:text-gray-100 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      {(activeImage.title) ? activeImage.title :
                      <input ref={textRef} onChange={(e) => setImageTitle(e.target.value)} value={imageTitle} placeholder='Enter Image Title' type="text" id="default-input" class={`bg-transparent text-gray-900 border-none text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${(showMessage && showMessage.slice(0,5)==="Error") && errorStyle}`}/>}
                      {(showMessage && showMessage==="Error: Need to add an image title") && <p className='text-sm px-3 text-red-600'>{showMessage}</p>}
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black dark:text-gray-100 opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-3 flex flex-row">
                    <div className="p-3 mr-4">
                      <img className="h-auto max-w-lg rounded-lg" src={activeImage.url} alt="Selected Image" />
                    </div>
                    <div class="w-full space-y-5 text-base lg:w-3/5 lg:px-10"> 
                      <h2 class="text-xl font-semibold mb-2">Prompts</h2>  
                      <textarea class="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 resize-none lg:w-96 h-40 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none disabled:bg-gray-300 disabled:text-gray-700 dark:disabled:bg-gray-600 dark:disabled:text-gray-100 dark:border-gray-600 dark:bg-gray-700" disabled>{activeImage.textPrompts}</textarea>       
                      <h2 class="text-xl font-semibold my-6">Negative Prompts</h2>       
                      <textarea class="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 resize-none lg:w-96 h-40 px-4 py-2 border border-gray-300 rounded-xl disabled:bg-gray-300 disabled:text-gray-700 dark:disabled:bg-gray-600 dark:disabled:text-gray-100 dark:border-gray-600 dark:bg-gray-700" disabled>{activeImage.negativePrompts}</textarea>  
                      <div class="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:space-x-10">
                        <div class="w-full">       
                          <h2 class="text-xl font-semibold">Steps</h2>  
                          <p class="text-gray-500 dark:text-gray-400">{activeImage.steps}</p> 
                        </div>
                        <div class="w-full mt-5">  
                          <h2 class="text-xl font-semibold">Seed</h2>  
                          <p class="text-gray-500 dark:text-gray-400">{activeImage.seed}</p>    
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  {(activeImage && !activeImage.title) &&
                    <button onClick={publishImage} type="button" class="self-end text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-400 dark:focus:ring-blue-500 dark:border-blue-500">Publish Image</button>}
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    );
  }
  

  const ImageGallery = ({ images, loadingStatus, setLoadingStatus, setActiveImage }) => {
    const handleImageLoad = (index) => {
      setLoadingStatus((prevLoadingStatus) => {
        const updatedLoadingStatus = [...prevLoadingStatus];
        updatedLoadingStatus[index] = false;
        return updatedLoadingStatus;
      });
    };
  
    const handleImageError = (index) => {
      setLoadingStatus((prevLoadingStatus) => {
        const updatedLoadingStatus = [...prevLoadingStatus];
        updatedLoadingStatus[index] = false;
        return updatedLoadingStatus;
      });
      // Set a fallback image URL or error message
      setImageUrls((prevImageUrls) => {
        const updatedImageUrls = [...prevImageUrls];
        updatedImageUrls[index] = "https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg";
        return updatedImageUrls;
      });
    };

    const renderSpinner = (index) => {
      return(
        (loadingStatus[index]) ? <div role="status">
          <svg aria-hidden="true" class="inline w-12 h-12 mx-10 my-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
         : null
      )
    }
  
    return(
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {images && images.map((image, index) => {
        return(
          <div>
            {renderSpinner(index)}
            <div key={image._id} >
              <img className="sm:max-h-64 max-w-full rounded-lg" src={image.url} alt={image.url} onClick={() => setActiveImage(image)} onLoad={() => handleImageLoad(index)}  onError={() => handleImageError(index)} />
            </div>
          </div>
        )
      })}
    </div>
    );
  }
  
  const ImagesTab = () => {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [images, setImages] = useState(null);
    const LIMIT = 8;
    const [loadingStatus, setLoadingStatus] = useState(Array(LIMIT).fill(true));
    const [activeImage, setActiveImage] = useState(null);
    const [activeAlert,setActiveAlert] = useState(null);
    
    useEffect(() => {
      async function loadImages() {
        try {
          setLoadingStatus(Array(LIMIT).fill(true));
          const response = await getUserImages(page, LIMIT);
          setImages(response.data.images);
          setHasMore(response.data.hasMore);
        } catch(e){ 
          console.error(e);
        }
      }

      loadImages();
    }, [page]);

    return(
      <div className="py-6 space-y-6 px-5 overflow-y-auto flex flex-col">
        {(!activeAlert) && <Modal activeImage={activeImage} setActiveImage={setActiveImage} setActiveAlert={setActiveAlert} /> || <Alert type={activeAlert.type} message={activeAlert.message} setActiveAlert={setActiveAlert}/>}
        <ImageGallery images={images} limit={LIMIT} loadingStatus={loadingStatus} setLoadingStatus={setLoadingStatus} setActiveImage={setActiveImage}/>
        <div class="inline-flex rounded-md shadow-sm self-center pt-6" role="group">
          <button onClick={() => {
            if(page<=1) return;
            setPage(page - 1);
          }} 
          type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
            Previous
          </button>
          <button disabled={true} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
            Page {page}
          </button>
          <button disabled={!hasMore} onClick={() => setPage(page + 1)} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
            Next
          </button>
        </div>
      </div>
    )
  }

  const GenerationTab = () => {
    return(
      <div className="py-6 space-y-6 px-5">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
           Tab Content
        </h2>
        <p className="text-gray-500 dark:text-gray-300">
          GENERATION sample content for the  tab.
        </p>
      </div>
    )
  }

  const UserProfileTab = () => {
    return(
      <div className="py-6 space-y-6 px-5">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
           User Profile
        </h2>
        <p className="text-gray-500 dark:text-gray-300">
          ID: <span className='text-gray-900'>{(user && user._id) && user._id || "Loading User..."}</span>
        </p>
        <p className="text-gray-500 dark:text-gray-300">
          Email: <span className='text-gray-800'>{(user && user.email) && user.email || "Loading User..."}</span>
        </p>
        <p className="text-gray-500 dark:text-gray-300">
          Verification Status: <span className='text-green-500'>{(user && user.isVerified) && (user.isVerified ? "Verified" : "Not Verified")}</span>
        </p>
      </div>
    )
  }

  const tabs = [
    { name: 'Images', icon: 'fa-image', component: <ImagesTab /> },
    // { name: 'Generation Tasks', icon: 'fa-tasks',  component: <GenerationTab /> },
    { name: 'Profile', icon: 'fa-user',  component: <UserProfileTab /> },
  ];


  return (
    <div className="flex flex-wrap min-w-full min-h-full">
      <div className="w-full">
        <Tab.Group
          as="div"
          onChange={setCurrentTab}
          className="scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100 shadow-lg rounded-lg overflow-auto bg-gray-50 dark:bg-gray-800 "
        >
          <Tab.List
            className="px-4 py-2 flex border-b border-gray-200 dark:border-gray-700"
          >
            {tabs.map((tab, tabIndex) => (
              <Tab
                key={tabIndex}
                className={({ selected }) =>
                  classNames(
                    'w-full py-2.5 px-4 text-sm font-medium text-left focus:outline-none',
                    selected
                      ? 'border-b-2 border-blue-500 dark:border-blue-300 text-blue-500'
                      : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  )
                }
              >
                {tab.name}
                <i className={'ml-2 fas ' + tab.icon}></i>
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="px-4 py-2 dark:bg-gray-800 bg-gray-50 h-full md:h-72">
            {tabs.map((tab, tabIndex) => (
              <Tab.Panel key={tabIndex}>
                {tab.component}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default Profile