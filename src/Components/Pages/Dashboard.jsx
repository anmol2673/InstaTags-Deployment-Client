import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Design/dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [savedWriteTopics, setSavedWriteTopics] = useState([]); // State to store fetched images and their data
  const [selectedImage, setSelectedImage] = useState(null); // State to track selected image
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch saved images and their data from the server
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/images'); // Fetch data from the server
        setSavedWriteTopics(response.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages(); // Call the fetchImages function when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleGenerate = () => {
    navigate('/new-caption');
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleViewClose = () => {
    setSelectedImage(null);
  };

  // Function to render images
  const renderImages = () => {
    return savedWriteTopics.map((topic, index) => (
      <div key={index} className="image-container">
        <img
          src={topic.imageUrl}
          alt={`Image ${index}`}
          className="thumbnail"
          onClick={() => handleImageClick(topic)}
        />
        <button className="view-button" onClick={() => handleImageClick(topic)}>
          View
        </button>
      </div>
    ));
  };

  // Function to render popup content when an image is selected
  const renderPopupContent = () => {
    if (!selectedImage) return null;

    return (
      <div className="popup-content">
        <img src={selectedImage.imageUrl} alt="Selected" className="selected-image" />
        <div className="image-data">
          <h3>Description</h3>
          <p>{selectedImage.description}</p>
        </div>
        <button className="close-button" onClick={handleViewClose}>
          Close
        </button>
      </div>
    );
  };

  return (
    <div className='dashboard-container'>
      <div className='generate'>
        <button id='generate-btn' onClick={handleGenerate}>+ Write New Caption</button>
      </div>
      <div className='table-container'>
        <div className="image-list">
          {renderImages()}
        </div>
        {selectedImage && (
          <div className="popup">
            {renderPopupContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
