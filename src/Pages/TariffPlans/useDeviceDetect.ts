import React, { useState, useEffect } from 'react';

const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile };
};

export default useDeviceDetect;