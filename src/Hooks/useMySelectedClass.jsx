import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useMySelectedClass = () => {
    const {loading, user} = useAuth()

    const axiosSecure = useAxiosSecure()

     const { data, isLoading, refetch } = useQuery({
       queryKey: ["studentSelectedClass"],
       enabled: !loading,
       queryFn: async () => {
         const response = await axiosSecure.get(
           `/studentSelectedClass/${user.email}`
         );

         return response.data;
       },
     });
     

    return [data, isLoading, refetch];
};

export default useMySelectedClass;