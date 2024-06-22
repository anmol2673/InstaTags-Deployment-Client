import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Design/forgetpassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Enter OTP and New Password
  const navigate = useNavigate();

  const handleSendOtp = async (event) => {
    event.preventDefault();

    const result = await fetch('http://localhost:9000/forget-password', {
      method: 'post',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (result.ok) {
      setStep(2); // Move to the next step
    } else {
      console.error('Error sending OTP');
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    const result = await fetch('http://localhost:9000/reset-password', {
      method: 'post',
      body: JSON.stringify({ email, otp, newPassword }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (result.ok) {
      alert("Password Reset Successfully");
      navigate('/login'); // Navigate back to login page
    } else {
      console.error('Error resetting password');
    }
  };

  return (
    <div className="container">
      {step === 1 ? (
        <div className="form-container">
          <h2 className="form-title">Forgot Password</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />
          </div>
          <button type="submit" onClick={handleSendOtp} className="submit-button">Send OTP</button>
        </div>
      ) : (
        <div className="form-container">
          <h2 className="form-title">Reset Password</h2>
          <div className="form-group">
            <label htmlFor="otp">OTP:</label>
            <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='Enter the OTP' />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='Enter your new password' />
          </div>
          <button type="submit" onClick={handleResetPassword} className="submit-button">Reset Password</button>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
