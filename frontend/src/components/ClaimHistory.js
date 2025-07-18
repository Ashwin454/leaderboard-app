import React, { useState } from 'react';

const ClaimHistory = ({ history, fetchHistory }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(history.length / itemsPerPage);
  const paginatedHistory = history.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const formatDate = (dateString) => {      //For formatting the date in a particular manner to make it look nicer
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="claim-history-container">
      <div className="claim-history-header">
        📈 Claim History
      </div>
      {/* For showing up the list of users in a table in user   points     Date format */}
      {history.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-text">No claim history available</div>
        </div>
      ) : (
        <>
          <table className="history-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Points</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              
              {paginatedHistory.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ 
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        marginRight: '10px',
                        border: '1px solid #e5e5e5'
                      }}>
                        <img 
                          src={`https://ui-avatars.com/api/?name=${item.userId?.name || 'Unknown'}&size=30&background=random`}
                          alt={item.userId?.name || 'Unknown'}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '14px' }}>
                          {item.userId?.name || 'Unknown'}
                        </div>
                        <div style={{ fontSize: '12px', color: '#999' }}>
                          ID: {item.userId?._id?.slice(-6) || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#ff6b35', fontWeight: 'bold' }}>
                      <span style={{ marginRight: '4px' }}>🔥</span>
                      {item.points}
                    </div>
                  </td>
                  <td style={{ fontSize: '13px', color: '#666' }}>
                    {formatDate(item.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Logic for changing the pages and showing the list of users mapped to a particular page */}
          {totalPages > 1 && (
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
        </>
      )}
    </div>
  );
};

export default ClaimHistory;