import { Link, useLocation, useNavigate, Outlet } from '@modern-js/runtime/router';
import Page1 from './routes/page1';
import Page2 from './routes/page2';
import { loader as page1Loader } from './routes/page1.data';
import { loader as page2Loader } from './routes/page2.data';

function Module2Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">🛍️ Módulo 2 - Sistema de E-commerce</h2>
      
      <div className="space-y-4">
        <div className="flex gap-4 justify-center items-center">
          <button
            onClick={handleGoBack}
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-red-100 text-red-700 hover:bg-red-200 flex items-center gap-2"
          >
            ← Voltar
          </button>
          <Link 
            to="/module2" 
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              location.pathname === '/module2' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Home
          </Link>
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

        <Outlet />
      </div>
    </div>
  );
}

function Module2Home() {
  return (
    <div className="bg-gradient-to-r from-red-500 to-yellow-300 text-white p-8 rounded-lg shadow-lg text-center w-full">
      <h1 className="text-2xl font-bold">Módulo 2 - Home</h1>
      <p className="mt-2">Selecione uma página acima para navegar</p>
    </div>
  );
}

export const module2Routes = {
  path: "module2",
  element: <Module2Layout />,
  children: [
    {
      index: true,
      element: <Module2Home />
    },
    {
      path: "page1",
      element: <Page1 />,
      loader: page1Loader
    },
    {
      path: "page2",
      element: <Page2 />,
      loader: page2Loader
    }
  ]
};

export { Module2Layout, Module2Home };
