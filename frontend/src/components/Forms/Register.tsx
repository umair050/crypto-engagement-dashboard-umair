'use client';
import React, { useState } from 'react';
import Input from '../UI/Input';

import { register } from '@/services/BACKEND/useAuth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {push} = useRouter()
  const handleSubmit =async (event: any) => {
    event.preventDefault();

    const res = await register({username, password})

    if (res.success) {
      toast.success("Register Successfull. Please Login.")
      push("/login")
    } 
    else {
      toast.error("Registraition Faild, Try Again")
    }
  };

  return (
    <form role="form text-left" onSubmit={handleSubmit}>
      <label>Username</label>
      <div className="mb-3">
        <Input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e: any) => setUsername(e.target.value)}
        />
      </div>


      <label>Password</label>
      <div className="mb-3">
        <Input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />
      </div>


      <div className="text-center">
        <button type="submit" className="btn bg-gradient-dark w-100 my-4 mb-2">Sign UP</button>
      </div>

      <div className="text-center">
        <a href="/dashboard/login" className="btn bg-gradient-secondary w-100 mt-4 mb-0">Sign IN</a>
      </div>
    </form>
  );
}

export default Register;