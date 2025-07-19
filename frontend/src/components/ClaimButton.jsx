import React, { useState } from 'react';
import api from '../api';

const ClaimButton = ({ selectedUser, onClaim }) => {
  const [loading, setLoading] = useState(false);

  const claimPoints = async () => {
    if (!selectedUser) return alert('Please select a user!');
    setLoading(true);
    const res = await api.post('/claim', { userId: selectedUser });
    onClaim(res.data); // Pass result to parent
    setLoading(false);
  };

  return (
    <div className="my-4 text-center">
      <button
        onClick={claimPoints}
        disabled={!selectedUser || loading}
        className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Claiming...' : 'Claim Points'}
      </button>
    </div>
  );
};

export default ClaimButton;
