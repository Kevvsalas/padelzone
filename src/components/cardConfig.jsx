
import styles from './cardConfig.module.css'



const Cardconfig = ({ ronda, players, matchDetails }) => {
    const getPlayerNames = (indices) => {
      return indices.map(index => players[index] ? players[index].name : 'N/A');
    };
  
    const renderMatch = (cancha, team1Indices, team2Indices) => {
      const [team1Player1, team1Player2] = getPlayerNames(team1Indices);
      const [team2Player1, team2Player2] = getPlayerNames(team2Indices);
  
      return (
        <div className={styles.partido} key={`${cancha}`}>
          <div className={styles[`cancha${cancha}`]}>
            Cancha {cancha}
          </div>
          <div className={styles.equipo}>
            <div className={styles.name}>{team1Player1}</div>
            <div className={styles.name}>{team1Player2}</div>
          </div>
          <div className={styles.marcador}> - </div>
          <div className={styles.marcador}> - </div>
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
          {ronda}
        </div>
        {matchDetails.map((match, index) =>
          renderMatch(index + 1, match.team1Indices, match.team2Indices)
        )}
      </div>
    );
  };
  
  export default Cardconfig;
  