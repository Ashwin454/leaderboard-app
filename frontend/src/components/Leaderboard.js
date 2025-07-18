import React, { useState } from 'react';

const Leaderboard = ({ users }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  
  const remainingUsers = users.slice(3);     //Done because the top 3 users are shown in a different format in App.js

  const totalPages = Math.ceil(remainingUsers.length / itemsPerPage);
  const paginatedUsers = remainingUsers.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (newPage) => {           //Function for handling the page change.
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        Leaderboard
      </div>
      
      {/* Component for showing up the list of remaining users */}
      <div className="leaderboard-list">
        {remainingUsers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-text">No users available</div>
          </div>
        ) : (
          paginatedUsers.map((user, index) => {         //Mapping the users
            const actualRank = (page - 1) * itemsPerPage + index + 4;
            return (
              <div key={user._id} className="leaderboard-item">
                <div className="item-rank">{actualRank}</div>
                <div className="item-avatar">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${user.name}&size=40&background=random`}     //An api for showing the fist 2 letters of the name as profile icon
                    alt={user.name}
                  />
                </div>
                <div className="item-info">
                  <div className="item-name">{user.name}</div>
                  {/* For showing the last 6 digits of mongoose id on the screen */}
                  <div className="item-id">ID: {user._id.slice(-6)}</div>
                </div>
                <div className="item-points">
                  <span className="fire-icon">🔥</span>
                  {user.totalPoints}
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* Logic for changing the pages and showing the list of users mapped to a particular page */}
      {remainingUsers.length > 0 && totalPages > 1 && ( 
        <div className="pagination">
          <button
            className="pagination-btn"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {page} of {totalPages}
          </span>
          <button
            className="pagination-btn"
            disabled={page >= totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;