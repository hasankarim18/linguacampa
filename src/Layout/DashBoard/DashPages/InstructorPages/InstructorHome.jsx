import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import SimpleBackdrop from "../../../../Utils/SimpleBackDrop";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";



const InstructorHome = () => {
  const [openEdit, setOpenEdit] = useState(false)
  const [updating, setUpdating] = useState(false)

     const { user, loading, updateUserProfile } = useAuth();

     const axiosSecure = useAxiosSecure();

     const { data, isLoading, refetch } = useQuery({
       queryKey: ["instructorHome"],
       enabled: !loading,
       queryFn: async () => {
         const response = await axiosSecure.get(
           `/instructorHome/${user.email}`
         );
       //  console.log(data);
         return response.data;
       },
     });

     const handleEdit = (event)=> {
      event.preventDefault()
      setUpdating(true)
      const form = event.target 
      const name = form.name.value 
      const photo = form.photo.value 
      const phone = form.phone.value  
      const body = {name, photo, phone}
      axiosSecure
        .patch(`/updateInsturctor/${user.email}`, body)
        .then((res) => {
          if (res.data.data.modifiedCount>0){
            updateUserProfile(name, photo)
            .then(()=> {
              refetch();
              setUpdating(false);
            })
            .catch(()=> {              
               setUpdating(false);
            })
           
          } else {
            setUpdating(false);
          }
        })
        .catch(()=> {
          setUpdating(false);
        })
     }

 
    return (
      <div className="p-4">
        <SimpleBackdrop open={isLoading} />
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <div>
                <div>
                  <h2 className="text-2xl flex gap-4">
                    <span>Name: {data?.data?.name}</span>
                    <img
                      src={data?.data?.photo}
                      alt=""
                      className="w-20 rounded-2xl"
                    />
                  </h2>
                </div>
                <div className="mt-2 capitalize text-xl">
                  Role : {data?.data?.role}
                </div>
                <div className="mt-2">Phone: {data?.data?.phone}</div>
                <div className="mt-2">Gender: {data?.data?.gender}</div>
                <div className="mt-2">Email: {data?.data?.email}</div>
                <div className="mt-2"></div>
              </div>
            </div>
            <div>
              <div>
                <button
                  onClick={() => {
                    setOpenEdit((prev) => !prev);
                  }}
                  className="text-3xl text-green-400"
                >
                  <FaEdit />
                </button>
              </div>

              {openEdit && (
                <div className="mt-4">
                  <form onSubmit={handleEdit}>
                    <div className="form-group mb-4 flex flex-col justify-start">
                      <label>Name</label>
                      <input
                        type="text"
                        defaultValue={data?.data?.name}
                        className="input input-bordered"
                        name="name"
                      />
                    </div>
                    <div className="form-group mb-4 flex flex-col justify-start">
                      <label>Photo url</label>
                      <input
                        type="text"
                        defaultValue={data?.data?.photo}
                        className="input input-bordered"
                        name="photo"
                      />
                    </div>
                    <div className="form-group mb-4 flex flex-col justify-start">
                      <label>Phone</label>
                      <input
                        type="text"
                        defaultValue={data?.data?.phone}
                        className="input input-bordered"
                        name="phone"
                      />
                    </div>
                    <div className="text-end">
                      <button
                        disabled={updating}
                        type="submit"
                        className="btn-green1"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
};

export default InstructorHome;