import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './PinModal.module.css'; // Asegúrate de tener estilos adecuados

const PinModal = ({ onSubmit, onClose }) => {
  const [pin, setPin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(pin);
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Ingrese PIN</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="PIN"
          />
          <button type="submit">Aceptar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root') // Asegúrate de que este elemento existe en `index.html`
  );
};

export default PinModal;
