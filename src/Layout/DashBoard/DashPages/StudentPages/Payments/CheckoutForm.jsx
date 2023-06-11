/* eslint-disable react-hooks/exhaustive-deps */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import './common.css'
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../../Hooks/useAuth";

const CheckoutForm = ({price}) => {
    const stripe = useStripe()
    const elements = useElements();
    const { user } = useAuth();
    const [cardError, setCardError] = useState('')
    const axiosSecure = useAxiosSecure()
      const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
      
        axiosSecure.post(`/create-payment-intent`, {price} )
        .then(res => {
        //  console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
      
    }, [price])
    

   const handleSubmit = async (event) => {    
     event.preventDefault();

     if (!stripe || !elements) {
       return;
     }

     const card = elements.getElement(CardElement);

     if (card == null) {
       return;
     }

     // Use your card Element with other Stripe.js APIs
     const { error, paymentMethod } = await stripe.createPaymentMethod({
       type: "card",
       card,
     });

   

     if (error) {
     //  console.log("[error]", error);
       setCardError(error.message)
     } else {
      setCardError('')
       console.log("[PaymentMethod]", paymentMethod);
     }

     const { paymentIntent, error: confirmError } =
       await stripe.confirmCardPayment(clientSecret, {
         payment_method: {
           card: card,
           billing_details: {
             email: user?.email || "anonymous",
             name: user?.displayName || "No name",
           },
         },
       });

     if (confirmError) {
       console.log(confirmError);
       return;
     }

     console.log(paymentIntent)

   };

    return (
      <div className="checkout_form" >
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
         
            <button  type="submit" disabled={!stripe || !clientSecret}>
              Pay
            </button>
         
        </form>
        <div className="mt-2">
            {cardError && <p className="text-red-600">{cardError}</p>}
        </div>
      </div>
    );
};

export default CheckoutForm;