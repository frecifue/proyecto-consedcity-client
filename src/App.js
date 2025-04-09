import React from 'react'
import {BrowserRouter} from "react-router-dom"
import {WebRouter, AdminRouter} from "./router"
import { AuthProvider } from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
// import { ToastContainer } from 'react-toastify'

export default function App() {
  return (
    <BrowserRouter>
      <WebRouter></WebRouter>
      <AuthProvider>
        <AdminRouter></AdminRouter>
      </AuthProvider>
      
       <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> 

    </BrowserRouter>
  )
}


