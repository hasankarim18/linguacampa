import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import { useContext } from "react";
import { FaFacebook, FaInstagram, FaMoon, FaShareAlt, FaSun, FaTwitter } from "react-icons/fa";
import { DarkContext } from "../../../Provider/AuthProvider/DarkModeProvider";

const TopNav = () => {
    const { isDark, setIsDark } = useContext(DarkContext);

 const darkModeHandler = (event) => {
 //       console.log(event.target.checked)
        if(event.target.checked){
            setIsDark(true);
        }else {
            setIsDark(false)
        }
 };


  return (
    <div
      className={`bg-darkNavyBlue py-2 ${
        isDark && "border-b-slate-300 border-b-2"
      }`}
    >
      <div className=" flex justify-between md:flex-row flex-col items-center text-white siteContainer">
        <div className="flex items-center gap-4">
          <AccessAlarmsIcon sx={{ color: "#FEE100" }} />
          <span> Class Time: 7 am to 11 am </span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <ul className="uppercase flex items-center justify-center gap-2">
            <li className="flex items-center gap-1">
              {" "}
              <FaShareAlt /> social media:{" "}
            </li>
            <li>
              <a className="hover:text-yellow1 text-xl" href="https://facebook.com">
                <FaFacebook />
              </a>
            </li>
            <li>
              <a className="hover:text-yellow1 text-xl" href="https://facebook.com">
                <FaTwitter />
              </a>
            </li>
            <li>
              <a className="hover:text-yellow1 text-xl" href="https://facebook.com">
                <FaInstagram />
              </a>
            </li>
          </ul>
          <div className="flex items-center justify-center gap-1">
            <span>
              <FaSun className={`${!isDark && "text-yellow1"}`} />
            </span>
            <input
              onChange={darkModeHandler}
              type="checkbox"
              className="toggle toggle-md"
            />
            <span>
              <FaMoon className={`${isDark && "text-yellow1"}`} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
