import React from "react";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { AiOutlineGithub } from "react-icons/ai"
import { Link } from "react-router-dom";

import { DarkMode, NotificationBox } from "./index";

const Navbar = () => {
  const [ showNotification, setShowNotification ] = useState(false);

  return (
    <nav className="bg-black text-white sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-10">
      <div className="container mx-auto flex justify-between px-5 pt-3 pb-1 ">
        <div className="flex items-center">
          <Link to="/" className="text-2xl text-gray-white font-semibold">
            ImageIn
          </Link>
        </div>
        <div className="space-x-5 hidden container md:flex justify-end">
          <span className="text-gray-300 hover:text-white pt-2">
            <NotificationBox isOpen={showNotification} setIsOpen={setShowNotification} />
          </span>
          <a href="https://github.com/schatten007/imageIn" target="_blank" className="text-gray-300 hover:text-white pt-2">
            <AiOutlineGithub className="w-6 h-5" />
          </a>
          <DarkMode />
          <Link to="/generate" className="text-gray-300 hover:text-white text-sm pt-2">
            <p className="text-xs font-sans">New Artwork</p>
          </Link>
          <Link to="profile/123" className="text-gray-300 hover:text-white text-sm pt-2">
            <p className="text-xs font-sans">Account</p>
          </Link>
        </div>
        <button className="flex pace-x-4 container justify-end align-center md:hidden text-gray-300 hover:text-white">
            <Bars3Icon className="w-5 my-2"/>
        </button>
      </div>
    </nav>
  );
};


export default Navbar;