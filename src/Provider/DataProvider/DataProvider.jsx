import axios from "axios";
import { createContext, useEffect, useState } from "react";



export const DataContext = createContext()

const DataProvider = ({children}) => {
   const [totalPrice, setTotalPrice] = useState(0);
   /** popular top 6 classes */
   const [popularClasses, setPopularClasses] = useState([])
   const [popularClasesLoading, setPopularClasesLoading] = useState(true)
   /** popular Instrucor */

   const [PopularInstructor, setPopularInstructor] = useState([])
   const [popularInstructorLoading, setPopularInstructorLoading] = useState(true)
   
    /**** */
const baseUrl = import.meta.env.VITE_baseUrl 
 

 useEffect(() => {
    axios
      .get(`${baseUrl}/popularClasses`)
      .then((res) => {
        if (res.data.message === "success") {
          setPopularClasses(res.data.data);
          setPopularClasesLoading(false);
        } else {
          setPopularClasesLoading(false);
        }
      })
      .catch(() => {
        setPopularClasesLoading(false);
      });

      axios
        .get(`${baseUrl}/popularInstructors`)
        .then((res) => {
          if (res.data.message === "success") {
            setPopularInstructor(res.data.data);
            setPopularInstructorLoading(false);
          } else {
              setPopularInstructorLoading(false);
          }
        })
        .catch(() => {
            setPopularInstructorLoading(false);
        });
 }, [baseUrl]);
 



    const data = {
      totalPrice,
      setTotalPrice,
      popularClasses,
      popularClasesLoading,
      PopularInstructor,
      popularInstructorLoading,
    };

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;