import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirebaseExample from './Pages/form.page';
import Config from './Pages/config.page';
import ProtectedRoute from './components/ProtectedRoute'; // Asegúrate de que la ruta sea correcta

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirebaseExample />} />
        <Route 
          path="/config" 
          element={<ProtectedRoute element={<Config />} />} 
        />
      </Routes>
    </Router>
  );
};
