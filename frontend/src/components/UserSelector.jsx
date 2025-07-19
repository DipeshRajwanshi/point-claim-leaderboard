import React, { useEffect, useState } from 'react';
import api from '../api';

const UserSelector = ({ selectedUser, setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [loading, setLoading] = useState(true);

  //  Fetch users from the server
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  //  Run fetchUsers when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  //  Add a new user
  const handleAddUser = async () => {
    if (!newUser.trim()) return;
    try {
      await api.post('/users', { name: newUser });
      setNewUser('');
      fetchUsers(); // refresh the list
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-blue-700">👤 Select or Add User</h2>

      {/* User dropdown */}
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">-- Select User --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      {/* New user input + add button */}
      <div className="flex gap-2">
        <input
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          placeholder="Enter new user name"
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddUser}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
        >
          Add
        </button>
      </div>

      {/* Optional: Loading indicator */}
      {loading && (
        <p className="mt-3 text-sm text-gray-500 animate-pulse">Loading users...</p>
      )}
    </div>
  );
};

export default UserSelector;
