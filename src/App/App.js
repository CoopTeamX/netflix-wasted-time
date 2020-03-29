import './App.css';
import logo from './logo.svg';
import React from 'react';
import FileReader from "../FileReader/FileReader";

function App() {
  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
         <FileReader/>
    </div>
  );
}

export default App;
