import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Tab } from '@headlessui/react';
import Avatar from '../components/Avatar';
import { getUserImages } from "../app/services/image.service";

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

  const ImageGallery = ({ images, loadingStatus, setLoadingStatus }) => {
    const handleImageLoad = (index) => {
      console.log(index, loadingStatus[index])
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
              <img className="sm:max-h-64 max-w-full rounded-lg" src={image.url} alt={image.url} onLoad={() => handleImageLoad(index)}  onError={() => handleImageError(index)} />
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
        <ImageGallery images={images} limit={LIMIT} loadingStatus={loadingStatus} setLoadingStatus={setLoadingStatus}/>
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
          className="shadow-lg rounded-lg overflow-auto bg-gray-50 dark:bg-gray-800 "
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