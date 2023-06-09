import { useContext } from "react";
import { DarkContext } from "../../../Provider/AuthProvider/DarkModeProvider";
import { Link, NavLink } from "react-router-dom";
import MobileNav from "./MobileNav";
import { FaBars } from "react-icons/fa";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";


const Navbar = () => {
    const {isDark} = useContext(DarkContext)
    const {user} = useContext(AuthContext)

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
      {user && (
        <li className="ml-2">
          <NavLink className="nav_item" to="/dashboard">
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );


    return (
      <div className="header_nav">
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
                    user
                  ) : (
                    <Link to="/login" className="btn-yellow1 relative rounded-lg py-2 px-4">
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