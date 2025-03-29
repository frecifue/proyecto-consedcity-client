import React from 'react'
import {BrowserRouter} from "react-router-dom"
import {WebRouter, AdminRouter} from "./router"
import { AuthProvider } from './contexts/AuthContext'
// import { ToastContainer } from 'react-toastify'

export default function App() {
  return (
    <BrowserRouter>
      <WebRouter></WebRouter>
      <AuthProvider>
        <AdminRouter></AdminRouter>
      </AuthProvider>
      
      {/* Aquí se coloca el ToastContainer para que esté disponible en toda la app */}
      {/* <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}


    </BrowserRouter>
  )
}



