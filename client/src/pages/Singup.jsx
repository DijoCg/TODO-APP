import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    axios
      .post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        setMessage('Registration successful!');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        setTimeout(() => {
          navigate('/login');
        }, 1000);
      })
      .catch((error) => {
        console.error(error.response?.data || error.message);
        setMessage(error.response?.data?.message || 'Something went wrong');
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">

      <h1 className="text-4xl md:text-5xl font-extrabold text-[#00ffc3] mb-15 tracking-wide text-center">
        Welcome to <span className="text-[#00e6b8]">To-Do App</span>
      </h1>

      <div className="w-full max-w-md bg-[#111111] border border-[#00ffc3] shadow-2xl p-8 rounded-2xl backdrop-blur-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-[#00ffc3] tracking-wide">
          Sign Up
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
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-[#00ffc3] bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ffc3]"
            required
          />

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

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-[#00ffc3] bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ffc3]"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#00ffc3] text-black font-semibold py-2 rounded-lg hover:bg-[#00e6b8] transition duration-200 cursor-pointer">
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-[#00ffc3] hover:underline">
            Login
          </a>
        </p>
      </div>

      
    </div>
  );
}

export default Signup;
