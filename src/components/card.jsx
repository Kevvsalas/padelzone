import React from 'react';
import styles from './card.module.css';

const Card = ({ ronda, players, matchDetails, results }) => {
  const getPlayerNames = (indices) => {
    return indices.map(index => players[index] ? players[index].name : 'N/A');
  };

  const renderMatch = (cancha, team1Indices, team2Indices, matchIndex) => {
    const [team1Player1, team1Player2] = getPlayerNames(team1Indices);
    const [team2Player1, team2Player2] = getPlayerNames(team2Indices);

    // Asegurarse de que `results` no sea undefined y tenga el índice adecuado
    const result = results && results[matchIndex] ? results[matchIndex] : { team1: '0', team2: '0' };

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
          <span>{result.team1}</span>
        </div>

        <div className={styles.marcador}>
          <span>{result.team2}</span>
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
      <div className={styles.ronda}>
        Ronda {ronda}
      </div>
      {matchDetails.map((match, index) =>
        renderMatch(index + 1, match.team1Indices, match.team2Indices, index)
      )}
    </div>
  );
};

export default Card;
