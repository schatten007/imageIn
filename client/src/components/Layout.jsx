import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './index'

const Layout = () => {
  return (
    <div className='bg-gradient-to-br from-gray-700 via-gray-900 to-black'>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Layout;