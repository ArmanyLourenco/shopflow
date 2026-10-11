import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './styles.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

const theme = createTheme({ primaryColor: 'violet', fontFamily: 'Inter, system-ui, sans-serif', defaultRadius: 'md', headings: { fontFamily: 'Inter, system-ui, sans-serif' } });
const basename = import.meta.env.PROD ? import.meta.env.BASE_URL.replace(/\/$/, '') : '/';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><MantineProvider theme={theme} defaultColorScheme="dark"><Notifications position="top-right" /><BrowserRouter basename={basename}><AuthProvider><CartProvider><App /></CartProvider></AuthProvider></BrowserRouter></MantineProvider></React.StrictMode>
);