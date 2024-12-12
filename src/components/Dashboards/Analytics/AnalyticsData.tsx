import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../../../state/ActionCreators/users';
import { RootState } from '../../../state/reducers';
import { motion } from 'framer-motion';
import { ReactTyped } from 'react-typed';
import { Link } from 'react-router-dom';

const AnalyticsData = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [deletedUsers, setDeletedUsers] = useState(0);

  const [displayTotalUsers, setDisplayTotalUsers] = useState(0);
  const [displayActiveUsers, setDisplayActiveUsers] = useState(0);
  const [displayDeletedUsers, setDisplayDeletedUsers] = useState(0);

  useEffect(() => {
    dispatch<any>(listUsers());
  }, [dispatch]);

  useEffect(() => {
    const cnt_users = users.filter(user => user.Age !== null).length;
    setTotalUsers(cnt_users);
    setActiveUsers(users.filter(user => user.Status === 'Active').length);
    setDeletedUsers(users.filter(user => user.Status === 'Not Active').length);
  }, [users]);

  const animateCount = (
    targetValue: number,
    setDisplayValue: (value: number) => void,
    duration: number = 1000
  ) => {
    let startValue = 0;
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  useEffect(() => {
    animateCount(totalUsers, setDisplayTotalUsers);
    animateCount(activeUsers, setDisplayActiveUsers);
    animateCount(deletedUsers, setDisplayDeletedUsers);
  }, [totalUsers, activeUsers, deletedUsers]);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-900">
      <div className="w-full max-w-screen-xl p-6 bg-gray-900 rounded-lg">
        <h2
          className="text-white text-4xl sm:text-5xl font-bold px-6 py-10 flex items-center justify-center"
          style={{ top: '-10%', position: 'relative' }}
        >
          <ReactTyped
            strings={['Summary Metrics', 'Analytics Dashboard']}
            typeSpeed={100}
            backSpeed={100}
            backDelay={1000}
            startDelay={50}
            loop={false}
          />
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 md:gap-12 mx-4 sm:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 sm:p-8 rounded-lg shadow-xl flex flex-col justify-between transform transition-all hover:scale-105 hover:shadow-2xl"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold">Total Users</h3>
            <p className="text-4xl sm:text-5xl font-bold">{displayTotalUsers}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 sm:p-8 rounded-lg shadow-xl flex flex-col justify-between transform transition-all hover:scale-105 hover:shadow-2xl"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold">Active Users</h3>
            <p className="text-4xl sm:text-5xl font-bold">{displayActiveUsers}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-r from-red-400 to-red-600 text-white p-6 sm:p-8 rounded-lg shadow-xl flex flex-col justify-between transform transition-all hover:scale-105 hover:shadow-2xl"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold">Deleted Users</h3>
            <p className="text-4xl sm:text-5xl font-bold">{displayDeletedUsers}</p>
          </motion.div>
        </div>
      </div>

      <div className="py-10">
        <Link to="/chart-section" className="text-white">
          <button className="bg-purple-700 text-white text-md sm:text-lg font-bold px-6 py-4 rounded-full flex items-center justify-center shadow-lg transition transform hover:scale-105">
            Go to Chart Section
            <i className="ri-arrow-right-line text-xl sm:text-2xl ml-3"></i>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AnalyticsData;
