import { Helmet } from "react-helmet-async";
import useAuth from "../../../../Hooks/useAuth";


const StudentsHome = () => {
    const {user} = useAuth()
    return (
      <div className="p-8">
        <Helmet> 
          <title>Admin Home | LinguaCampa</title>
        </Helmet>
        <h2 className="text-3xl">
          Name: <span className="font-bold"> {user.displayName} </span>
        </h2>
        <p className="text-xl">Email: {user.email} </p>
      </div>
    );
};

export default StudentsHome;