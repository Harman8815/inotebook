import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import React, { useState, useEffect } from "react";
import NoteState from "./context/Notes/NoteState";
import Alert from "./components/Alert";

function App() {
  const [alert, setAlert] = useState({ msg: "", type: "" });
  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert({ msg: "", type: "" });
    }, 1000);
  };
  

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={<About showAlert={showAlert} />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </Router>
      </NoteState>

    </>
  );
}
console.warn = () => { };


export default App;
