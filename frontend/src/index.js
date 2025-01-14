import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import Home from './page/Home';
import Menu from './page/Menu';
import About from './page/About';
import Contact from './page/Contact';
import Login from './page/Login';
import Newproduct from './page/Newproduct';
import Ordercard from './page/Ordercard';
import Signup from './page/Signup';
import {store} from './redux/index';
import {Provider} from "react-redux";
import Cart from "./page/Cart";
import Success from "./page/Success";
import Cancel from "./page/Cancel";
import Deleteproduct from './page/Deleteproduct';
import Updateproduct from './page/Updateproduct';
import ProductList from './page/ProductList';
import Search from './page/Search';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
        <Route index element={<Home/>}/>
        {/* <Route path="menu" element={<Menu />} /> */}
      <Route path="menu/:filterby" element={<Menu />} />
        <Route path='about' element={<About/>}/>
        <Route path='contact' element={<Contact/>}/>
        <Route path='newproduct' element={<Newproduct/>}/>
        <Route path='updateproduct' element={<Updateproduct/>}/>
        <Route path='ordercart' element={<Ordercard />} />
      <Route path="productlist/:filterby" element={<ProductList/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path="cart" element={<Cart />} />
        <Route path="success" element={<Success/>}/>
      <Route path="cancel" element={<Cancel/>}/>
      <Route path='deleteproduct' element={<Deleteproduct/>}/>
      <Route path="/search" element={<Search />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
<RouterProvider router={router}/>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
