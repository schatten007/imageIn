import { BellIcon } from "@heroicons/react/24/outline";
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { notificationlogo } from '../assets/index'

const NotificationBox = () => {
  return (
    <div className="relative w-full max-w-sm">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center`}
            >
              <span><BellIcon className="w-5"/></span>
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-52 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white text-black  ">
                  <div className="w-full flex items-center justify-center font-bold p-3">
                    <h3 className="font-sans text-lg">Notifications</h3>
                  </div>
                  <div className="w-full px-8 pb-3 flex flex-col items-center scale-75">
                    <img src={notificationlogo} alt="No New Notifications" className="px-6 pt-12 pb-2" width='300' height='300'/>
                    <h6 className="text-gray-600 text-[18px] pt-8">Nothing to show</h6>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}



export default NotificationBox;