import React, { useState, useEffect } from 'react';
import UserSelection from './components/UserSelection';
import Leaderboard from './components/Leaderboard';
import ClaimHistory from './components/ClaimHistory';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);

  const fetchUsers = async () => {      //Fetching the list of users
    try {
      const response = await fetch('http://localhost:8080/api/v1/users/get');
      const data = await response.json();
      setUsers(data);
      if (data.length > 0 && !selectedUser) {
        setSelectedUser(data[0]._id);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchHistory = async () => {    //Fetching History of claims
    try {
      const response = await fetch('http://localhost:8080/api/v1/history/get');
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {             //Fetches the list of users and history on loading
    fetchUsers();
    fetchHistory();
  }, []);   // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="app-container">
      <div className="main-content">
        <h1 style={{textAlign: 'center'}}>Leaderboard App</h1>
        <br />

        {/* Component for adding the user and point claiming */}
        <div className="user-selection-container">
          <UserSelection
            users={users}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            setMessage={setMessage}
            fetchUsers={fetchUsers}
            fetchHistory={fetchHistory}
          />
        </div>

        <div className="top-three">
          {users.slice(0, 3).map((user, index) => (
            <div key={user._id} className={`top-user rank-${index + 1}`}>
              <div className="rank-badge">{index + 1}</div>
              <div className="user-avatar">
                <img src={`https://ui-avatars.com/api/?name=${user.name}&size=80&background=random`} alt={user.name} />
              </div>
              <div className="user-name">{user.name}</div>
              <div className="user-points">
                <span className="fire-icon">🔥</span>
                {user.totalPoints}
              </div>
            </div>
          ))}
        </div>
        
        {/* Component for showing up the leaderboard */}
        <Leaderboard users={users} />
        
        {/* Component for showing up the history of point claims */}
        <ClaimHistory history={history} fetchHistory={fetchHistory} />
        
        {/* Showing up the notification for each action performed */}
        {message && (
          <div className="message-popup">{message}</div>
        )}
      </div>
    </div>
  );
};

export default App;