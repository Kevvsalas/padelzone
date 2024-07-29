import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import styles from './form.module.css';
import Card from '../components/card'; // Asegúrate de que la ruta sea correcta

const FirebaseExample = () => {
  const [players, setPlayers] = useState([]);
  const [resultsRound1, setResultsRound1] = useState([]);
  const [resultsRound2, setResultsRound2] = useState([]);
  const [resultsRound3, setResultsRound3] = useState([]);
  const [resultsRound4, setResultsRound4] = useState([]);
  const [resultsRound5, setResultsRound5] = useState([]);
  const [resultsRound6, setResultsRound6] = useState([]);
  const [resultsRound7, setResultsRound7] = useState([]);

  // Obtener jugadores de Firebase
  useEffect(() => {
    const playerRef = ref(database, 'player');
    
    const unsubscribe = onValue(playerRef, (snapshot) => {
      const data = snapshot.val();
      const playersList = data ? Object.entries(data).map(([id, player]) => ({ id, ...player })) : [];
      setPlayers(playersList);
    });

    return () => unsubscribe();
  }, []);

  // Obtener resultados de rondas de Firebase
  useEffect(() => {
    const resultsRef = ref(database, 'rondas');

    const unsubscribe = onValue(resultsRef, (snapshot) => {
      if (snapshot.exists()) {
        const fetchedResults = snapshot.val();
        // Actualizar los resultados de cada ronda
        setResultsRound1(fetchedResults[1]?.resultados || []);
        setResultsRound2(fetchedResults[2]?.resultados || []);
        setResultsRound3(fetchedResults[3]?.resultados || []);
        setResultsRound4(fetchedResults[4]?.resultados || []);
        setResultsRound5(fetchedResults[5]?.resultados || []);
        setResultsRound6(fetchedResults[6]?.resultados || []);
        setResultsRound7(fetchedResults[7]?.resultados || []);
      } else {
        console.log('No results found.');
        // Establecer estados a arrays vacíos si no hay resultados
        setResultsRound1([]);
        setResultsRound2([]);
        setResultsRound3([]);
        setResultsRound4([]);
        setResultsRound5([]);
        setResultsRound6([]);
        setResultsRound7([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Detalles de los partidos por ronda
  const matches = {
    1: [{ team1Indices: [0, 1], team2Indices: [2, 3] }, { team1Indices: [4, 5], team2Indices: [6, 7] }],
    2: [{ team1Indices: [0, 2], team2Indices: [4, 6] }, { team1Indices: [1, 3], team2Indices: [5, 7] }],
    3: [{ team1Indices: [1, 2], team2Indices: [5, 6] }, { team1Indices: [0, 3], team2Indices: [5, 7] }],
    4: [{ team1Indices: [0, 4], team2Indices: [1, 5] }, { team1Indices: [2, 6], team2Indices: [3, 7] }],
    5: [{ team1Indices: [1, 4], team2Indices: [3, 6] }, { team1Indices: [0, 5], team2Indices: [2, 7] }],
    6: [{ team1Indices: [1, 7], team2Indices: [2, 4] }, { team1Indices: [0, 6], team2Indices: [3, 5] }],
    7: [{ team1Indices: [2, 5], team2Indices: [3, 4] }, { team1Indices: [0, 7], team2Indices: [1, 6] }]
  };

  const rounds = [1, 2, 3, 4, 5, 6, 7];

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
          {rounds.map((ronda) => (
            <Card 
              key={ronda} // Asegúrate de que la clave sea única para cada ronda
              ronda={ronda} 
              players={players} 
              matchDetails={matches[ronda]} 
              results={
                ronda === 1 ? resultsRound1 :
                ronda === 2 ? resultsRound2 :
                ronda === 3 ? resultsRound3 :
                ronda === 4 ? resultsRound4 :
                ronda === 5 ? resultsRound5 :
                ronda === 6 ? resultsRound6 :
                resultsRound7
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FirebaseExample;
