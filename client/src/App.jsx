import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Layout, ProtectedRoute } from './components'
import { ErrorPage, Home, ImageGeneration, Register, Profile, Login } from './pages'


const App = () => {
  return (
      <>
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={ <Layout /> }>
            <Route index element={<Home />} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route path='profile' element={<ProtectedRoute children={<Profile />} />} />
            <Route path='generate' element={<ProtectedRoute children={<ImageGeneration />} />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </>
  )
}

export default App