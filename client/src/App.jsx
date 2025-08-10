
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './pages/Home';
import Books from './pages/Books';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  const [user, setUser] = useState(null); // track logged-in user

  // Logout function to clear user data and token
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    // Optional: redirect to landing or login page
    window.location.href = '/';
  };

  return (

    <Router>

      <Routes>

        <Route
          path="/admin-dashboard/*"
          element={<AdminDashboard onLogout={handleLogout} />}
        />


        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>

    </Router>
  );
};

export default App;
