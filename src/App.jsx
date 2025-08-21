import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import { Layout } from './components/layout/layout';
import { Home } from './pages/Home/home';

function App() {

  return (
    <>
      <Layout />
      <Home />
    </>
  )
}

export default App
