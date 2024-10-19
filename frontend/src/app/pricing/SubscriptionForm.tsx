"use client";
// CheckoutForm.tsx
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { subscription } from '@/services/BACKEND/useAuth';
import { styled } from 'styled-components';
import Button from '@/components/Button';

const NEXT_PUBLIC_STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

const stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");

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
        // window.location.href = '/dashboard/login';
        
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CustomButton disabled={loading} onClick={handleClick}>
        {loading ? 'Loading...' : 'Subscribe'}
      </CustomButton>
      {error && <div style={{marginTop:"10px", color:"red"}}>{error}</div>}
    </div>
  );
};


const CustomButton = styled(Button)`
  width: 100%;
`;

export default CheckoutForm;
