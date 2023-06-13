import useAxiosSecure from "./useAxiosSecure";


const useUpdateSeats = (ids) => {

     const body = ids;
     useAxiosSecure.post("/updateClassSeats", body).then((res) => {
       console.log(res.data);
     });
    return 
};

export default useUpdateSeats;