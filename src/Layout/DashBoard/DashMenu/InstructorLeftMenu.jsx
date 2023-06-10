import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";


const InstructorLeftMenu = () => {
    return (
      <>
        <li className="mt-4">
          <NavLink to="/dashboard/instructorHome">
            <FaHome /> Home
          </NavLink>
        </li>
        <li className="mt-4">
          <NavLink to="/dashboard/addClass">
            <FaHome /> Add a class
          </NavLink>
        </li>
        <li className="mt-4">
          <NavLink to="/dashboard/myClasses">
            <FaHome /> My Classes
          </NavLink>
        </li>
      </>
    );
};

export default InstructorLeftMenu;