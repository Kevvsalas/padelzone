import React, { useState, useEffect} from 'react';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import styles from './form.module.css';
import Card from '../components/card'; // Asegúrate de que la ruta sea correcta
const FirebaseExample = ( ) => {


  const [players, setPlayers] = useState([]);
  const [results, setResults] = useState({});
  
  useEffect(() => {
    // Obtener jugadores de Firebase
    const playerRef = ref(database, 'player');
    const unsubscribe = onValue(playerRef, (snapshot) => {
      const data = snapshot.val();
      const playersList = data ? Object.entries(data).map(([id, player]) => ({ id, ...player })) : [];
      setPlayers(playersList);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Obtener resultados de rondas de Firebase
    const resultsRef = ref(database, 'rondas');
    const unsubscribe = onValue(resultsRef, (snapshot) => {
      if (snapshot.exists()) {
        setResults(snapshot.val());
      } else {
        console.log('No results found.');
        setResults({});
      }
    });
    return () => unsubscribe();
  }, []);

  // Detalles de los partidos por ronda
  const matches = {
    1: [{ team1Indices: [0, 1], team2Indices: [2, 3] }, { team1Indices: [4, 5], team2Indices: [6, 7] }],
    2: [{ team1Indices: [0, 2], team2Indices: [4, 6] }, { team1Indices: [1, 3], team2Indices: [5, 7] }],
    3: [{ team1Indices: [1, 2], team2Indices: [5, 6] }, { team1Indices: [0, 3], team2Indices: [4, 7] }],
    4: [{ team1Indices: [0, 4], team2Indices: [1, 5] }, { team1Indices: [2, 6], team2Indices: [3, 7] }],
    5: [{ team1Indices: [1, 4], team2Indices: [3, 6] }, { team1Indices: [0, 5], team2Indices: [2, 7] }],
    6: [{ team1Indices: [1, 7], team2Indices: [2, 4] }, { team1Indices: [0, 6], team2Indices: [3, 5] }],
    7: [{ team1Indices: [2, 5], team2Indices: [3, 4] }, { team1Indices: [0, 7], team2Indices: [1, 6] }],
    8: [{team1Indices: [0, 1], team2Indices: [4, 5] }, { team1Indices: [2, 3], team2Indices: [6, 7] }],
    9: [{team1Indices: [0, 2], team2Indices: [1, 3] }, { team1Indices: [4, 6], team2Indices: [5, 7] }],
  };
 

  const rounds = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Ordenar la lista de jugadores por puntuación
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className={styles.container}>
      <h1>Americanas Padel Zone</h1>
      <div className={styles.section1}>
        <ul className={styles.list}>
          {sortedPlayers.map((player) => (
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
          {rounds.map((ronda) => (
            <Card 
              key={ronda} // Asegúrate de que la clave sea única para cada ronda
              ronda={ronda} 
              players={players} // Pasa la lista de jugadores original para los enfrentamientos
              matchDetails={matches[ronda]} 
              results={results[ronda]?.resultados || []} // Utiliza los resultados de Firebase
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FirebaseExample;
