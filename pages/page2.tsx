import React from 'react'
import Link from 'next/link'
import { GetServerSideProps } from 'next'

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

interface Page2Props {
  users: User[];
  error?: string;
}

export default function Page2({ users, error }: Page2Props) {
  const getAvatarUrl = (userId: number) => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`;
  };

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">🛍️ Módulo 2 - Sistema de E-commerce</h2>

        <div className="space-y-4">
          <div className="flex gap-4 justify-center items-center">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
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
              className="px-4 py-2 rounded-lg font-medium transition-colors bg-red-600 text-white"
            >
              Página 2
            </Link>
          </div>

          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>❌ Erro:</strong> {error}
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
              href="/"
              className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Home
            </Link>
            <Link
              href="/page1"
              className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700"
            >
              Página 1
            </Link>
            <Link
              href="/page2"
              className="px-4 py-2 rounded-lg font-medium transition-colors bg-red-600 text-gray-700 hover:bg-gray-200"
            >
              Página 2
            </Link>
          </div>
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
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    console.log('🔄 [SSR] Executando getServerSideProps para Page2 no servidor');
    const response = await fetch('https://fakestoreapi.com/users?limit=6');

    if (!response.ok) {
      throw new Error('Falha ao carregar usuários');
    }

    const users = await response.json();
    console.log(`✅ [SSR] Usuários carregados com sucesso: ${users.length} itens`);

    return {
      props: {
        users,
      },
    };
  } catch (error) {
    console.error('❌ [SSR] Erro ao carregar usuários:', error);
    return {
      props: {
        users: [],
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      },
    };
  }
};
