import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Spinner from "../../../../Utils/Spinner";


const MyClasses = () => {
    const {user, loading} = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data, isLoading } = useQuery({
      queryKey: ["myClasses"],
      enabled: !loading,
      queryFn: async () => {
        const response = await axiosSecure.get(`/classes/${user.email}`);
       
        return response.data;
      },
    });

 


    return (
      <div>
        <div className="p-2 sm:p-4 md:p-8 ">
          {isLoading ? (
            <Spinner />
          ) : (            
             <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 justify-center mx-auto lg:grid-cols-2 xl:grid-cols-3 ">
                    {!isLoading && 
                        data.data.map((item)=> {return (
                          <div key={item._id}>
                            <div
                              className={`
                             ${item.status === "pending" && "bg-yellow1"}
                             ${item.status === "approved" && "bg-green-400"}
                             ${item.status === "denied" && "bg-red-400"}
                            card capitalize bg-opacity-25 border p-2 relative`}
                            >
                              <figure>
                                <img
                                  className="h-52 rounded-xl "
                                  src={item?.classImage}
                                  alt={item.className}
                                />
                              </figure>
                              <div className="card-body">                                
                                <h2 className="card-title capitalize">
                                  {item.className}
                                </h2>
                                <div className="text-xl font-semibold">
                                  Price: ${item.price}
                                </div>
                                <div className="card-actions justify-end">
                                  <button className="btn-green1 rounded-lg">
                                    View Details
                                  </button>
                                </div>
                              </div>
                              <div className="absolute right-2 top-2">
                                <span
                                  className={`
                                ${item.status === "pending" && "bg-yellow1"}
                                ${item.status === "approved" && "bg-green-400"}
                                ${item.status === "denied" && "bg-red-400"}
                                badge p-4 font-semibold border-0`}
                                >
                                  {item.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        );})
                    }
                </div>            
          )}
        </div>
      </div>
    );
};

export default MyClasses;