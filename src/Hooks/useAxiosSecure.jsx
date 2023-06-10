import axios from "axios";
import {  useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import useAuth from "./useAuth";

 const baseurl = import.meta.env.VITE_baseUrl;

 const axiosSecure = axios.create({
   baseURL: baseurl,
 });


const useAxiosSecure = () => {

   //  const { logout } = useAuth()
     const navigate = useNavigate();

      useEffect(() => {
        // intercept before the request send
        axiosSecure.interceptors.request.use((config) => {
          const token = localStorage.getItem("linguaCampa_access_token");

          if (token) {
            config.headers.authorization = `bearer ${token}`;
          }
          return config;
        });

        /// receiving the response
        axiosSecure.interceptors.response.use(
          function (response) {
            return response;
          },
          function (error) {
            if (
              (error.response && error.response.status === 401) ||
              error.response.status === 403
            ) {
            //  logout();
             // navigate("/");
            }
            return Promise.reject({ error, data: [] });
          }
        );
      }, [ navigate]);
 
  return axiosSecure;
};

export default useAxiosSecure;
