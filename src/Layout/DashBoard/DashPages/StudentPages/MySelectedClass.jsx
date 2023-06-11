import LazyLoad from "react-lazy-load";
import useMySelectedClass from "../../../../Hooks/useMySelectedClass";
import Spinner from "../../../../Utils/Spinner";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import SimpleBackdrop from "../../../../Utils/SimpleBackDrop";

const MySelectedClass = () => {
    const [data, isLoading, refetch] = useMySelectedClass();
    const [deleteLoading, setDeleteLoading] = useState(false)
    const axiosSecure = useAxiosSecure()
    const baseurl = import.meta.env.VITE_baseUrl 
    const {user} = useAuth()
   

    const handleSelectedDelete = (classId)=> {
        setDeleteLoading(true)
        axiosSecure
          .delete(
            `${baseurl}/deleteSelectedClass?classId=${classId}&email=${user.email}`
          )
          .then((res) => {
            if (res.data.data.deletedCount > 0){               
               refetch()
               setDeleteLoading(false);  
               Swal.fire({
                 title: "Selected Class Removed",
               })           
                  
            }else {
                  setDeleteLoading(false);
            }
          })
          .catch((error) => {
              setDeleteLoading(false);
            console.log(error);
          });
    }

    return (
      <div className="p-4">
        <SimpleBackdrop open={deleteLoading} />
        <SimpleBackdrop open={isLoading} />
        <h3 className="text-3xl text-center my-8">My Selected Class</h3>
        <div>
          {isLoading && <Spinner />}
          <div className="overflow-x-auto">
            {!isLoading && (
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Class Name</th>
                    <th>Instructor Name</th>
                    <th>Image </th>
                    <th>Price</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {data.data.map((item, i) => {
                    return (
                      <tr key={item._id}>
                        <th>{i}</th>
                        <td>{item.className}</td>
                        <td>{item.instructorName}</td>
                        <td>
                          <LazyLoad>
                            <img
                              src={item.classImage}
                              className="w-12"
                              alt=""
                            />
                          </LazyLoad>
                        </td>
                        <td>${item.price}/-</td>
                        <td>
                          <button
                            onClick={() => {
                              handleSelectedDelete(item._id);
                            }}
                            className="btn btn-error btn-xs"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {/* row 2 */}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
};

export default MySelectedClass;