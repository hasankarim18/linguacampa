/* eslint-disable react/prop-types */
import { createContext } from "react";
import app from "../../../firebase.config";
import { getAuth } from "firebase/auth";

export const AuthContext = createContext()


const AuthProvider = ({children}) => {

    const auth = getAuth(app)
    console.log(auth)

 
    const user = 'hasan'

    const userInfo = {
        user
    }
    
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;