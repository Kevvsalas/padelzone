import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Asegúrate de que el archivo CSS existe
import App from './App';
import { TorneoProvider } from './torneoContext'; // Asegúrate de que la ruta sea correcta
import reportWebVitals from './reportWebVitals'; // Opcional, solo si usas reportWebVitals

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <TorneoProvider>
    <App />
  </TorneoProvider>
);

// Opcional: si estás usando reportWebVitals
reportWebVitals();
