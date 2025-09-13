import React, { useEffect, useRef } from 'react';

const GlobalSpotlight = () => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (spotlightRef.current) {
        const { clientX, clientY } = e;
        spotlightRef.current.style.background = `radial-gradient(600px at ${clientX}px ${clientY}px, rgba(59, 130, 246, 0.1), transparent 80%)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed inset-0 z-30 transition duration-300"
    />
  );
};

export default GlobalSpotlight;