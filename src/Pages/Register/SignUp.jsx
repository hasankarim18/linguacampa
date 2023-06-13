import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {Helmet} from 'react-helmet-async'
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import SimpleBackdrop from "../../Utils/SimpleBackDrop";
import SocialLogin from "./SocialLogin";
import PasswordStateDetails from "./PasswordStateDetails";

const SignUp = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState(null);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(false);
  const [backDrop, setBackDrop] = useState(false);
  const [isApplied, setIsApplied] = useState(false)
 
 

  const navigate = useNavigate();
  const [passwordStates, setPasswordStates] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    min: false,
    max: true,
  });
  const { createUser, updateUserProfile } = useAuth();
  const baseUrl = import.meta.env.VITE_baseUrl;

  

  /** do not touch */
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

  const confirmPasswordChangeHandler = (event) => {
    setconfirmPassword(event.target.value);
  };
  /** do not touch */

  const handleShowPassword = () => {
    setshowPassword((prev) => !prev);
  };

  const handleConfirmShowPassword = () => {
    setConfirmShowPassword((prev) => !prev);
  };

  /************** Back drop during sign up */

  const handleBackdropClose = () => {
    setBackDrop(false);
  };
  const handleBackdropOpen = () => {
    setBackDrop(true);
  };

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
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const photo = data.photo;
    const gender = data.gender;
    const phone = data.phone;
    const applied = data.applied;
    const userData = { name, email, password, photo, gender, phone, applied };
    handleBackdropOpen()
    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photo).then(() => {
          fetch(`${baseUrl}/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          })
            .then((res) => res.json())
            .then((data) => {
             
              if (data.insertedId) {
                 handleBackdropClose();
                 reset();
                Swal.fire({
                  title: "User Profile Successfully Created",
                }).then(() => {                 
                  navigate("/");
                });
              }
            })
            .catch(() => {
               handleBackdropClose();
            });
            // update to database
        })
        .then(()=> {
          handleBackdropClose()
        })
        .catch(()=> {
          handleBackdropClose()
        })
      })
      .catch((error) => {        
        console.log(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
       handleBackdropClose();
        Swal.fire({
          title: `User already exists in firebase`,
          icon: "error",
          position: "top-right",
        })
        .then(()=> {
           handleBackdropClose();
        })
        .catch(()=> {
           handleBackdropClose();
        })
      });
  };

  useEffect(() => {
    if(userName !== '' && userEmail !== '' && userPhoto !== ''){
      if (password === confirmPassword) {
        setSubmitDisable(true);
      } else {
        setSubmitDisable(false);
      }
    }else {
      setSubmitDisable(false)
    }
    
  }, [password, confirmPassword, userName, userEmail, userPhoto]);

  return (
    <div className="siteContainer p-2">
      <Helmet>
        <title> Sgin Up | Lingua Campa </title>
      </Helmet>

      <SimpleBackdrop open={backDrop} />
      <div className="w-full lg:w-1/2 mx-auto text-darkNavyBlue dark:text-white">
        <h3 className="text-3xl">
          *If you want to apply for Instructor plese sign up with email and
          password and check the apply for instructor button.
        </h3>
        <form
          className="text-darkNavyBlue dark:text-white "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="card-body p-0">
            {/* #name */}
            <div className="form-control">
              <label className="label text-xl text-darkNavyBlue dark:text-white">
                <span className="label-text text-xl text-darkNavyBlue dark:text-white">
                  Name*
                </span>
              </label>
              <input
                type="text"
                placeholder="Name"
                {...register("name", {
                  required: true,
                  onChange: (e) => {
                    setUserName(e.target.value);
                  },
                })}
                className="input text-darkNavyBlue dark:text-black input-bordered text-xl"
              />
            </div>
            {errors.name && (
              <div className="text-red-400">Name is required</div>
            )}
            {/* #email */}
            <div className="form-control text-darkNavyBlue dark:text-white ">
              <label className="label text-xl">
                <span className="label-text text-darkNavyBlue dark:text-white text-xl">
                  Email*
                </span>
              </label>
              <input
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                  onChange: (e) => {
                    setuserEmail(e.target.value);
                  },
                })}
                className="input text-darkNavyBlue dark:text-black input-bordered text-xl"
              />
            </div>
            <div className="py-1 text-red-400">
              {errors.email && "Email format not valid"}
            </div>

            {/* #photo url */}
            <div className="py-2">
              <label className="label text-xl">
                <span className="label-text dark:text-white  text-xl">
                  Photo Url*
                </span>
              </label>
              <input
                {...register("photo", {
                  required: true,
                  onChange: (e) => {
                    setUserPhoto(e.target.value);
                  },
                })}
                type="text"
                className="input dark:text-black input-bordered w-full"
                placeholder="Photo Url"
              />
            </div>
            {errors.photo && (
              <div className="text-red-400">Photo Url Required</div>
            )}
            {/* #gender */}
            <div className="py-2 text-darkNavyBlue dark:text-white flex gap-2">
              <span className="text-darkNavyBlue dark:text-white">Gender</span>
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
              <span className="text-darkNavyBlue dark:text-white">Phone</span>
              <input
                className="input dark:text-black input-bordered ms-2"
                type="text"
                {...register("phone")}
              />
            </div>
            {/* #apply */}
            <div className="py-2">
              <div>
                <span className="text-xl flex items-center wi-full  mb-1 ">
                  <span className="text-darkNavyBlue dark:text-white">
                    {" "}
                    Apply for instructor position
                  </span>
                  <input
                    {...register("applied", {
                      onChange: (e) => {
                        setIsApplied(e.target.checked);
                      },
                    })}
                    type="checkbox"
                    className="toggle ml-2 mr-2 toggle-warning"
                  />
                  {isApplied ? "Yes" : "No"}
                </span>
                <span> (default Student) </span>
              </div>
            </div>
            {/* #password */}
            <div className="form-control">
              <label className="label text-xl">
                <span className="label-text text-darkNavyBlue dark:text-white text-xl">
                  Password*
                </span>
              </label>
              <div className="relative">
                {/* #inputpassword */}
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="input dark:text-black input-bordered relative w-full text-xl"
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
                  className="absolute
                   text-darkNavyBlue dark:text-black
                   right-2 top-1/4 text-2xl cursor-pointer"
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
                <span className="label-text text-darkNavyBlue dark:text-white text-xl">
                  Confirm Password*
                </span>
              </label>
              <div className="relative">
                <input
                  onChange={confirmPasswordChangeHandler}
                  type={confirmShowPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="input dark:text-black input-bordered relative w-full text-xl"
                  {...register("confirm", {
                    onChange: (e) => {
                      confirmPasswordChangeHandler(e);
                    },
                  })}
                />
                <span
                  className="absolute
                   text-darkNavyBlue dark:text-black
                    right-2 top-1/4 text-2xl cursor-pointer"
                  onClick={handleConfirmShowPassword}
                >
                  {confirmShowPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {password !== confirmPassword && (
                <div className="py-2 text-red-400">Password did Not match</div>
              )}
              {/* <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
            </div>
            <div className="form-control mt-4 ">
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

            {/* password */}
          </div>
        </form>
        <div className="form-control">
          <SocialLogin> Sign Up With </SocialLogin>
        </div>
        <div className="py-2 text-xl">
          Already have an account?{" "}
          <Link to="/login" className="underline font-semibold text-blue-400">
            Login{" "}
          </Link>
        </div>
        <PasswordStateDetails passwordStates={passwordStates} />
      </div>
    </div>
  );
};

export default SignUp;
