import React, { useState } from 'react';
import axios from 'axios';

export default function Auth({ onAuth, showNotif, navigate }) {
  const [isSignup, setIsSignup] = useState(true);
  const [form, setForm] = useState({
    name: '',
    organization: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');

  const isStrongPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignup) {
        if (!isStrongPassword(form.password)) {
          setError('Password must be 8+ chars, include uppercase, number, special char');
          return;
        }
        const res = await axios.post('http://localhost:3001/api/users/register', form);
        if (res.data) {
          onAuth(res.data);
          showNotif("Successfully Signed Up!");
          navigate("/");
        }
      } else {
        const res = await axios.post('http://localhost:3001/api/users/login', {
          email: form.email,
          password: form.password,
        });
        if (res.data) {
          onAuth(res.data);
          showNotif("Successfully Signed In!");
          navigate("/");
        } else {
          setError('Invalid credentials');
        }
      }
    } catch {
      setError('Failed to process request');
    }
  };

  return (
    <div className="auth-background">
      <div className="auth-card">
        <div className="auth-toggle">
          <button
            className={`toggle-btn ${!isSignup ? 'active' : ''}`}
            onClick={() => setIsSignup(false)}
          >
            Sign In
          </button>
          <button
            className={`toggle-btn ${isSignup ? 'active' : ''}`}
            onClick={() => setIsSignup(true)}
          >
            Sign Up
          </button>
        </div>
        <h2 className="auth-title">{isSignup ? 'Sign Up' : 'Sign In'}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignup && (
            <>
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                name="organization"
                placeholder="Organization"
                value={form.organization}
                onChange={handleChange}
                required
              />
              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </>
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {error && <div className="error-msg">{error}</div>}
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}
