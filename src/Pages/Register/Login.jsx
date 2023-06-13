import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "./SocialLogin";
import PasswordStateDetails from "./PasswordStateDetails";
import Swal from "sweetalert2";

const Login = () => {
    const [showPassword, setshowPassword] = useState(false)
    const [disable, setDisable] = useState(false)
    const [passwordStates, setPasswordStates] = useState({
        uppercase: false,
        lowercase: false,
        number:false,
        special:false,
        min:false,
        max:true
    })
    const { loginUser } = useAuth();
    const navigate = useNavigate()
    const location = useLocation()
    let from = location.state?.from?.pathname || "/";

    const passwordChangeHandler = (event) => {
        
      const value = event.target.value; 
         if (/[a-z]/.test(value)) {
           setPasswordStates((prevState) => ({
             ...prevState,
             lowercase: true,
           }));
         }else {
            setPasswordStates((prevState) => ({
              ...prevState,
              lowercase: false,
            }));
         }

         if(/[A-Z]/.test(value)){
            setPasswordStates((prev)=> {
                return {
                    ...prev,
                    uppercase:true
                }
            })
         }else {
             setPasswordStates((prev) => {
               return {
                 ...prev,
                 uppercase: false,
               };
             });
         }

         if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
            setPasswordStates((prev)=> {
                return {
                    ...prev, 
                    special:true 
                }
            })
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

     const {
       register,
       handleSubmit,
       formState: { errors },
     } = useForm();
     const onSubmit = (data) => {
      setDisable(true)
       
        loginUser(data.email, data.password)
        .then(()=> {
        //  setLoading(false)
        setDisable(false)
          navigate(from);
        })
        .catch((error)=> {
          Swal.fire({
            title:`Error Login ${error.message}`
          })
         // console.log(error);
          setDisable(false)
        })
     };
   


  return (
    <div className="siteContainer p-2 text-darkNavyBlue dark:text-darkNavyBlue">
      <div className="w-full lg:w-1/2 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body p-0">
            <div className="form-control">
              <label className="label text-xl">
                <span className="label-text">Email</span>
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
            <div className="form-control">
              <label className="label text-xl">
                <span className="label-text text-xl">Password</span>
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
                  className="absolute  text-darkNavyBlue dark:text-black right-2 top-1/4 text-2xl cursor-pointer"
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
            <div className="form-control">
              <button
                className="btn-yellow1 block relative cursor-pointer rounded-lg py-2 px-4"
                type="submit"
                value="Login"
                disabled={disable}
              >
                {" "}
                Login{" "}
              </button>
            </div>
          </div>
        </form>
        <div className="form-control">
          <SocialLogin> Login With </SocialLogin>
        </div>
        <div className="py-2 text-xl">
          Already have an account?{" "}
          <Link to="/signup" className="underline font-semibold text-blue-400">
            SignUp
          </Link>
        </div>
        <PasswordStateDetails passwordStates={passwordStates} />
      </div>
    </div>
  );
};

export default Login;
