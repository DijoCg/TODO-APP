import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setMessage('Login successful!');
      setEmail('');
      setPassword('');
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      
      
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#00ffc3] mb-15 tracking-wide text-center neon-glow">
        Welcome to <span className="text-[#00e6b8]">To-Do App</span>
      </h1>

       
       <div className="w-full max-w-md bg-[#111111] border border-[#00ffc3] shadow-2xl p-8 rounded-2xl backdrop-blur-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-[#00ffc3] tracking-wide">
          Login
        
        
        </h2>

        {message && (
          <p
            className={`text-center text-sm mb-4 font-medium ${
              message.includes('successful')
                ? 'text-green-400'
                : 'text-red-400'
            }`}
          >
            {message}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-[#00ffc3] bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ffc3]"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-[#00ffc3] bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ffc3]"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#00ffc3] text-black font-semibold py-2 rounded-lg hover:bg-[#00e6b8] transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-400">
          Don’t have an account?{' '}
          
          
          <a href="/" className="text-[#00ffc3] hover:underline">
            Sign Up
         
           </a>
        </p>
      </div>

    


    </div>
  );
};

export default Login;
