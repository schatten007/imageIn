import React, {useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './index'
import { useDispatch } from 'react-redux';
import { populate } from '../app/slices/user';

const Layout = () => {
  const dark = 'dark:bg-gradient-to-r dark:from-gray-700 dark:via-gray-900 dark:to-black';
  const light = 'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400';

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(populate())
  }, [dispatch])


  return (
    <div className={`${light} ${dark}`}>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Layout;