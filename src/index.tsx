import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import HomePage from "./pages/HomePage"
import Layout from './components/Layout';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Shop, {loader as ShopLoader} from './pages/Shop';
import ItemDetail, { loader as ItemDetailLoader } from './pages/ItemDetail';
import { AuthContextProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import UploadItem from './pages/UploadItem';
import NotFound from './components/NotFound';

import "./index.css" 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<AuthContextProvider><Layout/></AuthContextProvider>} >
      <Route index element={<HomePage/>} />
      <Route path="contact" element={<Contact/>} />
      <Route path="login" element={<Login/>} />
      <Route path="register" element={<Register/>} />
      <Route path="shop" element={<ProtectedRoute><Shop/></ProtectedRoute>} loader={ShopLoader} />
      <Route path="shop/:id" element={<ItemDetail/>} loader={ItemDetailLoader} />
      <Route path="addItem" element={<ProtectedRoute><UploadItem/></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Route>
  
))

function App () {
  return (
    <RouterProvider router={router}/>
  )
}

root.render(
  <App/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
