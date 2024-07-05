import React, { useState, useRef } from "react";
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from "react-share";
import "./ImageGen.css";
import default_image from "../AIimages/images/2859885.jpg";
import loading_image from "../Assets/giphy.gif";

const ImageGen = () => {
  const [imageUrl, setImageUrl] = useState("/");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const query = async (data) => {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/sd-community/sdxl-flash",
        {
          headers: {
            Authorization: "Bearer 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", // Replace with your valid Hugging Face API token
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(
          `Failed to generate image: ${
            errorDetails.error || response.statusText
          }`
        );
      }

      const result = await response.blob();
      return result;
    } catch (error) {
      console.error("Error querying the API:", error);
      throw error;
    }
  };

  const imageGenerator = async () => {
    const prompt = inputRef.current.value;

    if (!prompt) {
      setError("Please enter a prompt.");
      return;
    }

    setLoading(true);
    setError(null);

    const data = {
      inputs: prompt,
    };

    try {
      const response = await query(data);
      const imageUrl = URL.createObjectURL(response);
      setImageUrl(imageUrl);
    } catch (err) {
      setError("Failed to generate image: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = () => {
    alert("Failed to load image.");
    setImageUrl(default_image);
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "generated_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="ai-image-gen">
      {/* <div className="video-bg">
        <video autoPlay muted loop id="bg-video">
          <source
            src="https://videos.pexels.com/video-files/3129957/3129957-sd_640_360_25fps.mp4"
            type="video/mp4"
          />
          Your browser does not support HTML5 video.
        </video>
      </div> */}
      <div className="content">
        <div className="header">
          AI Image<span>Generator</span>
        </div>
        <p>
          This is an AI Image Generator. It creates an image from scratch from a text description.
          <br />
          To get started, type a description of the image into the prompt box located in the side panel.
        </p>
        <div className="image-loading">
          {loading ? (
            <img src={loading_image} alt="Loading" />
          ) : (
            <div className="image">
              <img
                src={imageUrl === "/" ? default_image : imageUrl}
                alt="Generated"
                onError={handleImageError}
              />
            </div>
          )}
        </div>
        <div className="searchBox">
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Create an image from text prompt?"
          />
          <div className="generate-btn" onClick={imageGenerator}>
            Generate
          </div>
        </div>
        {error && <div className="error">{error}</div>}
        {imageUrl !== "/" && (
          <div className="download-share">
            <button onClick={downloadImage}>Download</button>
            <FacebookShareButton url={imageUrl} quote="Check out this generated image!">
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={imageUrl} title="Check out this generated image!">
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
        )}
        <div className="msg">Hello users from Ajay!!</div>
      </div>
    </div>
  );
};

export default ImageGen;
