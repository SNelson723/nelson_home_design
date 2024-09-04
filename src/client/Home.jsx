import { useState, useCallback } from 'react';
import PhotoBackground from "./PhotoBackground";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Use useCallback to memoize the onLoad function
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="home-container">
      <PhotoBackground onLoad={handleLoad} />
      {isLoaded && (
        <div className="content-overlay">
          <h2 className="text-black">Nelson Home Design</h2>
        </div>
      )}
    </div>
  );
};

export default Home;