import React, { useState } from "react";
import {Link} from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    toast.success("Login successful!");
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
     

      <div
        className="hidden lg:block w-1/2 h-screen bg-cover"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?semt=ais_hybrid)",
            objectFit:'fill'
        }}
      ></div>

    
      <div className="w-full h-screen lg:w-1/2 flex items-center justify-center bg-gray">

        <div className="w-[70%] h-[45%] bg-gray-800 p-8 rounded-lg shadow-lg text-white">
          <h2 className="text-3xl font-extrabold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-lg font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mt-2 w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-lg font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="mt-2 w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-md shadow-lg hover:bg-purple-700 transition-all duration-300"
              >
                Log In
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-400 mt-4">
           Already have an account?{" "}
            <Link to="/signup" className="text-purple-500 hover:text-purple-400">
              Login
            </Link>
          </p>
        </div>
      </div>

     
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />

    </div>
  );
};

export default LoginPage;
