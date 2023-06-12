import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import SimpleBackdrop from "../../../../Utils/SimpleBackDrop";


const InstructorHome = () => {

     const { user, loading } = useAuth();

     const axiosSecure = useAxiosSecure();
     const { data, isLoading } = useQuery({
       queryKey: ["instructorHome"],
       enabled: !loading,
       queryFn: async () => {
         const response = await axiosSecure.get(
           `/instructorHome/${user.email}`
         );
         console.log(data);
         return response.data;
       },
     });

 
    return (
      <div className="p-4">
        <SimpleBackdrop open={isLoading} />
        {!isLoading && (
          <div>
            <div>
              <h2 className="text-2xl flex gap-4">
                <span>Name: {data?.data?.name}</span>
                <img src={data?.data?.photo} alt="" className="w-20 rounded-2xl" />
              </h2>
            </div>
            <div className="mt-2 capitalize text-xl">
                Role : {data?.data?.role}
            </div>
            <div className="mt-2">
                Phone: {data?.data?.phone}
            </div>
            <div className="mt-2">
                Gender: {data?.data?.gender}
            </div>
            <div className="mt-2">
                Email: {data?.data?.email}
            </div>
            <div className="mt-2"></div>
          </div>
        )}
      </div>
    );
};

export default InstructorHome;