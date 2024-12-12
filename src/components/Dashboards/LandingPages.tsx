import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LandingPages = () => {
  const navigate = useNavigate();

  // const handleUserManagement = () => {
  //   navigate('/user-management');
  // };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleAnalyticsDashboard = () => {
    navigate('/analytics-dashboard');
  };

  return (
    <div className="min-h-screen w-screen bg-black relative overflow-hidden">
    
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1703063179893-f4ed9d00fb4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGxpZ2h0JTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D')",
        }}
      ></div>

   
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
        
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-5xl md:text-7xl font-bold text-black mb-6"
        >
          Welcome to Dashboard

        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="flex space-x-6"
        >
          
          <button
            onClick={() => navigate('/user-management')}
            className="px-6 py-3 bg-purple-600 text-white text-lg rounded-lg shadow-lg hover:bg-purple-700 transition duration-300"
          >
            User Management Dashboard
          </button>
          
          <button
            onClick={handleAnalyticsDashboard}
            className="px-6 py-3 bg-teal-600 text-white text-lg rounded-lg shadow-lg hover:bg-teal-700 transition duration-300"
          >
            Analytics Dashboard
          </button>
        
        </motion.div>

      </div>
    </div>
  );
};

export default LandingPages;