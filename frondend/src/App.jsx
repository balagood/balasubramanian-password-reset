import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import './App.css'

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ForgotPassword />} />
          <Route path="/reset_password" element={<ResetPassword />} />
        </Routes>
      </Router>
      
    </>
  )
}

export default App
