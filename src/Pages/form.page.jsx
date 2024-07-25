import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import styles from './form.module.css';
import Card from '../components/card';

const FirebaseExample = () => {
  const [players, setPlayers] = useState([]);
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    // Lee los jugadores de Firebase
    const playerRef = ref(database, 'player');
    const unsubscribePlayers = onValue(playerRef, (snapshot) => {
      const data = snapshot.val();
      const playersList = data ? Object.entries(data).map(([id, player]) => ({ id, ...player })) : [];
      setPlayers(playersList);
    });

    // Lee los resultados de las rondas de Firebase
    const roundsRef = ref(database, 'rondas');
    const unsubscribeRounds = onValue(roundsRef, (snapshot) => {
      const data = snapshot.val();
      const roundsData = data ? Object.entries(data).map(([id, round]) => ({ id, ...round })) : [];
      setRounds(roundsData);
    });

    return () => {
      unsubscribePlayers();
      unsubscribeRounds();
    };
  }, []);

  // Puedes definir los detalles de los partidos si los necesitas para la visualización
  // Aquí usamos datos de rondas ya que los resultados están en Firebase
  const getMatchDetails = (round) => {
    // Ajusta esto según la estructura de tus datos en Firebase
    return round.resultados.map((match, index) => ({
      team1Indices: [],  // Definir índices según los datos disponibles
      team2Indices: [],  // Definir índices según los datos disponibles
      ...match
    }));
  };

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
          {rounds.map((round) => (
            <Card 
              key={round.id}
              ronda={`Ronda ${round.ronda}`}
              players={players}
              matchDetails={getMatchDetails(round)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FirebaseExample;
