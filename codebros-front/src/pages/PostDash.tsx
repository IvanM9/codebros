import React, { useState, useEffect } from 'react';
import logoImg from '../assets/original-removebg-preview.png';

const colores = [
  'bg-red-200',
  'bg-green-200',
  'bg-blue-200',
  'bg-yellow-200',
  'bg-purple-200',
  'bg-pink-200',
];

const PostDash = () => {
  const [colorActual, setColorActual] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorActual((prevColor) => (prevColor + 1) % colores.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center ${colores[colorActual]}`}>
      <div className="animate-spin-slow">
        <img src={logoImg} alt="Logo" className="h-32 mb-8" />
      </div>
      <h1 className="text-2xl font-bold mb-4">¡CODEBROS te da las gracias por llenar el formulario!</h1>
      <p className="text-lg">Tu información ha sido recibida correctamente.</p>
    </div>
  );
};

export default PostDash;
