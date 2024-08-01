import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { get, ref, onValue } from 'firebase/database';
import styles from './form.module.css';
import card from '../components/card'; // Asegúrate de que la ruta sea correcta
import ScreenCard12 from '../components/Card_12'; // Asegúrate de que la ruta sea correcta

const FirebaseExample = () => {
  const [players, setPlayers] = useState([]);
  const [results, setResults] = useState({});
  const [tournamentValue, setTournamentValue] = useState(8);

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

  useEffect(() => {
    const elementName = '8';
    const elementRef = ref(database, `tournament/${elementName}`);

    const fetchTournamentValue = async () => {
      try {
        const snapshot = await get(elementRef);
        if (snapshot.exists()) {
          setTournamentValue(snapshot.val());
        } else {
          console.error('El elemento no existe');
        }
      } catch (error) {
        console.error('Error al leer el valor del elemento:', error);
      }
    };

    fetchTournamentValue();
  }, []);

  // Detalles de los partidos por ronda
  const MATCHES8 = {
    1: [{ team1Indices: [0, 1], team2Indices: [2, 3] }, { team1Indices: [4, 5], team2Indices: [6, 7] }],
    2: [{ team1Indices: [0, 2], team2Indices: [4, 6] }, { team1Indices: [1, 3], team2Indices: [5, 7] }],
    3: [{ team1Indices: [1, 2], team2Indices: [5, 6] }, { team1Indices: [0, 3], team2Indices: [4, 7] }],
    4: [{ team1Indices: [0, 4], team2Indices: [1, 5] }, { team1Indices: [2, 6], team2Indices: [3, 7] }],
    5: [{ team1Indices: [1, 4], team2Indices: [3, 6] }, { team1Indices: [0, 5], team2Indices: [2, 7] }],
    6: [{ team1Indices: [1, 7], team2Indices: [2, 4] }, { team1Indices: [0, 6], team2Indices: [3, 5] }],
    7: [{ team1Indices: [2, 5], team2Indices: [3, 4] }, { team1Indices: [0, 7], team2Indices: [1, 6] }],
    8: [{ team1Indices: [0, 1], team2Indices: [4, 5] }, { team1Indices: [2, 3], team2Indices: [6, 7] }],
    9: [{ team1Indices: [0, 2], team2Indices: [1, 3] }, { team1Indices: [4, 6], team2Indices: [5, 7] }],
  };

  const MATCHES12 = {
    1: [
      { team1Indices: [0, 1], team2Indices: [2, 3] },
      { team1Indices: [4, 5], team2Indices: [6, 7] },
      { team1Indices: [8, 9], team2Indices: [10, 11] },
    ],
    2: [
      { team1Indices: [0, 2], team2Indices: [4, 6] },
      { team1Indices: [1, 3], team2Indices: [5, 7] },
      { team1Indices: [8, 10], team2Indices: [9, 11] },
    ],
    3: [
      { team1Indices: [1, 2], team2Indices: [5, 6] },
      { team1Indices: [0, 3], team2Indices: [4, 7] },
      { team1Indices: [8, 9], team2Indices: [10, 11] },
    ],
    4: [
      { team1Indices: [0, 4], team2Indices: [1, 5] },
      { team1Indices: [2, 6], team2Indices: [3, 7] },
      { team1Indices: [8, 10], team2Indices: [9, 11] },
    ],
    5: [
      { team1Indices: [1, 4], team2Indices: [3, 6] },
      { team1Indices: [0, 5], team2Indices: [2, 7] },
      { team1Indices: [8, 9], team2Indices: [10, 11] },
    ],
    6: [
      { team1Indices: [1, 7], team2Indices: [2, 4] },
      { team1Indices: [0, 6], team2Indices: [3, 5] },
      { team1Indices: [8, 10], team2Indices: [9, 11] },
    ],
    7: [
      { team1Indices: [2, 5], team2Indices: [3, 4] },
      { team1Indices: [0, 7], team2Indices: [1, 6] },
      { team1Indices: [8, 9], team2Indices: [10, 11] },
    ],
    8: [
      { team1Indices: [0, 1], team2Indices: [4, 5] },
      { team1Indices: [2, 3], team2Indices: [6, 7] },
      { team1Indices: [8, 10], team2Indices: [9, 11] },
    ],
    9: [
      { team1Indices: [0, 2], team2Indices: [1, 3] },
      { team1Indices: [4, 6], team2Indices: [5, 7] },
      { team1Indices: [8, 9], team2Indices: [10, 11] },
    ],
  };

  const rounds = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Ordenar la lista de jugadores por puntuación
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className={styles.container}>
      <h1>Americanas Padel Zone</h1>
      <p>{tournamentValue}</p>
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
          {tournamentValue === 8 ? (
            rounds.map((ronda) => (
              <card 
                key={ronda} // Asegúrate de que la clave sea única para cada ronda
                ronda={ronda} 
                players={players} // Pasa la lista de jugadores original para los enfrentamientos
                matchDetails={MATCHES8[ronda]} 
                results={results[ronda]?.resultados || []} // Utiliza los resultados de Firebase
              />
            ))
          ) : (
            rounds.map((ronda) => (
              <ScreenCard12 
                key={ronda} // Asegúrate de que la clave sea única para cada ronda
                ronda={ronda} 
                players={players} // Pasa la lista de jugadores original para los enfrentamientos
                matchDetails={MATCHES12[ronda]} 
                results={results[ronda]?.resultados || []} 
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FirebaseExample;
