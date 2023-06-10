import { useContext } from "react";
import { DataContext } from "../Provider/DataProvider/DataProvider";


const useDataProvider = () => {
    const data = useContext(DataContext)
    
    return data;
};

export default useDataProvider;