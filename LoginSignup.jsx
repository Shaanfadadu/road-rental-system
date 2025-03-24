import React, { useState } from 'react';
import { Car, Lock, Mail, User } from 'lucide-react';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login submitted:', formData.email);
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      console.log('Signup submitted:', formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="w-full max-w-md shadow-2xl border-none bg-white rounded-lg">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <div className="bg-blue-600 text-white p-4 rounded-full shadow-lg">
            <Car size={48} strokeWidth={1.5} />
          </div>
        </div>
        <div className="pt-16 text-center p-6">
          <h1 className="text-3xl font-bold text-blue-800">
            Road Runner Rentals
          </h1>
          <p className="text-gray-500">
            {isLogin ? 'Welcome Back!' : 'Create Your Account'}
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full p-2 pl-10 border rounded"
                  required
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full p-2 pl-10 border rounded"
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 pl-10 border rounded"
                required
              />
            </div>
            
            {!isLogin && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full p-2 pl-10 border rounded"
                  required
                />
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full p-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white rounded"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
            
            <div className="text-center">
              <button 
                type="button"
                className="text-blue-600 hover:text-blue-800"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin 
                  ? 'Need an account? Sign Up' 
                  : 'Already have an account? Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
