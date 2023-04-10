import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Layout } from './components'
import { ErrorPage, Home, ImageGeneration, Signup, Profile } from './pages'


const App = () => {
  return (
      <>
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={ <Layout /> }>
            <Route index element={<Home />} />
            <Route path='signup' element={<Signup />} />
            <Route path='profile/:id' element={<Profile />} />
            <Route path='generate' element={<ImageGeneration />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </>
  )
}

export default App