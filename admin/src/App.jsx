import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Admin from './pages/Admin/Admin';
import AdminLogin from './Components/AdminLogin/AdminLogin';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in
    const token = localStorage.getItem('admin-token');
    if (token) {
      // Verify token validity (optional)
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (token) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <Admin />
    </div>
  );
};

export default App;