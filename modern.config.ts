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
  deploy: {
    microFrontend: {
      enableHtmlEntry: true,
      externalBasicLibrary: true,
      moduleApp: 'mfe-module-2',
    },
  },
  tools: {
    tailwindcss: {},
  },
});
