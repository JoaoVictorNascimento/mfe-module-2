import React from 'react'
import Link from 'next/link'

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Server Component que faz SSR internamente
async function getProducts(): Promise<Product[]> {
  try {
    console.log('🔄 [SSR] Executando getProducts no servidor');
    const response = await fetch('https://fakestoreapi.com/products?limit=6', {
      cache: 'no-store' // Sempre buscar dados frescos
    });
    
    if (!response.ok) {
      throw new Error('Falha ao carregar produtos');
    }
    
    const products = await response.json();
    console.log(`✅ [SSR] Produtos carregados com sucesso: ${products.length} itens`);
    return products;
  } catch (error) {
    console.error('❌ [SSR] Erro ao carregar produtos:', error);
    return [];
  }
}

export default async function Module2Page1() {
  const products = await getProducts();
  
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">🛍️ Módulo 2 - Sistema de E-commerce</h2>
        
        <div className="space-y-4">
          <div className="flex gap-4 justify-center items-center">
            <Link 
              href="/module2" 
              className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Home
            </Link>
            <Link 
              href="/module2/page1" 
              className="px-4 py-2 rounded-lg font-medium transition-colors bg-red-600 text-white"
            >
              Página 1
            </Link>
            <Link 
              href="/module2/page2" 
              className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Página 2
            </Link>
          </div>

          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>❌ Erro:</strong> Falha ao carregar produtos
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">🛍️ Módulo 2 - Sistema de E-commerce</h2>
      
      <div className="space-y-4">
        <div className="flex gap-4 justify-center items-center">
          <Link 
            href="/module2" 
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Home
          </Link>
          <Link 
            href="/module2/page1" 
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-red-600 text-white"
          >
            Página 1
          </Link>
          <Link 
            href="/module2/page2" 
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Página 2
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-48 object-contain mb-4 rounded-md" 
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
              <p className="text-gray-600 text-sm flex-grow mb-3">{product.description.substring(0, 100)}...</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xl font-bold text-red-700">${product.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500">
                  ⭐ {product.rating.rate} ({product.rating.count})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
