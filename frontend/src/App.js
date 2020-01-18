import React, { } from 'react';
import './App.css';
import logo from '../src/assets/logo.png';
import Routes from './routes';

function App() {




  return (


    <div className="container">
      <img src={logo} alt="AirCnC" />

      <div className="content">
        <Routes></Routes>
      </div>
    </div>
  );
}

export default App;
