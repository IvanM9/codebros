import React from 'react';
import logoImage from '../assets/enmedio-removebg-preview.png';

const Logo: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 m-4">
      <img src={logoImage} alt="Logo" className="h-12" />
    </div>
  );
};

export default Logo;