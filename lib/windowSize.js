import React, { useState, useEffect } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(8);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1024 || window.innerWidth == 1024) {
        setWindowSize(60);
      }

      if (window.innerWidth < 800 || window.innerWidth == 800) {
        setWindowSize(10);
      }
      if (window.innerWidth < 400) {
        setWindowSize(4);
      }
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
