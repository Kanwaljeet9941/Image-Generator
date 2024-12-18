import React from "react";
import "./imageGrid.css";

function ImageGrid({ images }) {
  return (
    <div className="image-grid-container" id="images">
      {images && images.length > 0 ? (
        images.map((image, index) => (
          <div key={index} className="image-grid-item">
            <img
              src={image}
              alt={`Generated ${index}`}
              className="grid-image"
            />
          </div>
        ))
      ) : (
        <p>No images available. Start generating!</p>
      )}
    </div>
  );
}

export default ImageGrid;
