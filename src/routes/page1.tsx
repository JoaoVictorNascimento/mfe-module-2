import React from 'react';
import { useLoader } from '@modern-js/runtime';
import { loader } from './page1.data';
import '../styles.css';

interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}

interface LoaderData {
  users: User[];
  error?: string;
}

const Page1: React.FC = () => {
  const { data, error } = useLoader<LoaderData>(loader);
  const users = data?.users || [];
  const loading = !users.length && !error;

  const getAvatarUrl = (userId: number) => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`;
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-red-500 to-yellow-300 text-white p-8 rounded-lg shadow-lg text-center w-full">
        <h1 className="text-2xl font-bold">Módulo 2 - Usuários</h1>
        <p className="mt-4">Carregando usuários...</p>
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
      <div className="bg-gradient-to-r from-red-500 to-yellow-300 text-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold">Módulo 2 - Lista de Usuários</h1>
        <p className="mt-2">Usuários carregados via FakeStore API com SSR</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user: User) => (
          <div key={user.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={getAvatarUrl(user.id)}
                    alt={`${user.name.firstname} ${user.name.lastname}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {user.name.firstname} {user.name.lastname}
                  </h3>
                  <p className="text-sm text-gray-600">@{user.username}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <span>📧</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🏠</span>
                  <span>{user.address.city}, {user.address.street} {user.address.number}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📮</span>
                  <span>{user.address.zipcode}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors">
                  Ver Perfil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page1;
