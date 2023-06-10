/* eslint-disable react/prop-types */
import { createContext, useEffect, useState} from "react";
import app from "../../../firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext()


const AuthProvider = ({children}) => {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);

 const auth = getAuth(app)

 const baseUrl = import.meta.env.VITE_baseUrl;
  //  console.log(auth)

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
  
    if (user) {        
      setUser(user);
      // get and set token 
      if(user){
         axios.post(`${baseUrl}/jwt`, { email: user.email })
         .then((res)=> {
          const token = res.data.token 
          localStorage.setItem("linguaCampa_access_token", token);
          setLoading(false);
      
         })
         .catch((error)=> {
          console.log(error);
         })
      }    
    } else {
        localStorage.removeItem("linguaCampa_access_token");        
    }
  });

  return () => {
      return  unsubscribe()
  }
}, [auth, baseUrl])



  /**  #create_user */
  const createUser = (email, password)=> {
    return createUserWithEmailAndPassword(auth, email,password)
  }

  /** login with email and password */
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  /** #update user */
    const updateUserProfile = (name, photourl) => {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photourl,
      });
    };

    /** #google sign in */

     const googleProvider = new GoogleAuthProvider();

     const googleSignIn = () => {
       return signInWithPopup(auth, googleProvider);
     };

     const logout = ()=> {       
       //  setLoading(true);
         return signOut(auth);
       
     }

 
    
    const userInfo = {
      user,
      auth,
      loading,
      createUser,
      updateUserProfile,
      googleSignIn,
      logout,
      loginUser,
    };


    
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;