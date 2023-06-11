import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";




const CheckoutForm = ({price,cart}) => {
    
    const stripe = useStripe();
    const elements = useElements();
    const {user}=useContext(AuthContext);
    const [cardError,setCardError]=useState('');
    const [processing,setProcessing]=useState(false);
    const [transectionId,setTransectionId]=useState('');
    const [axiosSecure]=useAxiosSecure();
    const [clientSecret,setClientSecret]=useState('');

    useEffect(()=>{
     if(price>0){
        axiosSecure.post('/create-payment-intent',{price})
        .then(res=>{
          console.log(res.data.clientSecret)
          setClientSecret(res.data.clientSecret)
        })
     }
    },[price,axiosSecure])
  
    const handleSubmit = async (event) => {
   
      event.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
      const card=elements.getElement(CardElement);
      if(card == null){
        return;
      }
      console.log('card info', card)
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        console.log('[error]', error);
        setCardError(error.message)
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        setCardError('')
      }
       
      setProcessing(true);
      const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName || 'annonymous',
              email: user?.email || 'annonymous'
            },
          },
        },
      );
      if(confirmError){
        console.log(confirmError)
      }
      console.log('payment intend',paymentIntent);

      setProcessing(false);
      if(paymentIntent.status==='succeeded'){
        setTransectionId(paymentIntent.id);
        // server e payment save related backend e api bananor por
        const payment={
            email:user?.email,
            transectionId:paymentIntent.id,
            price,
            date:new Date(),
            quantity:cart.length,
            cartItems:cart.map(item=>item._id),
            foodItems:cart.map(item=>item.foodId),
            status:'service pending',
            itemNames:cart.map(item=>item.name)
        }
        axiosSecure.post('/payments',payment)
        .then(res=>{
            console.log(res.data);
            if(res.data.insertedId){
                alert('payment added')
            }
        })


      }
    };

    
    return (
       <>
        <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <div className="text-center my-20">
      <button className="btn btn-primary px-10" type="submit" disabled={!stripe || !clientSecret || processing}>
        pay
      </button>
      </div>
    </form>
    {cardError && <p>{cardError}</p> }
    {transectionId && <p className="text-2xl">your transection id is: {transectionId}</p>}
       </>
    );
};

export default CheckoutForm;