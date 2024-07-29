import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const isAuthorized = localStorage.getItem('isAuthorized') === 'true';

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/auth');
    }
  }, [isAuthorized, navigate]);

  return isAuthorized ? element : null;
};

export default ProtectedRoute;
