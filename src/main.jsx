import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AuthProvider from './Provider/AuthProvider/AuthProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes.jsx'
import DarkModeProvider from './Provider/AuthProvider/DarkModeProvider'
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DataProvider from './Provider/DataProvider/DataProvider'
import "aos/dist/aos.css";


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Fragment>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <DataProvider>
          <DarkModeProvider>
            <AuthProvider>
              <RouterProvider router={router} />
            </AuthProvider>
          </DarkModeProvider>
        </DataProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.Fragment>
);
