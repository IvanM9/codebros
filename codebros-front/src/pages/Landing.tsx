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
        <img src={logoImage} alt="Logo" className="h-20 w-32" />
      </div>
      <Link href="/login">
        <div className="fixed top-0 right-0 m-4 flex inherits items-center">
          <p className="text-black mr-4"></p>
          <button className=" text-black px-4 py-2 shadow-grey-500/40 italic rounded-md hover:bg-gray-90" type='button'>
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
        <div className="ml-8 text-left">
          <div className="flex flex-col items-start">
            <h1 className="text-black Bauhaus 93 Bauhaus 93 text-4xl font-bold mb-2">HAZ QUE LOS</h1>
            <h1 className="text-black text-4xl font-bold mb-2">MEJORES RECLUTADORES</h1>
            <h1 className="text-black text-4xl font-bold mb-4">TE ENCUENTRE</h1>
          </div>
          
          <Link href="/register">
            <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 mt-4">
              registrate
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ColorChangingBackground;



