import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirebaseExample from './Pages/form.page';
import Config from './Pages/config.page';
import AuthPage from './Pages/AuthPage';
import ProtectedRoute from './ProtectedRoute';
import { TorneoProvider } from './torneoContext';

export const AppRoutes = () => {


  const [forceRender, setForceRender] = useState(0);

  const triggerRender = () => {
    setForceRender(forceRender + 1);
  }
  return (
    <TorneoProvider>

      <Router>
        <Routes>
          <Route path="/" element={<FirebaseExample forceRender = {forceRender} />} />
          <Route path="/home" element={<AuthPage />} />
          <Route path="/config" element={<ProtectedRoute element={<Config />} />} />
        </Routes>
      </Router>
    </TorneoProvider>
  );
};
