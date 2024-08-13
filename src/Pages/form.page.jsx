import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { get, ref, onValue, onChildAdded } from 'firebase/database';
import styles from './form.module.css';
import Card from '../components/card'; 
import ScreenCard12 from '../components/Card_12'; 

const FirebaseExample = () => {
  const [players, setPlayers] = useState([]);
  const [results, setResults] = useState({});
  const [tournamentValue, setTournamentValue] = useState(8);
  const [historyScores, setHistoryScores] = useState([]);
  const [winner, setWinner] = useState(null);
  const [showWinner, setShowWinner] = useState(false);
  const [playersLoaded, setPlayersLoaded] = useState(false);
  const [lastWinnerTimestamp, setLastWinnerTimestamp] = useState(null);

  useEffect(() => {
    const playerRef = ref(database, 'player');
    const unsubscribe = onValue(playerRef, (snapshot) => {
      const data = snapshot.val();
      const playersList = data ? Object.entries(data).map(([id, player]) => ({ id, ...player })) : [];
      setPlayers(playersList);
      setPlayersLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    const historyScoresRef = ref(database, 'historyScores');
    const unsubscribe = onValue(historyScoresRef, (snapshot) => {
      const data = snapshot.val();
      const scoresList = data ? Object.entries(data).map(([id, score]) => ({ id, ...score })) : [];
      setHistoryScores(scoresList);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Intenta recuperar el timestamp de la última vez que se mostró un ganador desde el almacenamiento local
    const storedTimestamp = localStorage.getItem('lastWinnerTimestamp');
    if (storedTimestamp) {
      setLastWinnerTimestamp(parseInt(storedTimestamp, 10));
    }

    const resultsRef = ref(database, 'tournamentResults');
    const unsubscribe = onChildAdded(resultsRef, (snapshot) => {
      const nuevoTorneo = snapshot.val();
      if (nuevoTorneo && nuevoTorneo.winners) {
        console.log('Nuevo ganador:', nuevoTorneo.winners);
        const now = Date.now();
        
        // Solo muestra el ganador si no hay timestamp guardado o si han pasado más de 24 horas desde el último ganador
        if (!lastWinnerTimestamp || (now - lastWinnerTimestamp > 24 * 60 * 60 * 1000)) {
          setWinner(nuevoTorneo.winners);
          setShowWinner(true);

          // Actualiza el timestamp en el almacenamiento local
          localStorage.setItem('lastWinnerTimestamp', now);

          // Establece un temporizador para ocultar al ganador después de 5 segundos
          const timer = setTimeout(() => {
            setShowWinner(false);
            setWinner(null);
          }, 5000);

          // Limpia el temporizador cuando el componente se desmonte o cuando cambie el resultado
          return () => clearTimeout(timer);
        } else {
          setWinner(null);
          setShowWinner(false);
        }
      }
    });

    return () => unsubscribe();
  }, [lastWinnerTimestamp]);

  const topScores = historyScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

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

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className={styles.container}>
      <h1>Americanas Padel Zone</h1>
      {showWinner && winner ? (
        <div className={styles.winner}>
          <h2>¡Ganador!</h2>
          {winner.map((player) => (
            <div key={player.id}>
              <p>Nombre: {player.name}</p>
              <p>Puntaje: {player.score}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.section1}>
          {playersLoaded && (
            <>
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
          <div className={ styles.jornada_section  /*`${styles.jornada_section} ${hideCards ? styles.hideCards : ''}`*/}>
            {tournamentValue === 8 ? (
              rounds.map((ronda) => (
                <Card
                  key={ronda} 
                  ronda={ronda} 
                  players={players} 
                  matchDetails={MATCHES8[ronda]} 
                  results={results[ronda]?.resultados || []} 
                />
              ))
            ) : (
              rounds.map((ronda) => (
                <ScreenCard12 
                  key={ronda} 
                  ronda={ronda} 
                  players={players} 
                  matchDetails={MATCHES12[ronda]} 
                  results={results[ronda]?.resultados || []} 
                />
              ))
            )}
          </div>
          <ul className={styles.table}>
            {topScores.map((score) => (
              <li key={score.id}>
                <div className={styles.name}>
                  {score.name}
                </div>
                <div className={styles.score}>
                  {score.score}
                </div>  
              </li>
            ))}
          </ul>
          </>
          )}
        </div>
      )}
    </div>
  );
};

export default FirebaseExample;
