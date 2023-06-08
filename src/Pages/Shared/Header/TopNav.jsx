import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { DarkContext } from "../../../Provider/AuthProvider/DarkModeProvider";

const TopNav = () => {
    const { isDark, setIsDark } = useContext(DarkContext);

    console.log(isDark)

 const darkModeHandler = (event) => {
 //       console.log(event.target.checked)
        if(!event.target.checked){
            setIsDark(true);
        }else {
            setIsDark(false)
        }
 };


  return (
    <div className="bg-darkNavyBlue py-2">
      <div className=" flex justify-between md:flex-row flex-col items-center text-white siteContainer">
        <div className="flex items-center gap-4">
          <AccessAlarmsIcon sx={{ color: "#FEE100" }} />
          <span> Class Time: 7 am to 11 am </span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <ul>
            <li>social media icon</li>
          </ul>
          <div className="flex items-center justify-center gap-1" >
            <span>
                <FaSun />
            </span>
            <input onChange={darkModeHandler} type="checkbox" className="toggle toggle-md" />
            <span>
                <FaMoon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
