/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useDataProvider from "../../../../Hooks/useDataProvider";
import useAuth from "../../../../Hooks/useAuth";
import { useEffect, useState } from "react";
import SimpleBackdrop from "../../../../Utils/SimpleBackDrop";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [allUsers, setallUsers] = useState([])
  const [backdrop, setBackdrop] = useState(false)
  const { loading } = useAuth();


  const {  isLoading, refetch } = useQuery({
    queryKey: ["users"],
    enabled: !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(`/users`);
      setallUsers(response.data?.data)
      return response.data;
    },
  });

 // console.log(data);

  const handleRoleChange = (email, role) => {
     setBackdrop(true)
      axiosSecure
        .patch(`/users?email=${email}&role=${role}`)
        .then((res) => {
          setBackdrop(false);
          if (res.data.message === "success") {
            Swal.fire({
              title: `Role changed successful`,
              icon: "success",
            });
            refetch()
          }

          if(res.data.message === 'error'){
            Swal.fire({
              title: `Update Failed`,
              icon: "error",
            });
          }
          
        })
        .catch((error) => {
          setBackdrop(false);
          Swal.fire({
            title: `Update Failed ${error}`,
            icon: "error",
          });
          console.log(error);
        });
  };

  return (
    <div>
      <SimpleBackdrop open={backdrop} />
      <h2 className="text-3xl my-4 text-center">Manage All Users</h2>
      <p className="text-red-600 p-4 ">
        Note: Change to admin role can be done only from student role. Once anyone is approved as instructor he/she can't become admin. A new account with role as student can only be changed to admin role.
      </p> 
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Skill</th>
              <th>Role</th>
              <th>Applied to become <br/> Instructor</th>
              <th>Make Instructor</th>
              <th>Make Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {!isLoading &&
              allUsers.map((user, i) => {
                return (
                  <tr key={i}>
                    <th>
                      <label>{i + 1}</label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={user?.photo}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user?.name}</div>
                          <div className="text-sm opacity-50">
                            Email:{" "}
                            <span className="text-black font-semibold">
                              {user?.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* #skill */}
                    <td>
                        {user?.skill}
                    </td>
                    {/* #role */}
                    <td>
                      <span
                        className={`py-2
                         ${user?.role === "admin" && "badge badge-secondary"}
                         ${user?.role === "instructor" && "badge badge-accent"}
                         ${user?.role === "student" && "badge badge-neutral"}
                          px-4 capitalize font-bold`}
                      >
                        {user?.role}
                      </span>
                    </td>
                    <td>
                      {user?.applied ? (
                        <span className="btn btn-xs btn-success">
                          Applied
                        </span>
                      ) : (
                        <span className=" p-2 rounded-lg font-semibold w-full inline-block text-center">
                          Not  <br/> Applied
                        </span>
                      )}
                    </td>
                    <th>
                      <button 
                        disabled={user?.role === 'instructor'}
                        onClick={()=> {handleRoleChange(user?.email, "instructor")}}
                        className="btn btn-accent font-bold btn-xs"
                      >
                        Make Instructor
                      </button>
                    </th>
                    <th>
                      <button 
                       disabled={user?.role === 'admin' || user?.role ===  'instructor'} 
                       onClick={()=> {handleRoleChange(user?.email, 'admin')}}
                       className="btn btn-secondary font-bold btn-xs">
                        Make Admin
                      </button>
                    </th>
                    <td>
                        <button className="btn btn-error btn-xs">Delete</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
