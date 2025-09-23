import React from 'react';
import Link from 'next/link';

export default function Module2Home() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">🛍️ Módulo 2 - Sistema de E-commerce</h2>
      
      <div className="space-y-4">
        <div className="flex gap-4 justify-center items-center">
          <Link 
            href="/" 
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-red-600 text-white"
          >
            Home
          </Link>
          <Link 
            href="/page1" 
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Página 1
          </Link>
          <Link 
            href="/page2" 
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Página 2
          </Link>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-yellow-300 text-white p-8 rounded-lg shadow-lg text-center w-full">
          <h1 className="text-2xl font-bold">Módulo 2 - Home</h1>
          <p className="mt-2">Selecione uma página acima para navegar</p>
        </div>
      </div>
    </div>
  );
}
