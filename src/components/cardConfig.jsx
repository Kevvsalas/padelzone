import React, { useState } from 'react';
import styles from './cardConfig.module.css';

const Cardconfig = ({ ronda, players, matchDetails }) => {
  // Inicializa el estado de resultados con dos entradas para cada partido, una por equipo
  const [results, setResults] = useState(
    matchDetails.map(() => ({ team1: '', team2: '' }))
  );

  const getPlayerNames = (indices) => {
    return indices.map(index => players[index] ? players[index].name : 'N/A');
  };

  const handleResultChange = (matchIndex, team, value) => {
    const updatedResults = [...results];
    updatedResults[matchIndex][team] = value;
    setResults(updatedResults);
  };

  const handleFinalizarRonda = () => {
    // Muestra los resultados y la información de los jugadores en consola
    matchDetails.forEach((match, index) => {
      const [team1Player1, team1Player2] = getPlayerNames(match.team1Indices);
      const [team2Player1, team2Player2] = getPlayerNames(match.team2Indices);

      console.log(`Partido ${index + 1}:`);
      console.log(`Equipo 1: ${team1Player1}, ${team1Player2} - Marcador: ${results[index].team1}`);
      console.log(`Equipo 2: ${team2Player1}, ${team2Player2} - Marcador: ${results[index].team2}`);
    });

    // Aquí puedes agregar la lógica para actualizar la base de datos con los resultados.
    console.log('Resultados de la ronda:', results);
    // Ejemplo de código para guardar en Firebase (ajusta según tu estructura de datos):
    // const resultRef = ref(database, 'rondas/' + ronda);
    // set(resultRef, results);
  };

  const renderMatch = (cancha, team1Indices, team2Indices, matchIndex) => {
    // Obtén los nombres de los jugadores para cada equipo
    const [team1Player1, team1Player2] = getPlayerNames(team1Indices);
    const [team2Player1, team2Player2] = getPlayerNames(team2Indices);

    return (
      <div className={styles.partido} key={`cancha${cancha}`}>
        <div className={styles[`cancha${cancha}`]}>
          Cancha {cancha}
        </div>
        <div className={styles.equipo}>
          <div className={styles.name}>{team1Player1}</div>
          <div className={styles.name}>{team1Player2}</div>
        </div>

        <div className={styles.marcador}>
          <input
            type="text"
            value={results[matchIndex].team1}
            onChange={(e) => handleResultChange(matchIndex, 'team1', e.target.value)}
          />
        </div>

        <div className={styles.marcador}>
          <input
            type="text"
            value={results[matchIndex].team2}
            onChange={(e) => handleResultChange(matchIndex, 'team2', e.target.value)}
          />
        </div>

        <div className={styles.equipo}>
          <div className={styles.name}>{team2Player1}</div>
          <div className={styles.name}>{team2Player2}</div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.button} onClick={handleFinalizarRonda}>
        Finalizar ronda
      </div>
      <div className={styles.ronda}>
        {ronda}
      </div>
      {matchDetails.map((match, index) =>
        renderMatch(index + 1, match.team1Indices, match.team2Indices, index)
      )}
    </div>
  );
};

export default Cardconfig;
