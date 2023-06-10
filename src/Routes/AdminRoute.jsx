
import Swal from 'sweetalert2';
import useRole from '../Hooks/useRole';
import SimpleBackdrop from '../Utils/SimpleBackDrop';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const [role,isRoleLoading] = useRole()
   


   if (isRoleLoading) {
     return <h1 className="text-5xl">
        <SimpleBackdrop open={true} />
     </h1>;
   } else {
     if (role === 'admin') {
       return <>{children}</>;
     } else {
        Swal.fire({
            title:"You are not allowed here.",
            icon:"warning" 
        })
        .then(()=> {
             return <Navigate to="/" state={{ from: location }} />;
        })
        .catch(()=> {
             return <Navigate to="/" state={{ from: location }} />;
        })
        return <Navigate to="/" state={{ from: location }} />;
     }
   }
};

export default AdminRoute;