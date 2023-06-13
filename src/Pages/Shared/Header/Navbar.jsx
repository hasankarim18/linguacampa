import { useContext } from "react";
import { DarkContext } from "../../../Provider/AuthProvider/DarkModeProvider";
import { Link, NavLink,  useNavigate } from "react-router-dom";
import MobileNav from "./MobileNav";
import { FaBars } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";


const Navbar = () => {
    const {isDark} = useContext(DarkContext)
    const {user, logout } = useAuth()
    const [role, isRoleLoading] = useRole()
    const navigate = useNavigate()   

    const handleLogout = () => {   
      console.log('logout fire', user);
      logout()
        .then(() => {
          // Sign-out successful.
          console.log('logout success fulll');
         
          Swal.fire({
            title:"Successfully Logout",
            icon:'success'
          })
           navigate("/");
        })
        .catch(() => {
          // An error happened.
          console.log('l failed')


        });
    };
  

  const navList = (
    <>
      <li className="ml-2">
        <NavLink className="nav_item" to="/">
          Home
        </NavLink>
      </li>
      <li className="ml-2">
        <NavLink className="nav_item" to="/instructors">
          Insturctors
        </NavLink>
      </li>
      <li className="ml-2">
        <NavLink className="nav_item" to="/classes">
          Classes
        </NavLink>
      </li>
      {user && !isRoleLoading ?
        <li className="ml-2">
          <NavLink className="nav_item" to={`/dashboard/${role}Home`}>
            Dashboard
          </NavLink>
        </li>
        :''
      }
    </>
  );


    return (
      <div className="header_nav relative z-50">
        <div className="siteContainer flex items-center justify-between ">
          <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
              {/* Navbar */}
              <div className="w-full navbar relative ">
                <div className="flex-none lg:hidden">
                  <label
                    htmlFor="my-drawer-3"
                    className="cursor-pointer
                    mt-2
                      hover:text-yellow1 
                     transition-all 
                     duration-500
                      text-2xl"
                  >
                    <FaBars />
                  </label>
                </div>
                <div className="flex-1 ">
                  <Link to="/">
                    {" "}
                    <img
                      className="w-32 lg:-ml-1 ml-4"
                      src={`${isDark ? "/4.png" : "/3.png"}`}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="flex-none relative z-10 hidden lg:block">
                  <ul className="menu menu-horizontal">
                    {/* Navbar menu content here */}
                    {navList}
                  </ul>
                </div>
                {/* use info */}
                <div className="relative z-1">
                  {user ? (
                    <>
                      <div className="dropdown dropdown-bottom dropdown-end">
                        <label tabIndex={0} 
                         className="inline-flex cursor-pointer items-center justify-center bg-white dark:bg-transparent hover:bg-white border-0 m-1">                         
                          <img src={user?.photoURL} className="w-14 h-14 rounded-full border-2 p-1" alt="" />
                          <FaAngleDown className="text-darkNavyBlue dark:text-white" />
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content  p-2 shadow bg-base-100 rounded-box w-52"
                        >                         
                          <li className="w-full">
                            <button
                              onClick={handleLogout}
                              className="btn-yellow1 relative w-full rounded-lg py-2 px-4"
                            >
                              Logout
                            </button>{" "}
                          </li>
                        </ul>
                      </div>
                      {/* <span>{user?.displayName}</span>{" "}
                      <button
                        onClick={handleLogout}
                        className="btn-yellow1 relative rounded-lg py-2 px-4"
                      >
                        Logout
                      </button> */}
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="btn-yellow1 relative rounded-lg py-2 px-4"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <MobileNav navList={navList} />
          </div>
          {/* drawer ends */}
        </div>
      </div>
    );
};

export default Navbar;