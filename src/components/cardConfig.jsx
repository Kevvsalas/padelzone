import React, { useState, useEffect } from 'react';
import styles from './cardConfig.module.css';
import { ref, set, update } from 'firebase/database';
import { database } from '../firebase';

const Cardconfig = ({ ronda, players, matchDetails, isPlayersAvailable }) => {
  const [results, setResults] = useState(
    matchDetails.map(() => ({ team1: '', team2: '' }))
  );
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // Cargar los resultados y el estado del botón desde localStorage cuando el componente se monta
    const savedResults = localStorage.getItem(`ronda_${ronda}_results`);
    const savedIsDisabled = localStorage.getItem(`ronda_${ronda}_isDisabled`);

    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }

    if (savedIsDisabled !== null) {
      setIsDisabled(JSON.parse(savedIsDisabled));
    }
  }, [ronda]);

  const getPlayerNames = (indices) => {
    return indices.map(index => players[index] ? players[index].name : 'N/A');
  };

  const handleResultChange = (matchIndex, team, value) => {
    // Solo permite la entrada de números y vacíos
    const sanitizedValue = value === '' || !isNaN(value) ? value : results[matchIndex][team];
    const updatedResults = [...results];
    updatedResults[matchIndex][team] = sanitizedValue;
    setResults(updatedResults);
  };

  const handleSaveResults = () => {
    if (isDisabled) return; // No hacer nada si el botón está deshabilitado

    // Verifica que todos los resultados sean números válidos
    const validResults = results.every(result =>
      !isNaN(result.team1) && !isNaN(result.team2) &&
      result.team1.trim() !== '' && result.team2.trim() !== ''
    );
    if (!validResults) {
      console.error('Algunos resultados no son números válidos o están vacíos.');
      return;
    }

    setIsDisabled(true); // Deshabilitar el botón
    const rondaData = {
      ronda,
      resultados: matchDetails.map((match, index) => {
        const [team1Player1, team1Player2] = getPlayerNames(match.team1Indices);
        const [team2Player1, team2Player2] = getPlayerNames(match.team2Indices);
        return {
          partido: `Partido ${index + 1}`,
          equipo1: `${team1Player1}, ${team1Player2}`,
          equipo2: `${team2Player1}, ${team2Player2}`,
          marcadorEquipo1: results[index].team1,
          marcadorEquipo2: results[index].team2,
        };
      })
    };

    // Guarda los datos de la ronda en Firebase
    const rondaRef = ref(database, `rondas/${ronda}`);
    set(rondaRef, rondaData).then(() => {
      console.log('Datos guardados exitosamente en Firebase.');
    }).catch((error) => {
      console.error('Error al guardar en Firebase:', error);
    });

    // Guarda los resultados y el estado del botón en localStorage
    localStorage.setItem(`ronda_${ronda}_results`, JSON.stringify(results));
    localStorage.setItem(`ronda_${ronda}_isDisabled`, JSON.stringify(true));

    // Actualiza el puntaje de los jugadores con los puntajes del partido
    matchDetails.forEach((match, index) => {
      const [team1Player1, team1Player2] = getPlayerNames(match.team1Indices);
      const [team2Player1, team2Player2] = getPlayerNames(match.team2Indices);

      const team1Score = parseInt(results[index].team1, 10) || 0;
      const team2Score = parseInt(results[index].team2, 10) || 0;

      updatePlayerScore(team1Player1, team1Score);
      updatePlayerScore(team1Player2, team1Score);
      updatePlayerScore(team2Player1, team2Score);
      updatePlayerScore(team2Player2, team2Score);

      console.log(`Partido ${index + 1}:`);
      console.log(`Equipo 1: ${team1Player1}, ${team1Player2} - Marcador: ${team1Score}`);
      console.log(`Equipo 2: ${team2Player1}, ${team2Player2} - Marcador: ${team2Score}`);
    });

    console.log(`Resultados de la ronda ${ronda}:`, results);
  };

  const updatePlayerScore = (playerName, scoreToAdd) => {
    const player = players.find(player => player.name === playerName);
    if (player) {
      const playerRef = ref(database, `player/${player.id}`);
      update(playerRef, { score: (player.score || 0) + scoreToAdd });
    } else {
      console.error(`Jugador no encontrado: ${playerName}`);
    }
  };

  const renderMatch = (cancha, team1Indices, team2Indices, matchIndex) => {
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
            disabled={isDisabled}
            className={isDisabled ? styles.disabled : ''}
          />
        </div>

        <div className={styles.marcador}>
          <input
            type="text"
            value={results[matchIndex].team2}
            onChange={(e) => handleResultChange(matchIndex, 'team2', e.target.value)}
            disabled={isDisabled}
            className={isDisabled ? styles.disabled : ''}
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
      <button
        className={`${isDisabled ? styles.disabledButton : styles.button}`}
        onClick={handleSaveResults}
        disabled={isDisabled}
      >
        Guardar Resultados
      </button>
      <div className={styles.ronda}>
        Ronda {ronda}
      </div>
      {matchDetails.map((match, index) =>
        renderMatch(index + 1, match.team1Indices, match.team2Indices, index)
      )}
    </div>
  );
};

export default Cardconfig;
