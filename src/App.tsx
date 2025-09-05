import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import { Layout } from './components/layout/layout';
import { Home } from './pages/Home/home';
import { Venues } from './pages/Venues/venues';
import { Profile } from './pages/Profile/Profile'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="venues/:id" element={<Venues />} />
      
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>  
    </>
  )
}

export default App
