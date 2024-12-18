import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import "./home.css";

function ImageGenerator({ onGenerateImages, imagesData }) {
  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [displayState, setDisplayState] = useState("");
  const [numImages, setNumImages] = useState(1);

  // Handles file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
    }
  };

  // Handles input value changes
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Handles state update on button click
  const handleSubmit = () => {
    // Save either image, text or both in the state
    setDisplayState(
      selectedImage ? `Image Uploaded + Text: ${inputText}` : inputText
    );
    handleGenerate();
  };

  const handleSelectChange = (e) => {
    setNumImages(Number(e.target.value));
  };

  const handleGenerate = async () => {
    const payload = {
      prompt: inputText,
      no_of_images: parseInt(numImages, 4),
    };

    try {
      const response = await fetch(
        "https://trial-420028077470.us-central1.run.app/getimage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        onGenerateImages(data);
      } else {
        console.error("Error generating images:", data.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div id="home">
      {/* <div className="color-box"></div> */}
      <div className="image-generator-container">
        {/* Full Scaled Image Section */}
        <div className="image-preview">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Uploaded Preview"
              className="uploaded-image"
            />
          ) : (
            <div className="no-image">
              <span>No Image Uploaded</span>
            </div>
          )}
        </div>

        {/* Input Field Section */}
        <div className="inputs">
          <input
            type="text"
            placeholder="Generate Image"
            value={inputText}
            onChange={handleInputChange}
            className="input-text"
          />

          {/* Image Upload Section */}
          <div className="file-upload">
            <label for="image_upload">
              <BiImageAdd className="image-icon" />
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="image-input"
              id="image_upload"
            />
          </div>

          {/* Submit Button */}
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>

          <div className="select-number">
            <p>Number of images</p>
            <select
              value={numImages}
              onChange={handleSelectChange}
              className="select"
            >
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Display the state under the button */}

        <div className="display-state">
          {displayState && <p>State: {displayState}</p>}
        </div>
      </div>
    </div>
  );
}

export default ImageGenerator;
