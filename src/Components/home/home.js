import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import "./home.css";

function ImageGenerator({ onGenerateImages }) {
  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [numImages, setNumImages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handles file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
    }
  };

  // Handles text input value changes
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Handles number of images selection
  const handleSelectChange = (e) => {
    setNumImages(Number(e.target.value));
  };

  // Handles the image generation request
  const handleGenerate = async () => {
    if (!inputText) {
      setError("Please provide a text prompt.");
      return;
    }
    setError(null);
    setLoading(true);

    const payload = {
      prompt: inputText,
      no_of_images: numImages,
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
      if (response.ok) {
        onGenerateImages(data.images); // Pass generated images to the parent
        setLoading(false);
      } else {
        throw new Error(data.error || "Failed to generate images.");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.error(err);
    }
  };

  const handleSubmit = () => {
    handleGenerate();
  };

  return (
    <div className="image-generator-container" id="home">
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
          placeholder="Enter prompt"
          value={inputText}
          onChange={handleInputChange}
          className="input-text"
        />

        <div className="file-upload">
          <label htmlFor="image_upload">
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

        <button
          onClick={handleSubmit}
          className="submit-button"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>

        <div className="select-number">
          <p>Number of images:</p>
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

      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default ImageGenerator;
