import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import logoImage from '../assets/original-removebg-preview.png';
import presentationImage from '../assets/enmedio-removebg-preview.png';

const colors = ['bg-red-200', 'bg-green-200', 'bg-blue-200', 'bg-yellow-200', 'bg-purple-200', 'bg-pink-200'];

const ColorChangingBackground: React.FC = () => {
  const [colorIndex, setColorIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${colors[colorIndex]}`}>
      <div className={`fixed top-0 left-0 m-4 p-2 rounded-full ${colors[colorIndex]}`}>
        <img src={logoImage} alt="Logo" className="h-12" />
      </div>
      <Link href="/login">
        <div className="fixed top-0 right-0 m-4 flex items-center">
          <p className="text-black mr-4">Te invitamos a registrarte</p>
          <button className="bg-black text-white px-4 py-2 shadow-grey-500/40 rounded-md hover:bg-gray-200" type='button'>
            login
          </button>
        </div>
      </Link>
      <div className="flex items-center">
        <img
          src={presentationImage}
          alt="Presentación"
          className={`h-64 transition-transform ${isHovered ? 'rotate-180' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <div className="ml-8 text-center">
          <h1 className="text-black text-4xl font-bold mb-4">HAZ QUE LOS MEJORES </h1>
          <h1 className="text-black text-4xl font-bold mb-4">RECLUTADORES TE ENCUENTRE  </h1>

          <p className="text-black text-lg">pipipipipipipipi</p>
          <Link href="/register">
            <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-200 mt-4">
              registrarme 
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ColorChangingBackground;



