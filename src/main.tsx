import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './providers/theme-provider.tsx';
import Error from './routes/error.tsx';
import { StepsProvider } from './providers/steps-provider.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <StepsProvider steps={4}>
        <RouterProvider router={router} />
      </StepsProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
