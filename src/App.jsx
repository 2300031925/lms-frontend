import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Course from './pages/Course';
import Auth from './pages/Auth';
import Assignments from './pages/Assignments';

function App() {
  const [user, setUser] = useState(null);
  const [notif, setNotif] = useState(null);

  const showNotif = (message) => {
    setNotif(message);
    setTimeout(() => setNotif(null), 3000);
  };

  if (!user) {
    return (
      <Router>
        <AuthWrapper onAuth={setUser} showNotif={showNotif} />
      </Router>
    );
  }

  return (
    <Router>
      <Navbar user={user} setUser={setUser} showNotif={showNotif} />
      {notif && <div className="notification">{notif}</div>}
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/profile"
          element={
            <ProfileWrapper
              user={user}
              setUser={setUser}
              showNotif={showNotif}
            />
          }
        />
        <Route path="/courses/:id" element={<Course user={user} />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="*" element={<Navigate to="/" />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

function AuthWrapper({ onAuth, showNotif }) {
  const navigate = useNavigate();
  return <Auth onAuth={onAuth} showNotif={showNotif} navigate={navigate} />;
}

function ProfileWrapper({ user, setUser, showNotif }) {
  const navigate = useNavigate();
  return (
    <Profile user={user} setUser={setUser} showNotif={showNotif} navigate={Profile} />
  );
}

export default App;

