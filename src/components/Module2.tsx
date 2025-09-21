import React from 'react';
import '../styles.css';

interface Module1Props {
  title?: string;
  className?: string;
}

const Module1: React.FC<Module1Props> = ({ 
  title = "Módulo 2", 
  className = "" 
}) => {
  return (
    <div className={`bg-gradient-to-r from-red-500 to-yellow-300 text-white p-8 rounded-lg shadow-lg text-center ${className} w-full`}>
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
};

export default Module1;
