import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";
import SimpleBackdrop from "../Utils/SimpleBackDrop";
// import SimpleBackdrop from "../Utils/SimpleBackDrop";

const RegisterRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  // const [ open, setOpen] = useState(false)
  const location = useLocation();

  if (loading) {
    return <SimpleBackdrop open={true} />
  }else {
    if (!user) {
      return <>{children}</>;
    } else {
      return <Navigate to="/" state={{ from: location }} />;
    }
  }
  
};

export default RegisterRoute;
