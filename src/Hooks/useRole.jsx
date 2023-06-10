import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  // const roles = ["super_admin", "admin", "instructors", "student"]
   const { user, loading } = useAuth();
   const axiosSecure = useAxiosSecure();
   // use axios query with react query to inject header and authorization and refetch
   const { data: role, isLoading: isRoleLoading } = useQuery({
     queryKey: ["isRole", user?.email],
     enabled: !loading,
     queryFn: async () => {
       const res = await axiosSecure.get(`/users/role/${user?.email}`);

       return res.data;
     },
   });
   return [role, isRoleLoading];
};

export default useRole;
