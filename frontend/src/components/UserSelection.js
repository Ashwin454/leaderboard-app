import React, { useState } from 'react';

const UserSelection = ({ users, selectedUser, setSelectedUser, setMessage, fetchUsers, fetchHistory }) => {
  const [newUserName, setNewUserName] = useState('');

  const handleClaim = async () => {         //Function for handling the claim points
    try {
      const response = await fetch('https://leaderboard-app-iq8m.onrender.com/api/v1/users/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedUser }),
      });
      const data = await response.json();
      if (data.points) {
        const user = users.find((u) => u._id === selectedUser);
        const userName = user ? user.name : 'Unknown User';
        setMessage(`🎉 Claimed ${data.points} points for ${userName}! Total: ${data.totalPoints}`);
        fetchUsers();
        fetchHistory();
        
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.message);
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('❌ Error claiming points');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleAddUser = async () => {       //Function for handling the addition of new user to the database.
    if (!newUserName.trim()) {
      setMessage('⚠️ Please enter a valid name');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    try {
      const response = await fetch('https://leaderboard-app-iq8m.onrender.com/api/v1/users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newUserName }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`✅ User ${newUserName} added successfully!`);
        setNewUserName('');
        fetchUsers();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.message);
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('❌ Error adding user');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="user-selection-container">

      {/* Component for selecting the user and claiming points for that user */}
      <h2 className="section-title">🎮 Claim Point</h2>
      
      <div className="form-group">
        <label className="form-label">Select User</label>
        <select
          className="form-select"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Choose a user...</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.totalPoints} points)
            </option>
          ))}
        </select>
      </div>
      
      <button
        className="btn btn-primary"
        onClick={handleClaim}
        disabled={!selectedUser}
      >
        🔥 Claim Points
      </button>
      
      {/* Component for adding a new user to the database */}
      <div className="add-user-section">
        <h3 className="section-title">➕ Add New User</h3>
        <div className="form-group">
          <label className="form-label">User Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter user name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddUser()}
          />
        </div>
        <button
          className="btn btn-secondary"
          onClick={handleAddUser}
          disabled={!newUserName.trim()}
        >
          ✨ Add User
        </button>
      </div>
    </div>
  );
};

export default UserSelection;