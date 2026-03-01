import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import LoginUser from "./components/LoginUser";
import RegisterUser from "./components/RegisterUser";
import './App.css'

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginUser />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/verify_token/:token" element={<ResetPassword />} />
        </Routes>
      </Router>
      
    </>
  )
}

export default App
