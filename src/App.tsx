import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import { Layout } from './components/layout/layout';
import { Home } from './pages/Home/home';
import { Venues } from './pages/Venues/venues';


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="venues/:id" element={<Venues />} />
      
      </Route>
    </Routes>  
    </>
  )
}

export default App
