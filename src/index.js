import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Asegúrate de que el archivo CSS existe
import App from './App';
import reportWebVitals from './reportWebVitals'; // Opcional, solo si usas reportWebVitals

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <App />
);

// Opcional: si estás usando reportWebVitals
reportWebVitals();
