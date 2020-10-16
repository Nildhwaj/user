import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/NavBar.component';
import UserList from './components/UserList.component';
import EditUser from './components/EditUser.component';
import CreateUser from './components/CreateUser.component';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={UserList} />
        <Route path="/edit/:id"  component={EditUser} />
        <Route path="/create"  component={CreateUser} />
      </div>
      
    </Router>
  );
}

export default App;
