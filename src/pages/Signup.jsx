import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../services/allAPI';

const Signup = () => {

  const [user, setUser] = useState({name: '', email: '', password: ''});
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try {
      const res = await signupUser(user);
      if(res.status === 201){
        alert('Signup successfull');
        navigate('/login');
      }
    } catch (err) {
      alert("Signup Failed");
      console.log(err);
      
    }
  }




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80 space-y-4">
      <h2 className="text-2xl font-bold text-center">Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        className="w-full border p-2 rounded"
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        required
      />
      <button type="submit" className="bg-blue-600 text-white py-2 rounded w-full hover:bg-blue-700">
        Sign Up
      </button>
    </form>
  </div>
  )
}

export default Signup