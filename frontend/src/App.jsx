import React, { useEffect, useState } from 'react';
import api from './api';
import socket from './socket';
import UserSelector from './components/UserSelector';
import ClaimButton from './components/ClaimButton';
import Leaderboard from './components/LeaderBoard'; // 
import History from './components/History';

const App = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyData, setHistoryData] = useState({ history: [], totalPages: 1 });

  // Fetch claim history for a given page
  const fetchHistory = async (page = 1) => {
    try {
      const res = await api.get(`/claim/history?page=${page}`);
      setHistoryData(res.data);
      setHistoryPage(page);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  // Fetch users and initial claim history
  const fetchAll = async () => {
    setLoading(true);
    try {
      const userRes = await api.get('/users');
      setUsers(userRes.data);
      await fetchHistory(1);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Setup WebSocket listeners for real-time updates
  useEffect(() => {
    fetchAll(); // initial load

    socket.on('leaderboard_update', (data) => setUsers(data));

    socket.on('history_update', (data) => {
      setHistoryData({ history: data, totalPages: 1 });
      setHistoryPage(1);
      setLoading(false);
    });

    return () => {
      socket.off('leaderboard_update');
      socket.off('history_update');
    };
  }, []);

  // No manual claim refresh needed — socket handles it
  const handleClaim = () => {};

  // Show loading message while fetching data
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        Loading leaderboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="p-6 bg-white rounded-2xl shadow-md space-y-6 border border-gray-200">
          <h1 className="text-2xl font-bold text-center text-green-700">🎯 Point Claim System</h1>

          {/* User dropdown and add input */}
          <UserSelector selectedUser={selectedUser} setSelectedUser={setSelectedUser} />

          {/* Claim button */}
          <ClaimButton selectedUser={selectedUser} onClaim={handleClaim} />

          {/* Leaderboard section */}
          <Leaderboard users={users} />

          {/* Claim history with pagination */}
          <History
            history={historyData.history}
            currentPage={historyPage}
            totalPages={historyData.totalPages}
            onPageChange={fetchHistory}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
