import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Spinner from "../../../../Utils/Spinner";
import LazyLoad from "react-lazy-load";

const InstructorFeedback = () => {
  const { user, loading } = useAuth();

  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["instructorsFeedback"],
    enabled: !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/instructors/feedback/${user.email}`
      );

      return response.data;
    },
  });

 
  return (
    <div className="p-4">
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {data.data.map((item) => (
            <div
              key={item._id}
              className={`
               ${item.classInfo.status === "pending" && "bg-yellow1"}
                ${item.classInfo.status === "approved" && "bg-green-400"}
                 ${item.classInfo.status === "denied" && "bg-red-400"}
             my-4 border p-4 rounded-2xl bg-opacity-30`}
            >
              <div className="grid grid-cols-2 font-semibold">
                <div>
                    <strong>FeedBack: </strong>
                    {item.feedback}
                </div>
                <div className="flex flex-col items-end">
                  <div>Class id:{item.classId}</div>
                  <div>Class Name: {item.classInfo.className} </div>
                  <div className="flex gap-4 mt-2">
                    <div>
                      Status:{" "}
                      <span
                        className={`
                        ${item.classInfo.status === "pending" && "bg-yellow1"}
                         ${
                           item.classInfo.status === "approved" &&
                           "bg-green-400"
                         }
                        ${item.classInfo.status === "denied" && "bg-red-400"}
                        capitalize p-1 rounded-lg
                        `}
                      >
                        {" "}
                        {item.classInfo.status}{" "}
                      </span>
                    </div>
                    <div>
                      <LazyLoad>
                        <img
                          src={item.classInfo.classImage}
                          className="w-12"
                          alt=""
                        />
                      </LazyLoad>
                    </div>
                  </div>
                  <div className="flex gap-8 mt-2">
                    <span> Price: {item.classInfo.price}</span>
                    <span>Seats: {item.classInfo.seats}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      { !isLoading ? data.data.length === 0 && <h2 className="text-3xl">No feed back yet!</h2>: '' }
    </div>
  );
};

export default InstructorFeedback;
