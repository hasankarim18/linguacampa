import { FaAward, FaCheck, FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";


const StudentLeftMenu = () => {
    return (
      <>
        <li className="mt-4">
          <NavLink to="/dashboard/studentHome">
            <FaHome /> Home
          </NavLink>
        </li>
        <li className="mt-4">
          <NavLink to="/dashboard/mySelectedClass">
            <FaCheck /> My Selected Class
          </NavLink>
        </li>
        <li className="mt-4">
          <NavLink to="/dashboard/myEnrolledClass">
            <FaAward /> My Enrolled Class
          </NavLink>
        </li>
      </>
    );
};

export default StudentLeftMenu;