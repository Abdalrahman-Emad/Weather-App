import React, { useState } from 'react';
import { signUp } from '../../utils/authFunctions';
import sunnyBg from '../../assets/sunny-bg.jpg'; 


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      setSuccess('Sign-up successful! Please log in.');
      setError('');
    } catch (err) {
      setError('Failed to sign up: ' + err.message);
      setSuccess('');
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center" 
      style={{ backgroundImage: `url(${sunnyBg})` }}  
      >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors font-bold"
          >
            Sign Up
          </button>
          {error && <div className="text-red-600 text-center mt-4">{error}</div>}
          {success && <div className="text-green-600 text-center mt-4">{success}</div>}
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">Already have an account?</p>
          <a href="/signIn" className="text-blue-600 hover:underline">Sign In</a>
        </div>

      </div>
    </div>
  );
};

export default SignUp;
