import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Design/homepage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className='home-page'>
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Welcome to RageOpenAI</h1>
          <br />
          <p>Your one-stop solution for creative content generation!</p>
          <br />
          <button className="cta-button" onClick={handleStarted}>Get Started</button>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="features">
        <div className="feature">
          <h2>Generate Quality Content</h2>
          <p>Quickly generate high-quality content for various purposes.</p>
        </div>
        <div className="feature">
          <h2>Customize Your Content</h2>
          <p>Customize content generation based on your preferences and needs.</p>
        </div>
        <div className="feature">
          <h2>Save & Edit Your Creations</h2>
          <p>Save your generated content and easily edit them for perfection.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial">
          <p>"This platform has revolutionized the way I create content. Highly recommended!"</p>
          <span>- John Doe</span>
        </div>
        <div className="testimonial">
          <p>"I'm amazed by the quality and speed of content generation here. Great job!"</p>
          <span>- Jane Smith</span>
        </div>
      </section>

     
    </div>
  );
}

export default HomePage;
