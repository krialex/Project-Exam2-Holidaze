import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <ToastContainer 
        position="bottom-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={true} 
        closeOnClick 
        pauseOnHover
        draggable
        theme="colored"
        toastClassName="rounded-lg shadow-lg bg-white text-black px-4 py-2"
      /> 
    </>
  )
}

export default App
