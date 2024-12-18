import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/nav/nav";
import ImageGenerator from "./Components/home/home";
import ImageGrid from './Components/generated/imageGrid'

export default function App() {
  const [generatedImages, setGeneratedImages] = useState([]);

  function generateImages(images) {
    // Ensure incoming images are appended as an array.
    setGeneratedImages((curr) => [...curr, ...images]);
  }

  return (
    <BrowserRouter>
      <Navbar />
      <ImageGenerator onGenerateImages={generateImages} />
      <ImageGrid images={generatedImages} />
    </BrowserRouter>
  );
}
