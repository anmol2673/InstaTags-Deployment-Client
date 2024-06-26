import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../Design/Navbar.css';
import LoginPage from './LoginPage';


const Navbar = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login', { replace: true });
    alert('Logged out successfully.');
  };

  return (
    <nav>
      <NavLink to="/" className="title">Rage AI</NavLink>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/new-caption">New Caption</NavLink></li>
        <li><NavLink to="/settings">Settings</NavLink></li>
        <li>{localStorage.getItem('authToken') ? <NavLink onClick={handleLogout} to="/login">Logout</NavLink> : <NavLink to="/login">Login</NavLink>}</li>
      </ul>
    </nav>
  );
}

export default Navbar;
