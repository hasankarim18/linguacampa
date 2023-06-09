import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AuthProvider from './Provider/AuthProvider/AuthProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes.jsx'
import DarkModeProvider from './Provider/AuthProvider/DarkModeProvider'
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Fragment>
    <HelmetProvider>
      <DarkModeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </DarkModeProvider>
    </HelmetProvider>
  </React.Fragment>
);
