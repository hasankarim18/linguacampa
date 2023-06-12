import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import SimpleBackdrop from "../../../../Utils/SimpleBackDrop";

const MyEnrolledClass = () => {
    const {user, loading} = useAuth()
    const axiosSecure = useAxiosSecure()

     const { data, isLoading } = useQuery({
       queryKey: ["enrolledClasses"],
       enabled: !loading,
       queryFn: async () => {
         const response = await axiosSecure.get(
           `/enrolledClasses/${user.email}`
         );

         return response.data;
       },
     });

   //  console.log(data)

    return (
      <div>
        <SimpleBackdrop open={isLoading} />
        <div className="grid p-4 grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-3">
          {!isLoading &&
            data.data.map((item) => (
              <div key={item._id}>
                <div className="card bg-base-100 shadow-xl">
                  <figure>
                    <img
                      src={item.classImage}
                      alt="Shoes"
                      className="h-60"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                        {item.className}
                    </h2>
                    <p>
                        {item.instructorName}
                    </p>
                    {/* <div className="card-actions justify-end">
                      <button className="btn btn-primary">Buy Now</button>
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
};

export default MyEnrolledClass;