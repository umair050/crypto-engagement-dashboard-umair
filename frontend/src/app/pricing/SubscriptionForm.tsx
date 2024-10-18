"use client";
// CheckoutForm.tsx
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { subscription } from '@/services/BACKEND/useAuth';

const stripePromise = loadStripe('pk_test_wmJkgiQjKKc3O3ZaKJIOIXEF00bPBkNhdy');

export interface CheckoutFormProps {
  priceId: string;
}

const CheckoutForm= ({priceId}:CheckoutFormProps ) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setError(null); // Reset error state before the action

    try {
      // const priceId = "price_1Q8zoaLtIWiOvjKvHSdBdow7";
      
      // Call the subscription function
      const response = await subscription(priceId);
      console.log("Subscription Response:", response);
      
      // Check if response is valid and has an id
      if (response?.id) {
        const stripe = await stripePromise;
        await stripe?.redirectToCheckout({ sessionId: response.id });
      } else {
        throw new Error('No session ID returned from subscription test.');
      }
      
    } catch (error: any) {
      console.error('Error during checkout:', error); // Log the error for debugging
      setError('Login is required. Redirecting you to login page... ');
      // redirect to login in 3 seconds
      setTimeout(() => {
        setError(null)
        // redirect to
        window.location.href = '/dashboard/login';
        
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button disabled={loading} onClick={handleClick}>
        {loading ? 'Loading...' : 'Subscribe'}
      </button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default CheckoutForm;
