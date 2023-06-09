/* eslint-disable react/prop-types */
import { createContext, useEffect, useState} from "react";
import app from "../../../firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithPopup, updateProfile } from "firebase/auth";

export const AuthContext = createContext()


const AuthProvider = ({children}) => {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);

    const auth = getAuth(app)
  //  console.log(auth)

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //  setLoading(false);
        setUser(user);
        setLoading(false)
        // get and set token
        
      } else {
        // User is signed out
        // ...
      //  localStorage.removeItem("flavor_fiesta_access_token");
      }
      
    });

    return () => {
      return unsubscribe();
    };
  }, [auth]);

  /**  #create_user */
  const createUser = (email, password)=> {
    return createUserWithEmailAndPassword(auth, email,password)
  }

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

 
    
    const userInfo = {
      user,
      auth,
      loading,
      createUser,
      updateUserProfile,
      googleSignIn,
    };


    
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;