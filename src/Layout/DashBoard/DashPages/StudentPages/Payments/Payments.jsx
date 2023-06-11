import { Helmet } from "react-helmet-async";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../../../Provider/DataProvider/DataProvider";
import useMySelectedClass from "../../../../../Hooks/useMySelectedClass";

const payment_key = import.meta.env.VITE_payment_gatewayPK;


const stripePromise = loadStripe(payment_key);


const Payments = () => {
   const [data, isLoading] = useMySelectedClass();
   const [totalPrice, setTotalPrice] = useState(0)

   
   useEffect(() => {

      if(!isLoading){
        const sum = data?.data.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.price;
        }, 0);
        const price = parseFloat(sum.toFixed(2));
        setTotalPrice(price);
      }
   
   }, [isLoading, setTotalPrice, data])
   
   
  return (
    <div>
      <Helmet>
        <title>Payment | LinguaCampa</title>
      </Helmet>
      <h3 className="text-3xl">Please Checkout</h3>
      <div className="mt-2 text-2xl">Total payable amount: ${totalPrice}</div>
      <div className="mt-8 p-2 sm:p-4 md:p-8 mx-auto w-full">
        {!isLoading && totalPrice  > 0 && (
          <Elements stripe={stripePromise}>
            <CheckoutForm price={totalPrice} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Payments;
