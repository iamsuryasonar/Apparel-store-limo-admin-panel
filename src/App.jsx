import { Routes, Route } from 'react-router'
import { useSelector } from "react-redux";
import DashboardPage from './pages/dashboard/DashboardPage';
import NavAndOutlet from './components/NavAndOutlet'
import LogInPage from './pages/auth/LogInPage'
import ProductsPage from './pages/product/ProductsPage'
import RegisterPage from './pages/auth/RegisterPage'
import AddProductPage from './pages/product/AddProductPage'
import CategoriesPage from './pages/category/CategoriesPage'
import PrivateRoute from './components/auth_guards/private_route'
import PublicRoute from './components/auth_guards/public_route'
import OrdersPage from './pages/order/OrdersPage'

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
          <Route path='/products' element={<ProductsPage />}></Route>
          <Route path='/add-product' element={<AddProductPage />}></Route>
          <Route path='/category' element={<CategoriesPage />}></Route>
          <Route path='/orders' element={<OrdersPage />}></Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
