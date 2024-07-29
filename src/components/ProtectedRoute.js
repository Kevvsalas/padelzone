import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PinModal from './PinModal';
import useOnce from '../hooks/useOnce'; // Asegúrate de que la ruta es correcta

const ProtectedRoute = ({ element }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useOnce(() => {
    // Aquí colocas cualquier lógica que necesites ejecutar solo una vez
    // Esto se ejecutará solo al montar el componente
    console.log('ProtectedRoute montado por primera vez');
    // Puedes realizar una verificación inicial de autorización aquí si es necesario
  });

  const handlePinSubmit = (pin) => {
    if (pin === '1234') {
      setIsAuthorized(true);
    } else {
      alert('PIN incorrecto');
    }
  };

  // Mostrar el modal solo si no está autorizado
  if (!isAuthorized) {
    return <PinModal onSubmit={handlePinSubmit} onClose={() => navigate('/')} />;
  }

  // Renderizar el elemento protegido si está autorizado
  return element;
};

export default ProtectedRoute;
