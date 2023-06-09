import { Link, NavLink } from "react-router-dom";
import useRole from "../../../Hooks/useRole";
import { useEffect, useState } from "react";


const DashMenu = () => {

  // const roles = ["super_admin", "admin", "instructors", "students"]

   const role = useRole();
    const [showHomeLink, setShowHomeLink] = useState({
      route: 'userHome',
      text:'user home'
    })

    useEffect(() => {
      if(role === 'super_admin' || role === 'admin'){
          setShowHomeLink({
            router: "adminHome",
            text:'admin home'
          });
      }else if (role === "instructor") {
        setShowHomeLink({
          router: "instructorHome",
          text: "instructor home",
        });
      } else if (role === "student") {
        setShowHomeLink({
          router: "studentHome",
          text: "student home",
        });
      }
    }, [role])
    
    return (
      <div>
        <ul className="h-full dash_menu capitalize text-white mt-4 text-xl ">
          {/* Sidebar content here */}
          <li>
            <NavLink to={`${showHomeLink.router}`}>
              {showHomeLink.text} <sub className="text-red-400">{role}</sub>{" "}
            </NavLink>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
          {/* common for every one */}
          <li className="py-4">
            <hr />
          </li>

          <li>
            <Link to="/"> Home </Link>
          </li>
        </ul>
      </div>
    );
};

export default DashMenu;