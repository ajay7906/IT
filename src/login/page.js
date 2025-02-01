import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      switch (response.data.user.role) {
        case 'superadmin':
          navigate('/superadmin-dashboard');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
        default:
          navigate('/user-dashboard');
      }
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div
      className="flex items-center bg-yellow-200 justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      style={{ backgroundImage: "url('/your-background-image.png')" }}
    >
      <div className="w-96 px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-gray-800">Login Form</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-600" htmlFor="email">
                Email or Username
              </label>
              <input
                type="email"
                placeholder="Email or Username"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="w-full px-6 py-2 mt-4 text-white bg-gradient-to-r from-yellow-500 to-yellow-200 rounded-md hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              LOGIN
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="mt-6 text-center">
          <p className="text-gray-600">Or login with</p>
          <div className="flex items-center justify-center mt-2 space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Facebook
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Google
            </button>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Not a member? <a href="/signup" className="text-purple-500 hover:underline">Signup now</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
