import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoutes } from './router';

import './App.css';

function App() {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  return (
    
    root.render(
      <React.StrictMode>
        <AppRoutes/>
        
      </React.StrictMode>
    )
  );
}

export default App;






