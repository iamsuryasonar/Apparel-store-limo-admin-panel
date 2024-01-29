import { useState, useMemo } from 'react'
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
import CategoryPage from './pages/CategoryPage'
import PrivateRoute from './components/auth_guards/private_route'
import PublicRoute from './components/auth_guards/public_route'
import { useSelector } from "react-redux";
import OrdersPage from './pages/OrdersPage'

function App() {

  const userData = useSelector((state) => state.auth?.userData);

  return (
    <Routes>
      <Route element={<NavAndOutlet />}>
        <Route element={<PublicRoute userData={userData} />}>
          <Route path='/' element={<LogInPage />}></Route>
          <Route path='/sign-up' element={<RegisterPage />}></Route>
        </Route>

        <Route element={<PrivateRoute userData={userData} />}>
          <Route path='/dashboard' element={<DashboardPage />}></Route>
          <Route path='/products' element={<ProductPage />}></Route>
          <Route path='/add-product' element={<AddProductPage />}></Route>
          <Route path='/category' element={<CategoryPage />}></Route>
          <Route path='/orders' element={<OrdersPage />}></Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
