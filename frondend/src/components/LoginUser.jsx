import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";  
import api from "../services/api";
import AlertMessage from "./AlertMessage";

function LoginUser() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", {email,password});
      setMessage(res.message); 
    } catch (err) {
      //alert(err.response.data.message); // "Invalid user"
      setMessage(err.message);
    }
  };


  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-100">Login</button>
      </form>

      {message && <AlertMessage message={message} />}
      <div className="mt-3 text-center">
        <p>
          Don’t have an account?{" "}
          <Link to="/register" className="text-decoration-none">
            Register here
          </Link>
        </p>
        <p>
          Forgot your password?{" "}
          <Link to="/forgot_password" className="text-decoration-none">
            Reset here
          </Link>
        </p>
      </div>

    </div>
  );
}

export default LoginUser;