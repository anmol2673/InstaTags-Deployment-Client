import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Design/Loginpage.css';

function LoginPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  }, [navigate]);
  
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
try{

  let result = await fetch('http://localhost:9000/login', {
    method: 'post',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  result = await result.json();
  console.log(result);
  if (result.success) { // Check the success field
    localStorage.setItem("user", JSON.stringify(result.user));
    navigate('/'); // Navigate to the homepage or dashboard
  } else {
    // Handle login failure (e.g., show an error message)
    alert('Login failed: ' + result.message);
  }

}catch(error){
  console.error('Error during login:', error);
    alert('An error occurred during login. Please try again.');

}
   
   
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password'); // Navigate to the forgot password page
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUserName(e.target.value)} placeholder='Enter your username' />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' />
        </div>
        <button type="submit" onClick={handleLogin} className="submit-button">Login</button>
        <button onClick={handleForgotPassword} className="forgot-password-button">Forgot Password?</button>
      </div>
    </div>
  );
}

export default LoginPage;
