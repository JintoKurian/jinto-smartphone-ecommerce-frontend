import React, { useState } from 'react';
import { loginUser } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import { Spinner } from 'flowbite-react';



const Login = () => {

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser(credentials);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      dispatch(loginSuccess({token: res.data.token, user:res.data.user}));

      

      alert('Login successfull');
      navigate('/');

    } catch (error) {
      alert('Login failed. Please Check your credentials.');
      console.log(error);
      
    } finally {
      setLoading(false);
    } 
  }



  return (
    <div>
       <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />

<button
  disabled={loading}
  type="submit"
  className={`text-white py-2 rounded w-full ${
    loading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {loading ? (
    <Spinner aria-label="Spinner button example" size="sm" light />
  ) : (
    "Login"
  )}
</button>


        {/* <button disabled={loading} type="submit" className="text-white py-2 rounded w-full hover:bg-blue-700">
        {loading? <Spinner aria-label="Spinner button example" size="sm" light /> : "Login"}
          
        </button> */}
      </form>
    </div>
    </div>
  )
}

export default Login