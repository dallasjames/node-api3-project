import React from 'react';
import './App.css';
import Users from './Users';
import AddUser from './NewUser';

function App() {
  return (
    <div className="App">
      <AddUser />
      <Users />
    </div>
  );
}

export default App;
