import useAuth from "../../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SimpleBackdrop from "../../../../Utils/SimpleBackDrop";
import { useState } from "react";

const AddClass = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth();
  const [openDrop, setOpenDrop] = useState(false)
    
   const {
     register,
     reset,
     handleSubmit,
     formState: { errors },
   } = useForm();

   const onSubmit = (data) => {
    setOpenDrop(true)
      const className = data.className
      const classImage = data.classImage
      const instructorName = user.displayName
      const instructorEmail = user.email
      const seats = parseInt(data.seats)      
      const price = parseFloat(parseFloat(data.price).toFixed(2));
      console.log(typeof price, price);
      const newClass = {
        className,
        classImage,
        instructorName,
        instructorEmail,
        seats,
        price
      }
     
      axiosSecure.post("/classes", newClass)
      .then(res => {     
       if(res.data.data.insertedId){
        Swal.fire({
          title:"Class Added Successfully, Waiting for admins approval.",  
          icon:"success"   
        })
        reset()
        setOpenDrop(false)
       }else {
         setOpenDrop(false);
       }
      })
      .catch(err => {
         setOpenDrop(false);
        console.log(err);
      })      
   };

    return (
      <div>
        <SimpleBackdrop open={openDrop} />
        <h2 className="text-3xl text-center my-8">Add Your Class</h2>
        <div className="p-4 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control mt-4">
              <label className="font-semibold text-xl">Class Name*</label>
              <input
                {...register("className", {
                  required: true,
                })}
                placeholder="Class Name"
                type="text"
                className="input input-bordered"
              />
            </div>
            {errors.className && <p className="text-red-400">*required</p>}
            <div className="form-control mt-4">
              <label className="font-semibold text-xl">Class Image*</label>
              <input
                {...register("classImage", {
                  required: true,
                })}
                placeholder="Class image"
                type="text"
                className="input input-bordered"
              />
            </div>
            {errors.classImage && <p className="text-red-400">*required</p>}
            <div className="form-control mt-4">
              <label className="font-semibold text-xl">Instructor Name</label>
              <input
                readOnly
                defaultValue={user?.displayName}
                placeholder="Instructor Name"
                type="text"
                className="input input-bordered read-only:bg-gray-300 "
              />
            </div>
            <div className="form-control mt-4">
              <label className="font-semibold text-xl">Instructor Email</label>
              <input
                readOnly
                defaultValue={user?.email}
                placeholder="Instructor Email"
                type="text"
                className="input input-bordered read-only:bg-gray-300"
              />
            </div>
            <div className="mt-4 form-control">
              <label className="text-xl font-semibold">Available Seats*</label>
              <input
                {...register("seats", {
                  required: true,
                })}
                defaultValue={`${50}`}
                type="number"
                className="input input-bordered"
              />
            </div>
            {errors.seats && <p className="text-red-400">*required</p>}
            <div className="mt-4 form-control">
              <label className="text-xl font-semibold">Price</label>
              <input
                {...register("price", {
                  required: true,
                })}
                defaultValue={`${150}`}
                type="number"
                className="input input-bordered"
              />
            </div>
            {errors.price && <p className="text-red-400">*required</p>}
            <div className="mt-4 form-control">
              <button className="btn-green1 rounded-lg ">Add Class</button>
            </div>
          </form>
          <p className="mt-2 text-xl">* required</p>
        </div>
      </div>
    );
};

export default AddClass;