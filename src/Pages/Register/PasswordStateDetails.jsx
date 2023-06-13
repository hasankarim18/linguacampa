
import { FaRegCheckSquare } from 'react-icons/fa';

const PasswordStateDetails = ({ passwordStates }) => {
  return (
    <div className="text-darkNavyBlue  dark:text-white" >
      <div className="py-2">
        <ul className="">
          <li className="flex gap-2 items-center">
            * {passwordStates.uppercase && <FaRegCheckSquare />}
            Password must contain at least one uppercase letter
          </li>
          <li className="flex gap-2 items-center">
            * {passwordStates.lowercase && <FaRegCheckSquare />}
            Password must contain at least one lowercase letter{" "}
          </li>
          <li className="flex gap-2 items-center">
            * {passwordStates.number && <FaRegCheckSquare />}
            Password must contain at least one number{" "}
          </li>
          <li className="flex gap-2 items-center">
            *{passwordStates.special && <FaRegCheckSquare />}
            Password must contain at least one special charecter{" "}
          </li>
          <li className="flex gap-2 items-center">
            *{passwordStates.min && <FaRegCheckSquare />}
            Password must be 6 charecter long{" "}
          </li>
          <li className="flex gap-2 items-center">
            *{passwordStates.max && <FaRegCheckSquare />}
            Password must be less than 20 charecter{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PasswordStateDetails;