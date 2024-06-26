import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Pages/Navbar';
import HomePage from './Components/Pages/HomePage';
import Dashboard from './Components/Pages/Dashboard';
import LoginPage from './Components/Pages/LoginPage';
import NewCaption from './Components/Pages/NewCaption';
import Settings from './Components/Pages/Settings';
import Logout from './Components/Pages/Logout';
import Footer from './Components/Pages/Footer';
import PrivateComponent from './Components/PrivateComponent';
import ForgotPassword from './Components/Pages/ForgetPassword';
import { SettingsProvider } from './Components/Pages/SettingsContext'; // Import the provider

function App() {
  // State to track user authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Ensure 'authToken' is set correctly during login
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };
  
  return (
    <div className='App'>
      <SettingsProvider> {/* Wrap the whole app with SettingsProvider */}
        <BrowserRouter>
          {isAuthenticated && <Navbar />}
          <Routes>
            <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
            <Route element={<PrivateComponent isAuthenticated={isAuthenticated} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/new-caption" element={<NewCaption />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
            </Route>
            {/* Redirect any unknown routes to the login page */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          {isAuthenticated && <Footer />}
        </BrowserRouter>
      </SettingsProvider>
    </div>
  );
}

export default App;
