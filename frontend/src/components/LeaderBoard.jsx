import React from 'react';

const Leaderboard = ({ users }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
      {/* Section Title */}
      <h2 className="text-xl font-bold text-purple-700 mb-4">🏆 Leaderboard</h2>

      {/* List of Users Sorted by Rank */}
      <ul className="divide-y divide-gray-200 text-gray-800 text-sm">
        {users.map((user, index) => (
          <li key={user._id} className="flex justify-between py-2">
            <span className="font-medium">
              #{index + 1} {user.name}
            </span>
            <span className="text-green-600 font-semibold">{user.totalPoints} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
