import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route } from 'react-router'
import DashboardPage from './pages/dashboard/DashboardPage';
import NavAndOutlet from './components/NavAndOutlet'
import LogInPage from './pages/LogInPage'
import ProductPage from './pages/product/ProductPage'

function App() {
  return (
    <Routes>
      <Route element={<NavAndOutlet />}>
        <Route path='/' element={<LogInPage />}></Route>
        <Route path='/dashboard' element={<DashboardPage />}></Route>
        <Route path='/product' element={<ProductPage />}></Route>
      </Route >
    </Routes >
  )
}

export default App
