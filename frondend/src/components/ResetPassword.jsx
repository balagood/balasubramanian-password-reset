import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import AlertMessage from "./AlertMessage";

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get(`/verify_token/${token}`).then((res) => setMessage(res.data.message));
  }, [token]);

  const handleReset = async () => {
    const res = await api.post("/reset_password", { token, newPassword });
    setMessage(res.data.message);
  };

  return (
    <>
        <div className="container mt-5">
        <h2>Reset Password</h2>
        {message === "Valid token" ? (
            <>
            <input
                type="password"
                className="form-control"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className="btn btn-success mt-3" onClick={handleReset}>
                Update Password
            </button>
            </>
        ) : (
            <AlertMessage message={message} />
        )}
        </div>
    </>
  );
}

export default ResetPassword;