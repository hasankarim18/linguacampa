import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import SimpleBackdrop from "../../../../../Utils/SimpleBackDrop";
import moment from "moment";


const PaymentHistory = () => {

    const {user, loading} = useAuth()
    const axiosSecure = useAxiosSecure()

   

     const { data, isLoading } = useQuery({
       queryKey: ["paymentHistory"],
       enabled: !loading,
       queryFn: async () => {
         const response = await axiosSecure.get(
           `/paymentHistory/${user.email}`
         );

         return response.data;
       },
     });

     console.log(data);

  return (
    <div>
      <SimpleBackdrop open={isLoading} />
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Transaction Id</th>
                <th>Paid Amount USD</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {!isLoading &&
                data.data.map((item,i) =>{ 
                     const dateStr = item.date;
                     const formattedDate = moment(dateStr).format(
                       "YYYY-MMM-DD"
                     );
                    return (
                      <tr key={item._id}>
                        <th>{i + 1}</th>
                        <td>{item.transactionid}</td>
                        <td>{item.price}</td>
                        <td>{formattedDate}</td>
                      </tr>
                    );})}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
