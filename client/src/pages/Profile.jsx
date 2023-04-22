import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { populate } from '../app/slices/user';
import { Tab } from '@headlessui/react';
import Avatar from '../components/Avatar';


const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(populate())
  }, [dispatch])
  
  return (
    <>
    <div className="min-h-screen space-y-8 flex flex-col align-center mx-8 sm:mx-16 lg:mx-32 py-6 sm:py-8 lg:py-12">
      <div className="min-w-full">
        <Avatar />
      </div>

      <div className="min-w-full">
        <h1 className="font-bold text-[32px] text-white dark:text-gray-200">Welcome {(user && user.username) && user.username || "Username"}</h1>
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
  
  const ImagesTab = () => {
    return(
      <div className="py-6 space-y-6 px-5">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
           Tab Content
        </h2>
        <p className="text-gray-500 dark:text-gray-300">
          IMAGES sample content for the  tab.
        </p>
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
    { name: 'Generation Tasks', icon: 'fa-tasks',  component: <GenerationTab /> },
    { name: 'Profile', icon: 'fa-user',  component: <UserProfileTab /> },
  ];


  return (
    <div className="flex flex-wrap min-w-full min-h-full">
      <div className="w-full">
        <Tab.Group
          as="div"
          onChange={setCurrentTab}
          className="shadow-lg rounded-lg overflow-hidden"
        >
          <Tab.List
            className="bg-gray-50 dark:bg-gray-800 px-4 py-2 flex border-b border-gray-200 dark:border-gray-700"
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
          <Tab.Panels className="px-4 py-2 dark:bg-gray-800 bg-gray-50 h-32 md:h-72">
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