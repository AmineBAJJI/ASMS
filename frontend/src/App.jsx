
import Home from './pages/Home'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
import Layout from './pages/Layout'
import Users from './pages/Users'
import User from './pages/User'
import CreateUser from './pages/CreateUser'
import Products from './pages/Products'
import Product from './pages/Product'
import CreateProduct from './pages/CreateProduct'
import CreateSession from './pages/CreateSession';
import {useSelector} from 'react-redux'
import {ToastContainer} from 'react-toastify';
import PrivateRoute from './components/PrivateRoute';
import 'react-toastify/dist/ReactToastify.css'


function App() {

  return (
    <BrowserRouter>
    <ToastContainer />
     <Routes>
      <Route path='/login' element={ <Login/>}/>
      <Route path='' element={<PrivateRoute/>}>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:userId" element={<User />} />
        <Route path="/newuser" element={<CreateUser />} />
        <Route path="/newsession" element={<CreateSession/>} />
        {/* <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/newproduct" element={<CreateProduct />} /> */}
      </Route>
      </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
