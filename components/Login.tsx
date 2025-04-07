"use client"

import React, { useState } from 'react';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1f2e]">
      <div className="w-full max-w-md p-8 rounded-lg bg-[#1e2538] shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">DEMO</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[#2a3143] border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[#2a3143] border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-md transition duration-150 ease-in-out"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-gray-400">¿No tienes cuenta?</p>
          <a href="#" className="text-blue-400 hover:text-blue-300 text-sm">
            Registrate
          </a>
          <div className="text-gray-400 text-sm">
            ¿Tienes un código?{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300">
              Confirmar tu cuenta
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;