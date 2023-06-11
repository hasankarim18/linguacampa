import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import SimpleBackdrop from "../../Utils/SimpleBackDrop";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const Classes = () => {
    const [allClasses, setAllClasses] = useState([])
    const [allClassesLoading, setAllClassesLoading] = useState(false)
    const [role] = useRole()   
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const baseUrl = import.meta.env.VITE_baseUrl
    useEffect(() => {
        setAllClassesLoading(true)
      axios.get(`${baseUrl}/allClasses`)
      .then((res)=> {
        
        if(res.data.message){
            setAllClasses(res.data.data)
             setAllClassesLoading(false);
        }else {
             setAllClassesLoading(false);
        }
   
      })
      .catch(error => {
         setAllClassesLoading(false);
        console.log(error);
      })
    }, [baseUrl])

    /*** Handle class select */

    const handleSelect = (classId, studenEmail)=> {
        if(!user){            
            Swal.fire({
                title:"Please Login To Select Class",
                icon: 'warning'
            })
        }else {          
            const body = {classId, studenEmail}
            axiosSecure
              .post("/selectClass", body)
              .then(() => {
               
              })
              .catch((error) => {
                console.log(error);
              });
        }
    }

    
    return (
      <div className="siteContainer">
        <SimpleBackdrop open={allClassesLoading} />
        <h2 className="text-3xl my-8 text-center">
          Explore Our Diverse Range of Enriching Courses
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid">
          {!allClassesLoading &&
            allClasses.map((item) => {
               
                return (
                  <div key={item._id}>
                    <div className={`
                    ${item?.availableSeats=== 0 && 'bg-red-400 bg-opacity-30'}
                    card bg-base-100 shadow-2xl dark:text-black text-black `}>
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
                        <div className="mt-2 flex justify-between">
                          <span>Seats: {item.seats}</span>
                          <span>Availavle Seat: {item?.availableSeats}</span>
                        </div>

                        <div className="card-actions justify-end">
                        
                        
                            <button 
                              onClick={()=> {handleSelect(item._id, user?.email )}}
                              disabled={item?.availableSeats === 0 || role === 'admin' || role === 'instructor'}
                              className="btn-yellow1 p-2 rounded-2xl"
                            >
                              Select Class
                            </button>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                );})}
        </div>
      </div>
    );
};

export default Classes;