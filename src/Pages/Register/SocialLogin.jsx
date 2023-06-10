import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SocialLogin = ({children}) => {
  const navigate = useNavigate()
 const baseUrl = import.meta.env.VITE_baseUrl;
   let from = location.state?.from?.pathname || "/";
 // const userData = { name, email, password, photo, gender, phone, applied };

  const {googleSignIn} = useAuth()

  const handleGoogleSignIn = ()=> {


     

      googleSignIn().then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
        
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          const name = user.displayName 
          const email = user.email 
          const photo = user.photoURL 
          const userData = {name, email, photo}
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
                  Swal.fire({
                    title: "User Profile Successfully Created",
                  }).then(() => {
                    navigate(from);
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
        console.log(error);
          // ...
        });
        }

 // const userData = { name, email, password, photo, gender, phone, applied };


  return (
    <button
      onClick={handleGoogleSignIn}
      className="py-2 flex items-center rounded-lg justify-center mt-4 btn-green1"
    >
      {children} <FaGoogle className="ml-2 text-2xl" />
    </button>
  );
};

export default SocialLogin;
