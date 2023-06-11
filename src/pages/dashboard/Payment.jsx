import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from '../../paymentRelated/CheckoutForm';
import SharedTitle from '../../shared/SharedTitle';
import useCart from '../../hooks/useCart';
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Key);

const Payment = () => {
    const [cart]=useCart();
    const total=cart.reduce((sum,item)=>sum+item.price,0);
    const price=parseFloat(total.toFixed(2));
    return (
        
          <div className='w-[50%] mx-auto'>
            <SharedTitle heading='payment' subHeading='taka ase ureure'></SharedTitle>
              <Elements stripe={stripePromise}>
                <CheckoutForm price={price} cart={cart}></CheckoutForm>
            </Elements>
        
          </div>
    );
};

export default Payment;