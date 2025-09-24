import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user, setUser, showNotif }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    if (showNotif) showNotif("Logged Out Successfully!");
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      
      <div className="nav-left">
        <img src="/lms-logo.png" alt="logo" className="logo" />
        <span className="lms-name">Learning Dashboard</span>
      </div>

      {user && (
        <div className="nav-right">
          <Link to="/">Home</Link>
          <Link to="/assignments">Assignments</Link> 
          <Link to="/about">About</Link>
          <div className="dropdown">
            <span className="dropdown-btn">🔔</span>
           <div className="dropdown-menu" style={{ maxHeight: '300px', overflowY: 'auto', padding: '10px' }}>
  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
    <li style={{ padding: '8px 0', borderBottom: '1px solid #877d7dff' }}>
      <strong>New Course:</strong> Advanced Mathematics now available!
    </li>
    <li style={{ padding: '8px 0', borderBottom: '1px solid #877d7dff' }}>
      <strong>Exam Date:</strong> Physics midterm on 2025-10-01.
    </li>
    <li style={{ padding: '8px 0', borderBottom: '1px solid #877d7dff' }}>
      <strong>Reminder:</strong> Submit Chemistry assignment by 2025-09-30.
    </li>
    <li style={{ padding: '8px 0', borderBottom: '1px solid #877d7dff' }}>
      <strong>New Course:</strong> Introduction to Machine Learning added.
    </li>
    <li style={{ padding: '8px 0', borderBottom: '1px solid #877d7dff' }}>
      <strong>Exam Date:</strong> Biology final exam on 2025-12-15.
    </li>
    <li style={{ padding: '8px 0', borderBottom: '1px solid #877d7dff' }}>
      <strong>Update:</strong> Physics Lab sessions rescheduled.
    </li>
    <li style={{ padding: '8px 0', borderBottom: '1px solid #877d7dff' }}>
      <strong>New Material:</strong> Download latest Chemistry PDF.
    </li>
    <li style={{ padding: '8px 0' }}>
      <strong>Event:</strong> Live Q&A on upcoming exams this Friday.
    </li>
  </ul>
</div>
          </div>
          <div className="dropdown">
            <span className="dropdown-btn">🙍‍♂️</span>
            <div className="dropdown-menu">
              <Link to="/profile">View Profile</Link>
              <button onClick={handleLogout} className="dropdown-logout-btn">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
