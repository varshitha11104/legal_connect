// src/components/FeatureSlider.jsx
import React, { useState, useEffect } from 'react';
import './FeatureSlider.css';

const images = [
  {
    src: '/images/slide_1.png',
    caption: 'Connect with Verified Lawyers Easily',
  },
  {
    src: '/images/slide_2.jpeg',
    caption: 'Read Legal Blogs & Stay Informed',
  },
  {
    src: '/images/slide_3.jpeg',
    caption: 'Ask Questions Publicly or Privately',
  },
];

const FeatureSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider-container">
      <img src={images[current].src} alt="Feature" className="slider-image" />
      <div className="slider-caption">{images[current].caption}</div>
    </div>
  );
};

export default FeatureSlider;
