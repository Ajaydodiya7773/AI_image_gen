import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faShareAlt, faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import './Images.css';

import imgs from "./images/2859885.jpg";
import imgs1 from "./images/download (1).jpg";
import imgs2 from "./images/download (2).jpg";
import imgs3 from "./images/download (3).jpg";
import imgs4 from "./images/panda.jpeg";
import imgs5 from "./images/output.jpg";
import imgs6 from "./images/download (5).jpg";
import imgs7 from "./images/download (4).jpg";
import imgs8 from "./images/preview.webp";
import imgs9 from "./images/preview (8).webp";

const initialImages = [
  { id: 1, url: imgs, likes: 0, comments: [] },
  { id: 2, url: imgs1, likes: 0, comments: [] },
  { id: 3, url: imgs2, likes: 0, comments: [] },
  { id: 4, url: imgs3, likes: 0, comments: [] },
  { id: 5, url: imgs4, likes: 0, comments: [] },
  { id: 6, url: imgs5, likes: 0, comments: [] },
  { id: 7, url: imgs6, likes: 0, comments: [] },
  { id: 8, url: imgs7, likes: 0, comments: [] },
  { id: 9, url: imgs8, likes: 0, comments: [] },
  { id: 10, url: imgs9, likes: 0, comments: [] },
  // Add more images as needed
];

function Images() {
  const [images, setImages] = useState(initialImages);
  const [commentText, setCommentText] = useState('');

  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.substring(url.lastIndexOf('/') + 1);
    link.click();
  };

  const handleShare = async (url, event) => {
    event.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this image',
          url: url,
        });
        console.log('Image shared successfully');
      } catch (error) {
        console.error('Error sharing image:', error);
      }
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  const handleLike = (id, event) => {
    event.stopPropagation();
    const updatedImages = images.map((image) =>
      image.id === id ? { ...image, likes: image.likes + 1 } : image
    );
    setImages(updatedImages);
  };

  const handleComment = (id, event) => {
    event.stopPropagation();
    if (commentText.trim()) {
      const updatedImages = images.map((image) =>
        image.id === id
          ? { ...image, comments: [...image.comments, commentText] }
          : image
      );
      setImages(updatedImages);
      setCommentText('');
    }
  };

  return (
    <div className="image-gallery">
      {images.map((image) => (
        <div key={image.id} className="image-item">
          <img src={image.url} alt='/' />
          <div className="overlay">
            <div className="image-actions">
              <button onClick={() => handleDownload(image.url)}>
                <FontAwesomeIcon icon={faDownload} />
              </button>
              <button onClick={(event) => handleShare(image.url, event)}>
                <FontAwesomeIcon icon={faShareAlt} />
              </button>
            </div>
            <div className="like-comment">
              <button onClick={(event) => handleLike(image.id, event)}>
                <FontAwesomeIcon icon={faThumbsUp} />
                <span>{image.likes}</span>
              </button>
              <div className="comment-section">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment"
                />
                <button onClick={(event) => handleComment(image.id, event)}>
                  <FontAwesomeIcon icon={faComment} />
                </button>
              </div>
              <div className="comments">
                {image.comments.map((comment, index) => (
                  <div key={index} className="comment">
                    {comment}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Images;
