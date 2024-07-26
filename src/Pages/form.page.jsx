import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import styles from './form.module.css';

import Card from '../components/card';

const FirebaseExample = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const playerRef = ref(database, 'player');
    
    const unsubscribe = onValue(playerRef, (snapshot) => {
      const data = snapshot.val();
      const playersList = data ? Object.entries(data).map(([id, player]) => ({ id, ...player })) : [];
      setPlayers(playersList);
    });

    return () => unsubscribe();
  }, []);

  const matchesRonda1 = [
    { team1Indices: [0, 1], team2Indices: [2, 3] },
    { team1Indices: [4, 5], team2Indices: [6, 7] }
  ];

  const matchesRonda2 = [
    { team1Indices: [0, 2], team2Indices: [4, 6] },
    { team1Indices: [1, 3], team2Indices: [5, 7] }
  ];

  const matchesRonda3 = [
    { team1Indices: [1, 2], team2Indices: [5, 6] },
    { team1Indices: [0, 3], team2Indices: [5, 7] }
  ];

  const matchesRonda4 = [
    { team1Indices: [0, 4], team2Indices: [1, 5] },
    { team1Indices: [2, 6], team2Indices: [3, 7] }
  ];

  const matchesRonda5 = [
    { team1Indices: [1, 4], team2Indices: [3, 6] },
    { team1Indices: [0, 5], team2Indices: [2, 7] }
  ];

  const matchesRonda6 = [
    { team1Indices: [1, 7], team2Indices: [2, 4] },
    { team1Indices: [0, 6], team2Indices: [3, 5] }
  ];

  const matchesRonda7 = [
    { team1Indices: [2, 5], team2Indices: [3, 4] },
    { team1Indices: [0, 7], team2Indices: [1, 6] }
  ];

  return (
    <div className={styles.container}>
      <h1>Americanas Padel Zone</h1>
      <div className={styles.section1}>
        <ul className={styles.list}>
          {players.map((player) => (
            <li key={player.id}>
              <div className={styles.name}>
                {player.name}
              </div>
              <div className={styles.score}>
                {player.score}
              </div>  
            </li>
          ))}
        </ul>
        <div className={styles.jornada_section}>
          <Card ronda="1" players={players} matchDetails={matchesRonda1} />
          <Card ronda="2" players={players} matchDetails={matchesRonda2} />
          <Card ronda="3" players={players} matchDetails={matchesRonda3} />
          <Card ronda="4" players={players} matchDetails={matchesRonda4} />
          <Card ronda="5" players={players} matchDetails={matchesRonda5} />
          <Card ronda="6" players={players} matchDetails={matchesRonda6} />
          <Card ronda="7" players={players} matchDetails={matchesRonda7} />
        </div>
      </div>
    </div>
  );
};

export default FirebaseExample;
