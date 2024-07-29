import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './auth.module.css';

const AuthPage = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === '1234') {
      localStorage.setItem('isAuthorized', 'true');
      navigate('/config');
    } else {
      setError('PIN incorrecto');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Ingrese PIN</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="PIN"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Aceptar</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default AuthPage;
