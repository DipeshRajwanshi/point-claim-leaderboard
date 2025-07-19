import React from "react";

const History = ({ history, currentPage, totalPages, onPageChange }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-yellow-700">📜 Claim History</h2>

      {/* Show message if no history */}
      {history.length === 0 ? (
        <p className="text-gray-500">No history found.</p>
      ) : (
        <>
          {/* List of claim records */}
          <ul className="list-disc space-y-2 pl-5 text-sm text-gray-800">
            {history.map((h) => (
              <li key={h._id}>
                <span className="font-medium">{h.userId.name}</span> claimed{" "}
                <span className="text-green-600 font-semibold">{h.points} pts</span>{" "}
                at {new Date(h.claimedAt).toLocaleString()}
              </li>
            ))}
          </ul>

          {/* Pagination controls */}
          <div className="flex justify-between items-center mt-6 text-sm">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
            >
              ⬅ Prev
            </button>

            <span className="text-gray-700">
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default History;
