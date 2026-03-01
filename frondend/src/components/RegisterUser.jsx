import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import api from "../services/api";
import AlertMessage from "./AlertMessage";

function RegisterUser() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", {formData});
      setMessage(res.message);
      if(res.message == "User created successfully"){setTimeout(() => {navigate("/") }, 1500);}
    } catch (err) {
       setMessage(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="p-3 border rounded">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      {message && <AlertMessage message={message} />}
    </div>
  );
}

export default RegisterUser;