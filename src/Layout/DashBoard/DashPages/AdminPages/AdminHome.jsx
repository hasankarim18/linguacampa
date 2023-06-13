import useAuth from "../../../../Hooks/useAuth";


const AdminHome = () => {
    const {user} = useAuth()
    return (
        <div className="p-8" >
            <h1 className="text-5xl">{user.displayName}</h1>
            <p className="text-xl">{user.email}</p>
        </div>
    );
};

export default AdminHome;