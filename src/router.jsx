import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirebaseExample from './Pages/form.page';
import Config from './Pages/config.page';
import AuthPage from './Pages/AuthPage';
import ProtectedRoute from './ProtectedRoute';

export const AppRoutes = () => {


  return (

      <Router>
        <Routes>
          <Route path="/" element={<FirebaseExample/>} />
          <Route path="/home" element={<AuthPage />} />
          <Route path="/config" element={<ProtectedRoute element={<Config />} />} />
        </Routes>
      </Router>
  );
};
