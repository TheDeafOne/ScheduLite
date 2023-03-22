import React from 'react';
import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './sceens/HomeScreen/HomeScreen';
import Profile from './sceens/ProfileScreen/profile.screen';
import Login from './sceens/LoginScreen/login.screen';
import Signup from './sceens/SignupScreen/signup.screen';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
