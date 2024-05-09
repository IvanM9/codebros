import React, { useState, useEffect } from 'react';
import logoImage from '../assets/original-removebg-preview.png';

const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];

const SingPages: React.FC = () => {
  const [colorIndex, setColorIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${colors[colorIndex]}`}>
      <div className={`fixed top-0 left-0 m-4 p-2 rounded-full ${colors[colorIndex]}`}>
        <img src={logoImage} alt="Logo" className="h-12" />
      </div>
      <div className="text-center">
        <h1 className="text-white text-4xl font-bold mb-8">¿Quién eres?</h1>
        <div>
          <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 mr-4">
            Gerente
          </button>
          <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200">
            Desarrollador
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingPages;