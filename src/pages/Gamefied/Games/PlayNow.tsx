import React, { useEffect, useState } from "react";

interface PlayNowProps {
    isVisible: boolean;
}

const PlayNow: React.FC<PlayNowProps> = ({ isVisible }) => {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setTextVisible(true), 300);
    }
  }, [isVisible]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black transition-opacity duration-700 z-50 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <h1
        className={`text-6xl md:text-8xl font-extrabold text-white transform transition-all duration-700 ${
          textVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        PLAY NOW!
      </h1>
    </div>
  );
};

export default PlayNow;
