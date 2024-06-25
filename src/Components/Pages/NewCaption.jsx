// NewContent.js
import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import '../Design/NewCaption.css';
import { SettingsContext } from './SettingsContext'; // Import the context

const NewCaption = () => {

  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  
  const { settings } = useContext(SettingsContext); // Consume the settings context
  const [selectedLanguage, setSelectedLanguage] = useState(settings.language);
  const [numberOfTags, setNumberOfTags] = useState(10);
  const [keywords, setKeywords] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [selectedModel, setSelectedModel] = useState(settings.model); // Use the model from settings
  const [isEditing, setIsEditing] = useState(false);
  const descriptionDivRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');

  const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

  useEffect(() => {
    setSelectedLanguage(settings.language);
    setSelectedModel(settings.model);
  }, [settings.language, settings.model]);


  const handleSave = async () => {
    console.log("inside handle save");
    if (description) {
      try {
        const response = await axios.post(`${apiUrl}/save`, {
          imageUrl: imageUrl,
          description,
        });
        console.log("after try in  handle save");
        console.log('Save response:', response.data);
        alert('Image URL and description saved successfully.');
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while saving the data. Please try again.');
      }
    } else {
      alert('No description to save.');
    }
  };
  
  const handleGenerate = async () => {
    if (!keywords) {
      alert('Keywords are mandatory.');
      return;
    }
  
    if (!imageUrl) {
      alert('Please upload an image first.');
      return;
    }
  
    console.log("before try in handle generate");
    try {
      const generateResponse = await axios.post(`${apiUrl}/api/generate-description`, {
        model: selectedModel,
        imageUrl,
        keywords,
      });
      console.log("after try in handle generate");
      setDescription(generateResponse.data.description);
    } catch (error) {
      console.error('Error generating description:', error);
      alert('An error occurred while generating the description.');
    }
  };
  
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file);
  
    if (!validFileTypes.includes(file.type)) {
      alert("Image should be in jpg/png format.");
      return;
    }
  
    setImage(file);
  
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await fetch(`${apiUrl}/upload`, {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      console.log('Upload response:', data);
  
      if (response.ok) {
        setImageUrl(data.imageUrl); // Assuming the backend sends the image URL back in the response
        alert('Image uploaded successfully.');
      } else {
        alert('Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('An error occurred while uploading the image.');
    }
  };
  
  
  const handleDescriptionChange = (e) => {
    setDescription(e.target.innerText);
  };

  useEffect(() => {
    if (descriptionDivRef.current && !isEditing) {
      descriptionDivRef.current.innerText = description;
    }
  }, [description, isEditing]);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className='new-content'>
      <section className='left-side'>
        <form>
          <h1>Upload Image</h1>
          <div className='upload-image'>
            {imageUrl && <img src={imageUrl} alt="Selected" />}
          </div>
          <div className='upload-button'>
            <input type="file" onChange={handleImageChange} />
          </div>

          <table>
            <tbody>
              <tr>
                <td>Language</td>
                <td>
                  <select 
                    value={selectedLanguage} 
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                  >
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="french">French</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Number of Tags</td>
                <td>
                  <input 
                    type="number" 
                    placeholder="Number of tags" 
                    value={numberOfTags}
                    onChange={(e) => setNumberOfTags(e.target.value)} 
                  />
                </td>
              </tr>
              <tr>
                <td>Keywords <span className="required">*</span></td>
                <td>
                  <input 
                    type="text" 
                    placeholder="Keywords (comma-separated)" 
                    value={keywords} 
                    onChange={(e) => setKeywords(e.target.value)} 
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <div className='action-button'>
          <button type="submit" onClick={handleGenerate}>Generate</button>
        </div>
      </section>
      <section className='right-side-section'>
        <div className="model-dropdown">
          <h2>Select Model</h2>
          <select 
            value={selectedModel} 
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            <option value="gpt-4o">GPT-4o</option>
            <option value="gpt-4-turbo">GPT-4-Turbo</option>
          </select>
        </div>

        {description && (
          <div className='description'>
            <h2>Image Description</h2>
            <div 
              className={`editable-div ${isEditing ? 'editing' : ''}`} 
              contentEditable={isEditing} 
              ref={descriptionDivRef}
              onInput={handleDescriptionChange}
              suppressContentEditableWarning={true}
            >
              {description}
            </div>
            {!isEditing && (
              <button onClick={toggleEditMode} className='edit-button'>
                Edit
              </button>
            )}
            {isEditing && (
              <button onClick={toggleEditMode} className='edit-button'>
                Save
              </button>
            )}
          </div>
        )}

        <div className='action-button'>
          <button onClick={handleSave}>Save</button>
        </div>
      </section>
    </div>
  );
};

export default NewCaption;
