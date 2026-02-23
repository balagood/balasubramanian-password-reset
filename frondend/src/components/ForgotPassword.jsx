import React, { useState } from "react";
import api from "../services/api";
import AlertMessage from "./AlertMessage";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    
    const res = await api.post("/forgot-password", { email });
    setMessage(res.message);
  };

  return (
    <div className="container mt-5">
      <h2>Forgot Password</h2>
      <input
        type="email"
        className="form-control"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Send Reset Link
      </button>
      {message && <AlertMessage message={message} />}
    </div>
  );
}

export default ForgotPassword;