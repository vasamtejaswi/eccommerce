import React, { useState, useEffect } from 'react';
import MyComponent from './MyComponent';
import './App.css';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Emmorce Website</h1>
      <MyComponent users={users} />
    </div>
    );
}

export default App;
