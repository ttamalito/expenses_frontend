import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-datatable/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import theme from './theme.ts';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { Notifications } from '@mantine/notifications';

createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme}>
    <StrictMode>
      <BrowserRouter>
        <Suspense fallback={<div>Loading</div>}>
          <Notifications />
          {/* Notifications Component needs to be rendered once in the application */}
          <App />
        </Suspense>
      </BrowserRouter>
    </StrictMode>
  </MantineProvider>,
);
