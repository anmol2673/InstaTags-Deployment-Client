import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Pages/Navbar';
import HomePage from './Components/Pages/HomePage';
import Dashboard from './Components/Pages/Dashboard';
import LoginPage from './Components/Pages/LoginPage';
import NewCaption from './Components/Pages/NewCaption';
import Settings from './Components/Pages/Settings';
import Footer from './Components/Pages/Footer';
import PrivateComponent from './Components/PrivateComponent';
import ForgotPassword from './Components/Pages/ForgetPassword';
import { SettingsProvider } from './Components/Pages/SettingsContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <SettingsProvider>
        <BrowserRouter>
          {isAuthenticated && <Navbar onLogout={handleLogout} />}
          <Routes>
            <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
            <Route element={<PrivateComponent isAuthenticated={isAuthenticated} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/new-caption" element={<NewCaption />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          {isAuthenticated && <Footer />}
        </BrowserRouter>
      </SettingsProvider>
    </div>
  );
}

export default App;
