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
import PrivateRoute from './components/auth_guards/private_route'
import PublicRoute from './components/auth_guards/authGuard'
function App() {
  return (
    <Routes>
      <Route element={<NavAndOutlet />}>
        <Route path='/' element={
          <PublicRoute>
            <LogInPage />
          </PublicRoute>
        }
        ></Route>
        <Route path='/sign-up' element={<PublicRoute>
          <RegisterPage />
        </PublicRoute>
        }
        ></Route>
        <Route path='/dashboard' element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
        ></Route>
        <Route path='/product' element={
          <PrivateRoute>
            <ProductPage />
          </PrivateRoute>
        }
        ></Route>
        <Route path='/add-product' element={
          <PrivateRoute>
            <AddProductPage />
          </PrivateRoute>
        }
        ></Route>
      </Route >
    </Routes >
  )
}

export default App
