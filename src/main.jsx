// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Aquí puedes agregar estilos globales si es necesario

// Selecciona el div donde se montará la aplicación
const rootElement = document.getElementById('root');

// Crea el root de React y renderiza el componente App
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
