import { createContext, useState } from "react";



export const DataContext = createContext()

const DataProvider = ({children}) => {
   const [totalPrice, setTotalPrice] = useState(0);
    /**** */

 //   const axiosSecure = useAxiosSecure()




    const data = {
      totalPrice,
      setTotalPrice,
    };

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;