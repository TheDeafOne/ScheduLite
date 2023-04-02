import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './sceens/HomeScreen/HomeScreen';
import VerticalTabs from './sceens/ProfileScreen/VerticalTabs';
import BlockPage from './sceens/ChooseSchedScreen/BlockPage';
// import Login from './sceens/LoginScreen/login.screen';
// import Signup from './sceens/SignupScreen/signup.screen';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<VerticalTabs />} />
        <Route path="/home" element={<BlockPage />} />

      </Routes>
    </div> 
  );
}

export default App;
