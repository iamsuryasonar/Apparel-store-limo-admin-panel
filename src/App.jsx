import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route } from 'react-router'
import DashboardPage from './pages/dashboard/DashboardPage';
import NavAndOutlet from './components/NavAndOutlet'
import LogInPage from './pages/LogInPage'
import ProductPage from './pages/product/ProductPage'
import RegisterPage from './pages/RegisterPage'
import AddProductPage from './pages/product/AddProductPage'

function App() {
  return (
    <Routes>
      <Route element={<NavAndOutlet />}>
        <Route path='/' element={<LogInPage />}></Route>
        <Route path='/sign-up' element={<RegisterPage />}></Route>
        <Route path='/dashboard' element={<DashboardPage />}></Route>
        <Route path='/product' element={<ProductPage />}></Route>
        <Route path='/add-product' element={<AddProductPage />}></Route>
      </Route >
    </Routes >
  )
}

export default App
