// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
  return (
    <div className='App'>
      <SettingsProvider> {/* Wrap the whole app with SettingsProvider */}
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<HomePage />} />
            <Route element={<PrivateComponent />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/new-caption" element={<NewCaption />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </SettingsProvider>
    </div>
  );
}

export default App;
