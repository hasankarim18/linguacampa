
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import './common.css'
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({price, cart}) => {
    const stripe = useStripe()
    const elements = useElements();
    const { user } = useAuth();
    const [cardError, setCardError] = useState('')
    const axiosSecure = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false)
    const navigate = useNavigate();
    const [paymentError, setPaymentError] = useState('')
   // const [transactionId, setTransactionId] = useState('')

    useEffect(() => {
      
        axiosSecure.post(`/create-payment-intent`, {price} )
        .then(res => {
        //  console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
      
    }, [price, axiosSecure])
    

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
     const { error } = await stripe.createPaymentMethod({
       type: "card",
       card,
     });

   

     if (error) {
     //  console.log("[error]", error);
       setCardError(error.message)
     } else {
      setCardError('')
      // console.log("[PaymentMethod]", paymentMethod);
     }

     setProcessing(true)

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
      setPaymentError(confirmError.message);
       console.log(confirmError);
       return;
     }

    // console.log('[payment intent]',paymentIntent)
     setProcessing(false)

     if(paymentIntent.status === "succeeded"){

    //  setTransactionId(paymentIntent.id);
      // save payment information to the server 
      const payment = {
        user: user?.email,
        transactionid: paymentIntent.id,
        date: new Date(),
        price,
        quantity: cart.length,
        enrolledClassIds: cart.map((item) => item._id),
       
      };

     // console.log(payment)

       axiosSecure.post("/payments", payment)
       .then(res => {
        if (res.data.insertResult.insertedId) {
         navigate("/dashboard/studentHome");  
       //  console.log(payment)
         const ids = payment.enrolledClassIds;

         const body = ids
         axiosSecure.post("/updateClassSeats", body).then((res) => {
           console.log(res.data);
           if(res.data.data.modifiedCount > 0){
             Swal.fire({
               title: "Payment Success",
               icon: "success",
             });
           }
         });
         
        }
       })
   }
  }
 //  console.log('cart',cart);

    return (
      <div className="checkout_form">
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

          <button
            className="btn-green1"
            type="submit"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </button>
        </form>
        <div className="mt-2">
          {cardError && <p className="text-red-600">{cardError}</p>}
        </div>
        {paymentError !== "" && <p className="text-red-600">{paymentError}</p>}
      </div>
    );
};

export default CheckoutForm;