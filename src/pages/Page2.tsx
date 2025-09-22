import React from 'react';
import { useLoader } from '@modern-js/runtime';
import { loader } from './Page2.data';
import '../styles.css';

interface CartItem {
  productId: number;
  quantity: number;
}

interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartItem[];
}

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface LoaderData {
  carts: Cart[];
  products: { [key: number]: Product };
  error?: string;
}

const Page2: React.FC = () => {
  const { data, error } = useLoader<LoaderData>(loader);
  const carts = data?.carts || [];
  const products = data?.products || {};
  const loading = !carts.length && !error;

  const calculateCartTotal = (cart: Cart) => {
    return cart.products.reduce((total, item) => {
      const product = products[item.productId];
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const getTotalItems = (cart: Cart) => {
    return cart.products.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-purple-500 to-red-500 text-white p-8 rounded-lg shadow-lg text-center w-full">
        <h1 className="text-2xl font-bold">Módulo 2 - Carrinhos</h1>
        <p className="mt-4">Carregando carrinhos de compras...</p>
        <div className="mt-4 animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-8 rounded-lg shadow-lg text-center w-full">
        <h1 className="text-2xl font-bold">Erro</h1>
        <p className="mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-red-500 text-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold">Módulo 2 - Carrinhos de Compras</h1>
        <p className="mt-2">Carrinhos carregados via FakeStore API com SSR</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {carts.map((cart: Cart) => (
          <div key={cart.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                  🛒 Carrinho #{cart.id}
                </h3>
                <span className="text-sm text-gray-600">
                  Usuário #{cart.userId}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                📅 {new Date(cart.date).toLocaleDateString('pt-BR')}
              </p>
            </div>
            
            <div className="p-4">
              <div className="space-y-3 mb-4">
                {cart.products.map((item: CartItem, index: number) => {
                  const product = products[item.productId];
                  return (
                    <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                      {product ? (
                        <>
                          <div className="w-12 h-12 bg-white rounded overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {product.title}
                            </p>
                            <p className="text-sm text-gray-600">
                              ${product.price.toFixed(2)} x {item.quantity}
                            </p>
                          </div>
                          <div className="text-sm font-semibold text-purple-600">
                            ${(product.price * item.quantity).toFixed(2)}
                          </div>
                        </>
                      ) : (
                        <div className="flex-1 text-sm text-gray-500">
                          Produto #{item.productId} (Qtd: {item.quantity})
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Total de itens:</span>
                  <span className="font-medium">{getTotalItems(cart)}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="font-bold text-purple-600">
                    ${calculateCartTotal(cart).toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors">
                Ver Detalhes do Carrinho
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo Geral</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{carts.length}</div>
            <div>Carrinhos Ativos</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {carts.reduce((total: number, cart: Cart) => total + getTotalItems(cart), 0)}
            </div>
            <div>Total de Itens</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              ${carts.reduce((total: number, cart: Cart) => total + calculateCartTotal(cart), 0).toFixed(2)}
            </div>
            <div>Valor Total</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;
