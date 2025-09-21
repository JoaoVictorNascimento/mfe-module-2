import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';

const Module2Router: React.FC = () => {
  const location = useLocation();

  return (
    <div className="space-y-4">
      {/* Navegação interna do módulo */}
      <div className="flex gap-4 justify-center">
        <Link 
          to="/module2/page1" 
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            location.pathname === '/module2/page1' 
              ? 'bg-red-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Página 1
        </Link>
        <Link 
          to="/module2/page2" 
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            location.pathname === '/module2/page2' 
              ? 'bg-red-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Página 2
        </Link>
      </div>

      {/* Rotas internas */}
      <Routes>
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/" element={
          <div className="bg-gradient-to-r from-red-500 to-yellow-300 text-white p-8 rounded-lg shadow-lg text-center w-full">
            <h1 className="text-2xl font-bold">Módulo 2 - Home</h1>
            <p className="mt-2">Selecione uma página acima para navegar</p>
          </div>
        } />
      </Routes>
    </div>
  );
};

export default Module2Router;
