import { useState, useEffect, useMemo } from 'react';

import bg1 from './images/nelson_bg1.jpg';
import bg2 from './images/download.jpg';
import bg3 from './images/nelson_bg3.jpg';
import bg4 from './images/nelson_bg4.webp';

const PhotoBackground = ({ onLoad }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = useMemo(() => [bg1, bg2, bg3, bg4], []);

  useEffect(() => {
    let loadedImagesCount = 0;

    const loadImage = (src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedImagesCount += 1;
        if (loadedImagesCount === images.length) {
          onLoad();
        }
      };
    };

    images.forEach(loadImage);

    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, [images, onLoad]);

  return (
    <div className="photo-background">
      {images.map((img, index) => (
        <div
          key={index}
          className={`background-image ${index === currentImageIndex ? 'active' : ''}`}
          style={{ width: '100%', height: '100vh', backgroundImage: `url(${img})` }}
        ></div>
      ))}
    </div>
  );
};

export default PhotoBackground;