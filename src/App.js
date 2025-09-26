
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WebRouter, AdminRouter } from './router';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas admin */}
        <Route path="/admin/*" element={
          <AuthProvider>
            <AdminRouter />
          </AuthProvider>
        } />

        {/* Rutas web */}
        <Route path="/*" element={<WebRouter />} />
      </Routes>

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
  );
}
