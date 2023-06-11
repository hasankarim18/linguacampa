import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Spinner from "../../../../Utils/Spinner";
import { useState } from "react";
import SimpleBackdrop from "../../../../Utils/SimpleBackDrop";
import BasicModal from "../../../../Utils/BasicModal";
import Swal from "sweetalert2";
import LazyLoad from "react-lazy-load";


const ManageClasses = () => {

     const { user, loading } = useAuth();
     const axiosSecure = useAxiosSecure();
     const [statusLoading, setstatusLoading] = useState(false)
     const [modalOpen, setModalOpen] = useState(false)
     const [feedBackClassId, setFeedBackClassId] = useState('')
     const [feedBackInstructorEmail, setFeedBackInstructorEmail] = useState('')
     const [feedbackLoading, setFeedbackLoading] = useState(false)

     const { data, isLoading, refetch:myClassesRefetch } = useQuery({
       queryKey: ["myClasses"],
       enabled: !loading,
       queryFn: async () => {
         const response = await axiosSecure.get(`/allclasses/${user.email}`);
         return response.data;
       },
     });

    const handleClassStatus = (classId, status)=> {
       setstatusLoading(true)
        axiosSecure.post(`/classes/status`, {
            classId,
            status
        })
        .then(res => {
            console.log(res)
            if(res.data.message === 'success'){
                setstatusLoading(false);
                   myClassesRefetch();
            }
          setstatusLoading(false);
        })
        .catch(error => {
            setstatusLoading(false);
            console.log(error);
        })      
    }

    const feedBackModalOpen = (classId, instructorEmail)=> {
      
        setFeedBackClassId(classId)
        setFeedBackInstructorEmail(instructorEmail)
        setModalOpen(true)
    }
    const feedBackModalClose = ()=> {
        setModalOpen(false)
    }

    const handleFeedBack = (event)=> {
        event.preventDefault()
        const form = event.target 
        const feedback = form.feedback.value
        const feedbackInfo = {classId:feedBackClassId, instructorEmail: feedBackInstructorEmail, feedback}
        setFeedbackLoading(true)     
       axiosSecure
         .post(`/instructor/feedback`, feedbackInfo)
         .then((res) => {          
           if (res.data.message === "success") {      
              setFeedbackLoading(false); 
               setModalOpen(false);    
              Swal.fire({
                title:"Feedback send successfully", 
                position:'top-right',
                timer:3000, 
                icon:"success"
              })      
             myClassesRefetch();
           }else{
            Swal.fire({
              title: "Feedback send successfully",
              position: "top-right",
              timer: 5000,
              icon: "error",
            }); 
              setFeedbackLoading(false); 
           }                         
         })
         .catch((error) => { 
              setFeedbackLoading(false);              
           console.log(error);
         });   
    }

    return (
      <div className=" p-2 sm:p-2 md:p-2 mb-8 text-center">
        <SimpleBackdrop open={statusLoading} />
        <h2 className="text-3xl">Manage All Classes</h2>
        <div className="mt-4">
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="overflow-x-auto">
              <table className="table manage_classes text-center table-xs">
                <thead>
                  <tr className="font-bold">
                    <th>Class Id</th>
                    <th>Class Name</th>
                    <th>Class Image</th>
                    <th>Instructor</th>
                    <th>Seats / Price</th>
                    <th>Available Seats</th>
                    <th>Status</th>
                    <th>Actions</th>
                    <th>Send Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading &&
                    data.data.map((item, i) => {
                      return (
                        <tr
                          className={`${
                            i % 2 === 0 && "bg-red-200 bg-opacity-30"
                          } font-semibold`}
                          key={item._id}
                        >
                          <th>{i + 1}</th>
                          <td>{item.className}</td>
                          <td>
                            <LazyLoad height={48}>
                              <img
                                className="w-12 h-12 mx-auto rounded-lg"
                                src={item.classImage}
                                alt=""
                              />
                            </LazyLoad>
                          </td>
                          <td>
                            <div>{item.instructorName}</div>
                            <div className="mt-2">{item.instructorEmail}</div>
                          </td>
                          <td>{item.seats}</td>
                          <td>{item?.availabeSeats || item.seats}</td>
                          <td>
                            <div
                              className={`
                             ${item.status === "pending" && "bg-yellow1"}
                             ${item.status === "approved" && "bg-green-400"}
                             ${item.status === "denied" && "bg-red-400"}
                             rounded-lg p-1 capitalize`}
                            >
                              {item.status}
                            </div>
                          </td>
                          <td>
                            <div className="flex gap-1 items-center justify-center">
                              <button
                                disabled={
                                  item.status === "approved" ||
                                  item.status === "denied"
                                }
                                onClick={() => {
                                  handleClassStatus(item._id, "approved");
                                }}
                                className="btn-green1 p-1"
                              >
                                Approve
                              </button>
                              <button
                                disabled={
                                  item.status === "approved" ||
                                  item.status === "denied"
                                }
                                onClick={() => {
                                  handleClassStatus(item._id, "denied");
                                }}
                                className="btn-red1 p-1"
                              >
                                Deny
                              </button>
                            </div>
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                feedBackModalOpen(
                                  item._id,
                                  item.instructorEmail
                                );
                              }}
                              className="btn btn-xs"
                            >
                              FeedBack
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <BasicModal open={modalOpen} handleClose={feedBackModalClose}>
          <div>
            <form onSubmit={handleFeedBack}>
              <textarea
                className="input input-bordered w-full mb-4 p-2 block"
                name="feedback"
              />
              <div>
                <button 
                 disabled={feedbackLoading}
                 className="btn-green1 w-full">Send Feedback</button>
              </div>
            </form>
          </div>
          <div className="text-right">
            <button
              onClick={feedBackModalClose}
              className=" mt-4 wi-full btn-red1"
            >
              Close
            </button>
          </div>
        </BasicModal>
      </div>
    );
};

export default ManageClasses;