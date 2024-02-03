import React from 'react';
import preloader from '../../../public/svg/hourglass.svg';
import './Preloader.css';

function Preloader() {
  return (
    <img className="preloader" src={preloader} alt="preloader" />
  );
}

export default Preloader;
