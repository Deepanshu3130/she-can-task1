import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import Leaderboard from './Components/Leaderboard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = '/'; // Force refresh to update Navbar
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/signup" 
          element={user ? <Navigate to="/dashboard" /> : <Signup onLogin={handleLogin} />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/leaderboard" 
          element={user ? <Leaderboard /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;