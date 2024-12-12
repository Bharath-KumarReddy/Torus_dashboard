import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listUsers } from '../../../state/ActionCreators/users';
import { RootState } from '../../../state/reducers';
import { Line, Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string | string[];
    tension?: number;
  }[];
};

type PieChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
};

const ChartSection = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const [userRegistrationData, setUserRegistrationData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  const [activeInactiveData, setActiveInactiveData] = useState<PieChartData>({
    labels: [],
    datasets: [],
  });

  const [usersByRegionData, setUsersByRegionData] = useState<PieChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    dispatch<any>(listUsers());
  }, [dispatch]);

  useEffect(() => {
    const filteredUsers = users.filter(user => {
      const userDate = new Date(user.RegisterDate); 
      const isWithinDateRange =
        (!startDate || userDate >= startDate) && (!endDate || userDate <= endDate);
      const isInSelectedRegion =
        selectedRegion === 'All' || user.Region === selectedRegion;
      return isWithinDateRange && isInSelectedRegion;
    });

    const monthlyRegistrations = Array(6).fill(0); 

    filteredUsers.forEach(user => {
      const userMonth = new Date(user.RegisterDate).getMonth(); 
      if (userMonth >= 5 && userMonth <= 10) {
        monthlyRegistrations[userMonth - 5] += 1;
      }
    });

    const mockRegistrationTrend: ChartData = {
      labels: ['June', 'July', 'August', 'September', 'October', 'November'],
      datasets: [
        {
          label: 'User Registrations',
          data: monthlyRegistrations,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          tension: 0.4,
        },
      ],
    };

    setUserRegistrationData(mockRegistrationTrend);

    const activeCount = filteredUsers.filter(user => user.Status === 'Active').length;
    const inactiveCount = filteredUsers.filter(user => user.Status === 'Not Active').length;
    setActiveInactiveData({
      labels: ['Active Users', 'Inactive Users'],
      datasets: [
        {
          label: 'Active vs Inactive Users',
          data: [activeCount, inactiveCount],
          backgroundColor: ['#4caf50', '#f44336'],
        },
      ],
    });

    const regionCounts = filteredUsers.reduce<Record<string, number>>((acc, user) => {
      acc[user.Region] = (acc[user.Region] || 0) + 1;
      return acc;
    }, {});

    const regions = Object.keys(regionCounts);
    const regionData = Object.values(regionCounts) as number[];

    setUsersByRegionData({
      labels: regions,
      datasets: [
        {
          label: 'Users by Region',
          data: regionData,
          backgroundColor: ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6'],
        },
      ],
    });
  }, [users, startDate, endDate, selectedRegion]);

  const regions = Array.from(new Set(users.map(user => user.Region))).filter(Boolean);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 py-10 w-screen overflow-x-hidden">
      <h2 className="text-4xl font-bold text-white mb-8">Analytics Charts</h2>

      <div className="w-full max-w-6xl mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-x-hidden">
        <div className="flex flex-col overflow-x-hidden">
          <label className="mb-2 font-semibold text-zinc-300">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            className="p-2 border rounded-lg shadow-sm text-black bg-white dark:text-white dark:bg-gray-800" 
          />
        </div>

        <div className="flex flex-col overflow-x-hidden">
          <label className="mb-2 font-semibold text-zinc-300">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date)}
            className="p-2 border rounded-lg shadow-sm text-black bg-white dark:text-white dark:bg-gray-800" 
          />
        </div>

        <div className="flex flex-col overflow-x-hidden">
          <label className="mb-2 font-semibold text-zinc-300">Region:</label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="p-2 border rounded-lg shadow-sm text-black bg-white dark:text-white dark:bg-gray-800"
          >
            <option value="All" className="text-black dark:text-white">All Regions</option>
            {regions.map((region) => (
              <option key={region} value={region} className="text-black dark:text-white">{region}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-10 overflow-x-hidden">
        <div className="p-6 bg-white rounded-lg shadow-lg overflow-x-hidden">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">User Registration Trend</h3>
          <Line data={userRegistrationData} options={{ maintainAspectRatio: true }} />
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg overflow-x-hidden">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Active vs Inactive Users</h3>
          <Pie data={activeInactiveData} options={{ maintainAspectRatio: true }} />
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg col-span-1 sm:col-span-2 overflow-x-hidden">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Users by Region</h3>
          <Bar data={usersByRegionData} options={{ maintainAspectRatio: true }} />
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
