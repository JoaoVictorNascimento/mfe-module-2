import { appTools, defineConfig } from '@modern-js/app-tools';

export default defineConfig({
  plugins: [
    appTools({
      bundler: 'rspack',
    }),
  ],
  runtime: {
    router: true,
  },
  source: {
    entries: {
      app: './src/App.tsx',
    },
  },
  server: {
    ssr: true,
    port: 3002,
  },
  tools: {
    rspack: {
      plugins: [
        new (require('@rspack/core').ModuleFederationPlugin)({
          name: 'mfe_module_2',
          filename: 'remoteEntry.js',
          exposes: {
            './routes': './src/routes.tsx',
            './App': './src/App.tsx'
          },
          shared: {
            react: { singleton: true },
            'react-dom': { singleton: true }
          }
        })
      ]
    },
    tailwindcss: {},
  },
});
