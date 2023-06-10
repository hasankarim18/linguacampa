import  { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider/AuthProvider';

const PivateRoute = ({children}) => {

     const { user, loading } = useContext(AuthContext);
     const location = useLocation();

     if (loading) {
       return <h1 className="text-5xl">Loading.......</h1>;
     } else {
       if (user) {
         return <>{children}</>;
       } else {
         return <Navigate to="/login" state={{ from: location }} />;
       }
     }


  
};

export default PivateRoute;