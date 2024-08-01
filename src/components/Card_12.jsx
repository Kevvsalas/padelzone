import styles from './Card_12.module.css';

const screenCard_12 = ({ ronda, players, matchDetails, results = [] }) => {
  
  const getPlayerNames = (indices) => {
    return indices.map(index => players[index] ? players[index].name : 'N/A');
  };

  const renderMatch = (cancha, team1Indices, team2Indices, matchIndex) => {
    const [team1Player1, team1Player2] = getPlayerNames(team1Indices);
    const [team2Player1, team2Player2] = getPlayerNames(team2Indices);

    const result = results[matchIndex] || { marcadorEquipo1: '0', marcadorEquipo2: '0'};

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
          <span>{result.marcadorEquipo1}</span>
        </div>
        <div className={styles.marcador}>
          <span>{result.marcadorEquipo2}</span>
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
}

export default screenCard_12;
