import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaRegCheckSquare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {Helmet} from 'react-helmet-async'
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const SignUp = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState(null)
  const [confirmShowPassword, setConfirmShowPassword] = useState(false)
  const [submitDisable, setSubmitDisable] = useState(false)
  const navigate = useNavigate()
  const [passwordStates, setPasswordStates] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    min: false,
    max: true,
  });
  const { createUser, updateUserProfile } = useAuth();
  const baseUrl = import.meta.env.VITE_baseUrl



  const passwordChangeHandler = (event) => {  
    const value = event.target.value;
      setPassword(value);
    if (/[a-z]/.test(value)) {
      setPasswordStates((prevState) => ({
        ...prevState,
        lowercase: true,
      }));
    } else {
      setPasswordStates((prevState) => ({
        ...prevState,
        lowercase: false,
      }));
    }

    if (/[A-Z]/.test(value)) {
      setPasswordStates((prev) => {
        return {
          ...prev,
          uppercase: true,
        };
      });
    } else {
      setPasswordStates((prev) => {
        return {
          ...prev,
          uppercase: false,
        };
      });
    }

    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
      setPasswordStates((prev) => {
        return {
          ...prev,
          special: true,
        };
      });
    } else {
      setPasswordStates((prev) => {
        return {
          ...prev,
          special: false,
        };
      });
    }

    if (/\d/.test(value)) {
      setPasswordStates((prev) => {
        return {
          ...prev,
          number: true,
        };
      });
    } else {
      setPasswordStates((prev) => {
        return {
          ...prev,
          number: false,
        };
      });
    }
    //   length
    if (value.length > 5) {
      setPasswordStates((prev) => {
        return {
          ...prev,
          min: true,
        };
      });
    } else {
      setPasswordStates((prev) => {
        return {
          ...prev,
          min: false,
        };
      });
    }
    //   length maz
    if (value.length > 20) {
      setPasswordStates((prev) => {
        return {
          ...prev,
          max: false,
        };
      });
    } else {
      setPasswordStates((prev) => {
        return {
          ...prev,
          max: true,
        };
      });
    }
  };

  const handleShowPassword = () => {
    setshowPassword((prev) => !prev);
  };

  const handleConfirmShowPassword = () => {
    setConfirmShowPassword((prev) => !prev);
  };

 const confirmPasswordChangeHandler = (event)=> {
    setconfirmPassword(event.target.value);   
 }

 /**
  * ************create user email password ******************
  */
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const name = data.name 
    const email = data.email 
    const password = data.password
    const photo = data.photo 
    const gender = data.gender 
    const phone = data.phone 
    const role = data.role 
    const userData = { name, email, password, photo, gender, phone, role };
   
    createUser(email, password)
    .then((res)=> {
      const newUser = res.user;
      const newEmail = newUser.email
      const newName  = newUser.displayname 

      updateUserProfile(newName, photo)
      .then(()=> {       
    
         fetch(`${baseUrl}/users`, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(userData),
         })
           .then((res) => res.json())
           .then((data) => {
            console.log(data);
             if (data.insertedId) {
               Swal.fire({
                 title: "User Profile Successfully Created",
               }).then(() => {
                 reset();
                 navigate("/");
               });
             }
           });
      })      
     
    })
    .catch((error)=> {
      console.log(error);
     // const errorCode = error.code;
     // const errorMessage = error.message;
     Swal.fire({
       title: `User already exists in firebase`,
       icon: "error",
       position: "top-right",
     });
    })
  };

  useEffect(() => {
    if (password === confirmPassword) {
      setSubmitDisable(true);
    } else {
      setSubmitDisable(false);
    }
  }, [password, confirmPassword]);
  

  return (
    <div className="siteContainer p-2">
      <Helmet>
        <title> Sgin Up | Lingua Campa </title>
      </Helmet>
      <div className="w-full lg:w-1/2 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body">
            {/* #name */}
            <div className="form-control">
              <label className="label text-xl">
                <span className="label-text">Name*</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                {...register("name", {
                  required: true,
                })}
                className="input input-bordered text-xl"
              />
            </div>
            {errors.name && <div className="text-red-400">Name is required</div>}
            {/* #email */}
            <div className="form-control">
              <label className="label text-xl">
                <span className="label-text">Email*</span>
              </label>
              <input
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                className="input input-bordered text-xl"
              />
            </div>
            <div className="py-1 text-red-400">
              {errors.email && "Email not valid"}
            </div>
            {/* #password */}
            <div className="form-control">
              <label className="label text-xl">
                <span className="label-text text-xl">Password*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered relative w-full text-xl"
                  {...register("password", {
                    onChange: (e) => {
                      passwordChangeHandler(e);
                    },
                    required: true,
                    maxLength: 20,
                    minLength: 6,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
                  })}
                />
                <span
                  className="absolute right-2 top-1/4 text-2xl cursor-pointer"
                  onClick={handleShowPassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <div className="py-2 text-red-400">Password Not strong</div>
              )}
              <label className="label">
                {/* <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a> */}
              </label>
            </div>
            {/* #confirmPassword */}
            <div className="form-control">
              <label className="label text-xl">
                <span className="label-text text-xl">Confirm Password*</span>
              </label>
              <div className="relative">
                <input
                  onChange={confirmPasswordChangeHandler}
                  type={confirmShowPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="input input-bordered relative w-full text-xl"
                  {...register("confirm", {
                    onChange: (e) => {
                      confirmPasswordChangeHandler(e);
                    },
                  })}
                />
                <span
                  className="absolute right-2 top-1/4 text-2xl cursor-pointer"
                  onClick={handleConfirmShowPassword}
                >
                  {confirmShowPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {!submitDisable && (
                <div className="py-2 text-red-400">Password did Not match</div>
              )}
              {/* <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
            </div>
            {/* #photo url */}
            <div className="py-2">
              <label className="label text-xl">
                <span className="label-text text-xl">Photo Url</span>
              </label>
              <input
                {...register("photo")}
                type="text"
                className="input input-bordered w-full"
                placeholder="Photo Url"
              />
            </div>
            {/* #gender */}
            <div className="py-2  flex gap-2">
              <span>Gender</span>
              <input
                id="male"
                {...register("gender")}
                value="male"
                type="radio"
              />
              <label htmlFor="male">Male</label>
              <input
                id="female"
                {...register("gender")}
                value="female"
                type="radio"
              />
              <label htmlFor="female">Female</label>
              <input
                id="other"
                {...register("gender")}
                value="other"
                type="radio"
              />
              <label htmlFor="other">Other</label>
            </div>
            {/* #phone */}
            <div className="py-2">
              <span>Phone</span>
              <input
                className="input input-bordered ms-2"
                type="text"
                {...register("phone")}
              />
            </div>
            {/* #role */}
            <div className="py-2">
              <div>
                <span className="text-xl mb-1 inline-block">Sign Is As</span>
                <span> (default Student) </span>
              </div>
              <select
                defaultValue="student"
                className="select  select-bordered w-full "
                {...register("role")}
              >
                <option className="text-xl" value="student" key="1">
                  Student
                </option>
                <option className="text-xl" value="insturctor" key="2">
                  Instructor
                </option>
              </select>
            </div>
            <div className="form-control">
              <button
                disabled={!submitDisable}
                className="btn-yellow1 block relative cursor-pointer rounded-lg py-2 px-4"
                type="submit"
                value="Login"
              >
                SignUp
              </button>
            </div>
            {/* sign up link */}
            <div className="py-3 text-xl">
              Already have an account?{" "}
              <Link
                to="/login"
                className="underline font-semibold text-blue-400"
              >
                Login{" "}
              </Link>
            </div>
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
        </form>
      </div>
    </div>
  );
};

export default SignUp;
