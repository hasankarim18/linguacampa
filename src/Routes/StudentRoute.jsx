import Swal from "sweetalert2";
import useRole from "../Hooks/useRole";
import SimpleBackdrop from "../Utils/SimpleBackDrop";
import { Navigate } from "react-router-dom";

const StudentRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return (
      <h1 className="text-5xl">
        <SimpleBackdrop open={true} />
      </h1>
    );
  } else {
    if (role === "student") {
      return <>{children}</>;
    } else {
      Swal.fire({
        title: "You are not allowed here.",
        icon: "warning",
      })       
    return <Navigate to="/" state={{ from: location }} />; 
    }
  }
};

export default StudentRoute;
