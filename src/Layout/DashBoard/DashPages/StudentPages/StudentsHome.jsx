import useAuth from "../../../../Hooks/useAuth";


const StudentsHome = () => {
    const {user} = useAuth()
    return (
      <div className="p-8">
        <h2 className="text-3xl">
          Name: <span className="font-bold"> {user.displayName} </span>
        </h2>
      </div>
    );
};

export default StudentsHome;