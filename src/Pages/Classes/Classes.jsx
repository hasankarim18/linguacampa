import axios from "axios";
import { useState } from "react";
import SimpleBackdrop from "../../Utils/SimpleBackDrop";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";


const Classes = () => {
    const [classSelectLoading, setClassSelectLoading] = useState(false)
    const [role] = useRole()   
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const baseUrl = import.meta.env.VITE_baseUrl
    

    const {data, isLoading } = useQuery({
      queryKey: ["allClasses"],    
      queryFn: async () => {
        const response = await axios.get(`${baseUrl}/allClasses`)

         return response.data.data
      },
    });
  
   

    const handleSelect = (classId, studenEmail)=> {
      setClassSelectLoading(true)
        if(!user){      
           setClassSelectLoading(false);      
            Swal.fire({
                title:"Please Login To Select Class",
                icon: 'warning'
            })
        }else {          
            const body = {classId, studenEmail}
            axiosSecure
              .post("/selectClass", body)
              .then((res) => {               
                if(res.data.message === "success"){
                   setClassSelectLoading(false);  
                   Swal.fire({
                    title:"Selected",
                    icon:'success'
                   })
                }else if(res.data.message === 'already_selected'){
                   setClassSelectLoading(false);  
                    Swal.fire({
                      title: "Already Selected",
                      icon: "error",
                    });
                }else if(res.data.message === 'already_enrolled')              {
                  setClassSelectLoading(false);
                  Swal.fire({
                    title: "Already Enrolled",
                    icon: "error",
                  });
                }else {
                   setClassSelectLoading(false);
                }
              })
              .catch((error) => {
                setClassSelectLoading(false);  
                console.log(error);
              });
        }
    }

  

    
    return (
      <div className="siteContainer">
        <Helmet>
          <title>Classes | LinguaCampa</title>
        </Helmet>
        <SimpleBackdrop open={isLoading} />
        <SimpleBackdrop open={classSelectLoading} />
        <h2 className="text-3xl my-8 text-center">
          Explore Our Diverse Range of Enriching Courses
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid">
          {!isLoading &&
            data.map((item) => {
              const seatLeft = parseInt(
                (item.seats - item.enrolledStudents).toFixed(0)
              );
              return (
                <div key={item._id}>
                  <div
                    className={`
                    ${item?.availableSeats === 0 && "bg-red-400 bg-opacity-30"}
                    card bg-base-100 shadow-2xl dark:text-black text-black `}
                  >
                    <figure>
                      <img
                        className="w-full h-60"
                        src={item.classImage}
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title text-black dark:text-black">
                        {item.className}
                      </h2>
                      <div>
                        <span className="bg-red-400 p-1 rounded-2xl text-white">
                          Price: ${item.price}/-
                        </span>
                      </div>
                      <p className="flex justify-between">
                        <span className="font-semibold">
                          Instructor Name: {item.instructorName}
                        </span>
                      </p>
                      <div className="mt-2 flex flex-col text-xl font-semibold justify-between">
                        <div className="flex justify-between">
                          <span className="">Seats: {item.seats}</span>
                          <span className="">Seats Left: {seatLeft} </span>
                        </div>
                        <div>Enrolled Students: {item?.enrolledStudents}</div>
                      </div>

                      <div className="card-actions justify-end">
                        <button
                          onClick={() => {
                            handleSelect(item._id, user?.email);
                          }}
                          disabled={
                            item?.availableSeats === 0 ||
                            role === "admin" ||
                            role === "instructor" ||
                            seatLeft === 0
                          }
                          className="btn-yellow1 p-2 rounded-2xl"
                        >
                          {seatLeft === 0 ? "No Seat Left" : " Select Class"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
};

export default Classes;