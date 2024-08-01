'use client'

import React, { useState } from 'react';
import Input from '../UI/Input';
import ReCAPTCHA from 'react-google-recaptcha';
import { login } from '@/services/BACKEND/useAuth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Login = () => {
  // State for storing username, password, and reCAPTCHA token
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {push} = useRouter()
    // const [recaptchaToken, setRecaptchaToken] = useState('');

  // Function to handle reCAPTCHA verification
  // const onRecaptchaChange = (token) => {
  //   setRecaptchaToken(token);
  // };

  // Function to handle form submission
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const res = await login({username, password})

    if (res.success) {
      toast.success("Login Successfull. Welcome.")
      push("/")
    } else {
      toast.error("Login Faild, Try Again")

    }

  };

  return (
    <form role="form text-left" method="post" action="" onSubmit={handleSubmit}>
      <label>Username</label>
      <div className="mb-3">
        <Input 
          type="text" 
          placeholder='Username' 
          value={username}
          onChange={(e: any) => setUsername(e.target.value)}
        />
      </div>

      <label>Password</label>
      <div className="mb-3">
        <Input 
          type="password" 
          placeholder='Password'
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />
      </div>

      {/* <div className="mb-3">
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_reCAPTCHA_SITE_KEY ?? "UNDEFINED"} // Replace with your reCAPTCHA site key
          onChange={onRecaptchaChange}
        />
      </div> */}

      <div className="text-center">
        <button type="submit" className="btn bg-gradient-info w-100 mt-4 mb-0">Sign IN</button>
      </div>

      <div className="text-center">
        <a href="/register" className="btn bg-gradient-secondary w-100 mt-4 mb-0">Sign UP</a>
      </div>
    </form>
  );
}

export default Login;
