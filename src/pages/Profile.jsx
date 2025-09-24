import React, { useState } from "react";
import axios from "axios";

export default function Profile({ user, setUser, showNotif, navigate }) {
  const [showChangePwd, setShowChangePwd] = useState(false);
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const isStrongPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleCancel = () => {
    setShowChangePwd(false);
    setOldPwd("");
    setNewPwd("");
    setConfirmPwd("");
    setMsg("");
    setError("");
  };

  const handleUpdate = async () => {
    setMsg("");
    setError("");
    if (!oldPwd || !newPwd || !confirmPwd) {
      setError("All fields are required.");
      return;
    }
    if (newPwd !== confirmPwd) {
      setError("New password and confirm password do not match.");
      return;
    }
    if (!isStrongPassword(newPwd)) {
      setError("Password must be 8+ chars, include uppercase, number, special char.");
      return;
    }
    try {
      const verify = await axios.post("http://localhost:3001/api/users/login", {
        email: user.email,
        password: oldPwd,
      });
      if (!verify.data) {
        setError("Old password is incorrect.");
        return;
      }
      await axios.put(`http://localhost:3001/api/users/${user.id}/password`, {
        password: newPwd,
      });
      setMsg("Password updated successfully.");
      setShowChangePwd(false);
      setOldPwd("");
      setNewPwd("");
      setConfirmPwd("");
      if (showNotif) showNotif("Password updated successfully!");
      if (navigate) navigate("/");
    } catch {
      setError("Failed to update password. Try again.");
    }
  };

  return (
    <div>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
        }

        .profile-page {
          min-height: 100vh;
          background-image: url("/profile.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .overlay {
          background: rgba(255, 255, 255, 0.92);
          border-radius: 16px;
          padding: 2rem;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 6px 24px rgba(0,0,0,0.2);
        }

        .profile-page h2 {
          text-align: center;
          font-size: 2rem;
          color: #0077b6;
          margin-bottom: 1.5rem;
        }

        .profile-card {
          background: #fdfdfd;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          margin-bottom: 1.5rem;
        }

        .profile-card p {
          margin: 8px 0;
          font-size: 1rem;
          color: #333;
        }

        .profile-label {
          font-weight: 600;
          color: #0077b6;
        }

        button {
          background-color: #0077b6;
          color: #fff;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          margin-top: 10px;
          transition: background 0.2s ease;
        }

        button:hover {
          background-color: #005f8e;
        }

        .change-password-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: #f9f9f9;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
        }

        .change-password-form input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
        }

        .buttons {
          display: flex;
          gap: 10px;
        }

        .success-msg {
          color: #2a9d8f;
          font-weight: 500;
        }

        .error-msg {
          color: #e63946;
          font-weight: 500;
        }

        @media (max-width: 640px) {
          .overlay {
            padding: 1rem;
          }
        }
      `}</style>

      <div className="profile-page">
        <div className="overlay">
          <h2>Profile</h2>

          <div className="profile-card">
            <p><span className="profile-label">👤 Name:</span> {user.name || "N/A"}</p>
            <p><span className="profile-label">🏢 Organization:</span> {user.organization || "N/A"}</p>
            <p><span className="profile-label">📞 Phone:</span> {user.phone || "N/A"}</p>
            <p><span className="profile-label">✉️ Email:</span> {user.email}</p>
          </div>

          {!showChangePwd ? (
            <button onClick={() => setShowChangePwd(true)}>Change Password</button>
          ) : (
            <div className="change-password-form">
              <input
                type="password"
                placeholder="Old Password"
                value={oldPwd}
                onChange={(e) => setOldPwd(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                required
              />
              <div className="buttons">
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
              {msg && <p className="success-msg">{msg}</p>}
              {error && <p className="error-msg">{error}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
