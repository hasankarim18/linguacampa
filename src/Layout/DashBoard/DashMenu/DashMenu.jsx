import { Link } from "react-router-dom";
import useRole from "../../../Hooks/useRole";
// import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import AdminLeftMenu from "./AdminLeftMenu";
import InstructorLeftMenu from "./InstructorLeftMenu";
import StudentLeftMenu from "./StudentLeftMenu";


const DashMenu = () => {

  // const roles = ["super_admin", "admin", "instructors", "students"]
  const {user} = useAuth()
  const [role, isRoleLoading] = useRole();
    
    return (
      <div>
        {!isRoleLoading && (
          <ul className="h-full dash_menu capitalize text-white mt-4 text-xl ">
            {/* Sidebar content here */}
            <li className="text-yellow1">
              {user.displayName} <sub className="text-red-400">{role}</sub>{" "}
            </li>
            {/* admin menu */}
            {role === 'admin' && <AdminLeftMenu />}
            {/* instructor menu */}
            {role === 'instructor' && <InstructorLeftMenu />}
            {/* student menu */}
            {role === 'student' && <StudentLeftMenu />}
            {/* common for every one */}
            <li className="py-4">
              <hr />
            </li>

            <li>
              <Link to="/"> Home </Link>
            </li>
          </ul>
        )}
      </div>
    );
};

export default DashMenu;