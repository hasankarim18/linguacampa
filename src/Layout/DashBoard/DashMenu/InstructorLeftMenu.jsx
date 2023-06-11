import { FaClipboardList, FaHome, FaInbox, FaSchool } from "react-icons/fa";
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
            <FaSchool /> Add a class
          </NavLink>
        </li>
        <li className="mt-4">
          <NavLink to="/dashboard/myClasses">
            <FaClipboardList /> My Classes
          </NavLink>
        </li>
        <li className="mt-4">
          <NavLink to="/dashboard/instructorFeedback">
            <FaInbox /> Feedback
          </NavLink>
        </li>
      </>
    );
};

export default InstructorLeftMenu;