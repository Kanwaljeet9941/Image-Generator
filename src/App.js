import ImageGenerator from "./Components/home/home";
import ImageGrid from "./Components/generated/imageGrid";
import Navbar from "./Components/nav/nav";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
export default function App() {
  const [generatedImages, setGeneratedImages] = useState([]);

  function generateImages(data) {
    setGeneratedImages(data.images);
  }
  return (
    <BrowserRouter>
      <Navbar />
      <ImageGenerator
        onGenerateImages={generateImages}
        imagesData={generateImages}
      />
      <ImageGrid generatedImages={generatedImages} />
    </BrowserRouter>
  );
}
