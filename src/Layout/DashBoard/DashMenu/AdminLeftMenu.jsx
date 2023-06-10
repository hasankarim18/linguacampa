import { NavLink } from "react-router-dom";
import { FaBookOpen, FaHome, FaUser, FaUsers } from "react-icons/fa";

const AdminLeftMenu = () => {
    return (
      <>
        <li className="mt-4">
          <NavLink to="/dashboard/adminHome"> <FaHome /> Home </NavLink>
        </li>
        <li className="mt-4">
          <NavLink to="/dashboard/manageClasses"><FaBookOpen /> Manage Classes </NavLink>
        </li>
        <li className="mt-4">
          <NavLink to="/dashboard/manageUsers"><FaUsers /> Manage Users </NavLink>
        </li>
        <li className="mt-4">
          <NavLink to="/dashboard/adminProfile"><FaUser /> Admin Profile </NavLink>
        </li>
      </>
    );
};

export default AdminLeftMenu;