import { createContext, useState } from "react";



export const DataContext = createContext()

const DataProvider = ({children}) => {
    // data for admin route and all users
    const [allUsers, setAllUsers] = useState([])
    const [allUserLoading, setAllUserLoading] = useState(true)
    /**** */

 //   const axiosSecure = useAxiosSecure()




    const data = {
        // allUsers for admin
        allUsers,
        allUserLoading,
        setAllUsers,
        setAllUserLoading
        //**** */
    }

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;