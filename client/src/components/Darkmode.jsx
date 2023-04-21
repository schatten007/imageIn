import React, { useEffect } from "react";
import { Switch } from '@headlessui/react'
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkmode } from "../app/slices/darkmode";

const DarkMode = () => {
  // const [enabled, setEnabled] = useState(false);
  const dispatch = useDispatch();
  const enabled = useSelector((state) => state.darkmode)

  useEffect(()=>{ 
    if(enabled) 
    document.documentElement.classList.add("dark");
  },[dispatch])

  const handleSwitchToggle = () => {
    // setEnabled(!enabled);
    // localStorage.setItem('darkmode', JSON.stringify(!enabled));
    dispatch(toggleDarkmode());
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex w-24 space-x-2 pt-2">
        <Switch
            checked={enabled}
            onChange={handleSwitchToggle}
            className={`${
                enabled ? 'bg-blue-600' : 'bg-gray-400'
            } relative inline-flex h-5 w-10 items-center rounded-full self-start `}
            >
            <span className="sr-only">Enable notifications</span>
            <span
                className={`${
                enabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-3 w-3 transform rounded-full bg-white transition`}
            />
        </Switch>
        {(enabled) ? <MoonIcon className="w-5 pb-1" /> : <SunIcon className="w-6 self-start" />}
    </div>
  );
};

export default DarkMode;