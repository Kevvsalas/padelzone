import React, { createContext, useState } from 'react';

// Crea el contexto
const TorneoContext = createContext();

const TorneoProvider = ({ children }) => {
  const [torneo, setTorneo] = useState(8);

  const changeTorneo = () => {
    setTorneo( torneo === 8 ? 12 : 8);
  }

  return (
    <TorneoContext.Provider value={{ torneo, changeTorneo }}>
      {children}
    </TorneoContext.Provider>
  );
};

export { TorneoContext, TorneoProvider};
