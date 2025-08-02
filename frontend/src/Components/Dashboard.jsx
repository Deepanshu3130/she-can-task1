import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ user }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/leaderboard');
        setLeaderboard(response.data);
      } catch (err) {
        console.error('Failed to fetch leaderboard', err);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* User Info Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Your Information</h3>
                <div className="mt-4">
                  <p className="text-gray-600">Name: <span className="font-medium">{user?.name}</span></p>
                  <p className="text-gray-600 mt-2">Referral Code: <span className="font-medium text-indigo-600">{user?.referralCode}</span></p>
                </div>
              </div>
            </div>

            {/* Donations Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Total Donations Raised</h3>
                <div className="mt-4">
                  <p className="text-4xl font-bold text-indigo-600">${user?.donationsRaised?.toLocaleString()}</p>
                  <p className="text-gray-500 mt-2">Keep sharing your referral code to raise more!</p>
                </div>
              </div>
            </div>

            {/* Rewards Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Your Rewards</h3>
                <div className="mt-4">
                  {user?.rewards?.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {user.rewards.map((reward, index) => (
                        <li key={index} className="text-gray-600">{reward}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No rewards yet. Keep referring!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;