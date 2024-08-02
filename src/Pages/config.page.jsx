import React, { useState, useEffect} from 'react';
import { database } from '../firebase';
import { get, ref, set, push, onValue, remove } from 'firebase/database';
import styles from './config.module.css';
import borrar from '../assets/borrar.png';
import Cardconfig from '../components/cardConfig';
import Card_12 from '../components/Card_12.config';
import Continue  from '../assets/continuar.png';

const Config = () => {

 
  const MATCHES8 = {
    1: [
      { team1Indices: [0, 1], team2Indices: [2, 3] },
      { team1Indices: [4, 5], team2Indices: [6, 7] }
    ],
    2: [
      { team1Indices: [0, 2], team2Indices: [4, 6] },
      { team1Indices: [1, 3], team2Indices: [5, 7] }
    ],
    3: [
      { team1Indices: [1, 2], team2Indices: [5, 6] },
      { team1Indices: [0, 3], team2Indices: [4, 7] }
    ],
    4: [
      { team1Indices: [0, 4], team2Indices: [1, 5] },
      { team1Indices: [2, 6], team2Indices: [3, 7] }
    ],
    5: [
      { team1Indices: [1, 4], team2Indices: [3, 6] },
      { team1Indices: [0, 5], team2Indices: [2, 7] }
    ],
    6: [
      { team1Indices: [1, 7], team2Indices: [2, 4] },
      { team1Indices: [0, 6], team2Indices: [3, 5] }
    ],
    7: [
      { team1Indices: [2, 5], team2Indices: [3, 4] },
      { team1Indices: [0, 7], team2Indices: [1, 6] }
    ],
    8: [
      { team1Indices: [0, 1], team2Indices: [4, 5] },
      { team1Indices: [2, 3], team2Indices: [6, 7] }
    ],
    9: [
      { team1Indices: [0, 2], team2Indices: [1, 3] },
      { team1Indices: [4, 6], team2Indices: [5, 7] }
    ]
  };
  
  
  
  const MATCHES12 = {
    1: [
      { team1Indices: [0, 1], team2Indices: [2, 3] },
      { team1Indices: [4, 5], team2Indices: [6, 7] },
      { team1Indices: [8, 9], team2Indices: [10, 11] }
    ],
    2: [
      { team1Indices: [0, 2], team2Indices: [4, 6] },
      { team1Indices: [0, 2], team2Indices: [4, 6] },
      { team1Indices: [1, 3], team2Indices: [5, 7] }
    ],
    3: [
      { team1Indices: [1, 2], team2Indices: [5, 6] },
      { team1Indices: [1, 2], team2Indices: [5, 6] },
      { team1Indices: [0, 3], team2Indices: [4, 7] }
    ],
    4: [
      { team1Indices: [0, 4], team2Indices: [1, 5] },
      { team1Indices: [0, 4], team2Indices: [1, 5] },
      { team1Indices: [2, 6], team2Indices: [3, 7] }
    ],
    5: [
      { team1Indices: [1, 4], team2Indices: [3, 6] },
      { team1Indices: [1, 4], team2Indices: [3, 6] },
      { team1Indices: [0, 5], team2Indices: [2, 7] }
    ],
    6: [
      { team1Indices: [1, 7], team2Indices: [2, 4] },
      { team1Indices: [1, 7], team2Indices: [2, 4] },
      { team1Indices: [0, 6], team2Indices: [3, 5] }
    ],
    7: [
      { team1Indices: [2, 5], team2Indices: [3, 4] },
      { team1Indices: [2, 5], team2Indices: [3, 4] },
      { team1Indices: [0, 7], team2Indices: [1, 6] }
    ],
    8: [
      { team1Indices: [0, 1], team2Indices: [4, 5] },
      { team1Indices: [0, 1], team2Indices: [4, 5] },
      { team1Indices: [2, 3], team2Indices: [6, 7] }
    ],
    9: [
      { team1Indices: [0, 2], team2Indices: [1, 3] },
      { team1Indices: [0, 2], team2Indices: [1, 3] },
      { team1Indices: [4, 6], team2Indices: [5, 7] }
    ]
  };
  
  

  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  const [players, setPlayers] = useState([]);
  const [errors, setErrors] = useState({});
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [editPlayerId, setEditPlayerId] = useState(null);
  const [newName, setNewName] = useState('');
  const [nameError, setNameError] = useState('');
  const [tournamentValue, setTournamentValue] = useState(8);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);


  const addPlayer = () => {
    const playerRef = ref(database, 'player');
    const newPlayerRef = push(playerRef);
    const newPlayer = { name: playerName, score: score };
    set(newPlayerRef, newPlayer);
    setPlayerName('');
    setScore(0);
  };

  const clearDatabase = () => {
    const playerRef = ref(database, 'player');
    const rondasRef = ref(database, 'rondas');
  
    const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar toda la información y reiniciar el juego?");
    if (isConfirmed) {
      localStorage.clear();
      Promise.all([remove(playerRef), remove(rondasRef)])
        .then(() => {
          console.log('Database cleared successfully');
          window.location.assign("/home");
        })
        .catch((error) => {
          console.error('Error clearing database:', error);
        });
    }
  };


  const finishTournament = () => {
    const playerRef = ref(database, 'player');
    const rondasRef = ref(database, 'rondas');
  
    
    localStorage.clear();
    Promise.all([remove(playerRef), remove(rondasRef)])
      .then(() => {
        console.log('Database cleared successfully');
        window.location.assign("/home");
      })
      .catch((error) => {
        console.error('Error clearing database:', error);
      });
    
  };







  const handleChangeName = (e) => {
    setPlayerName(e.target.value);
  };

  const validate = () => {
    let tempErrors = {};
    const trimmedPlayerName = playerName.trim();
    if (!trimmedPlayerName) tempErrors.name = "El nombre es obligatorio";
    if (players.some(player => player.name.trim().toLowerCase() === trimmedPlayerName.toLowerCase())) {
      tempErrors.name = "El nombre ya está en la lista";
    }
    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErrors = validate();
    setErrors(tempErrors);
    if (Object.keys(tempErrors).length === 0) {
      if (players.length < tournamentValue) {
        addPlayer();
      } else {
        setIsInputDisabled(true);
      }
    }
  };

  const editName = (playerId, playerName) => { 
    setEditPlayerId(playerId);
    setNewName(playerName);
    setNameError(''); 
  };

  const updatePlayerName = async (playerId, newName) => {
    if (players.some(player => player.name.toLowerCase() === newName.toLowerCase() && player.id !== playerId)) {
      setNameError('El nombre ya existe');
      return;
    }
    const playerRef = ref(database, `player/${playerId}`);
    set(playerRef, { ...players.find(player => player.id === playerId), name: newName })
      .then(() => {
        setEditPlayerId(null);
        setNewName('');
        setNameError('');
      })
      .catch(error => {
        console.error('Error actualizando el nombre:', error);
      });
  };

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

  const saveScore = async (playersArray) => {
    try {
      const historyScoresRef = ref(database, 'historyScores');
      const snapshot = await get(historyScoresRef);
      const historyScoresData = snapshot.val() || {};
  
      const updatedScores = { ...historyScoresData };
  
      playersArray.forEach(player => {
        const existingPlayer = Object.values(historyScoresData).find(p => p.name === player.name);
        if (existingPlayer) {
          //  Si el jugador existe se actualiza el score
          existingPlayer.score += player.score;
          const playerKey = Object.keys(historyScoresData).find(key => historyScoresData[key].name === player.name);
          updatedScores[playerKey] = existingPlayer;
        } else {
          // Si no existe se crea un nuevo registro
          const newPlayerKey = push(historyScoresRef).key;
          updatedScores[newPlayerKey] = player;
        }
      });
  
      await set(historyScoresRef, updatedScores);
      console.log("Score actualizado en la tabla historica.");
    } catch (error) {
      console.error("Error actualizando el score en la tabla historica:", error);
    }
  };
  
  const saveData = async () => {
    const playerRef = ref(database, 'player');
    const snapshot = await get(playerRef);
  
    if (snapshot.exists()) {
      const data = snapshot.val();
      const playersArray = Object.values(data).map(player => ({ name: player.name, score: player.score }));
      const resultsRef = ref(database, 'tournamentResults');
  
      const newTournamentRef = push(resultsRef);
      const tournamentId = newTournamentRef.key;
  
      const timestamp = new Date().toISOString();
  
      const resultsData = {
        timestamp: timestamp,
        players: playersArray,
        tournamentType: tournamentValue // Guardamos el tipo de torneo en los resultados
      };
  
      await set(newTournamentRef, resultsData);
      await finishTournament();
  
      // Guardamos el tipo de torneo en la tabla "tournament"
      const tournamentRef = ref(database, `tournament/${tournamentId}`);
      await set(tournamentRef, { tournamentType: tournamentValue });
  
      // Llamar a saveScore para actualizar las puntuaciones en historyScores
      await saveScore(playersArray);
  
      console.log("Tournament results saved successfully");
    }
  };

  const changeTournament = () => {
    const elementName = '8';
    const elementRef = ref(database, `tournament/${elementName}`);

    get(elementRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const currentValue = snapshot.val();
          let newValue;

          if (currentValue === 8) {
            newValue = 12;
          } else if (currentValue === 12) {
            newValue = 8;
          } else {
            console.error('Valor inesperado:', currentValue);
            return;
          }

          set(elementRef, newValue)
            .then(() => {
              console.log(`Elemento actualizado exitosamente a ${newValue}`);
              setTournamentValue(newValue); // Actualizar el estado con el nuevo valor
            })
            .catch((error) => {
              console.error('Error al actualizar el elemento:', error);
            });
        } else {
          console.error('El elemento no existe');
        }
      })
      .catch((error) => {
        console.error('Error al leer el valor del elemento:', error);
      });
  }

  useEffect(() => {
    const playerRef = ref(database, 'player');

    const unsubscribe = onValue(playerRef, (snapshot) => {
      const data = snapshot.val();
      const playersList = data ? Object.entries(data).map(([id, player]) => ({ id, ...player })) : [];
      setPlayers(playersList);
      const hasPositiveScore = playersList.some(player => player.score > 0);
      setIsButtonDisabled(hasPositiveScore);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (players.length >= tournamentValue) {
      setIsInputDisabled(true);
    } else {
      setIsInputDisabled(false);
    }
  }, [players]);
  console.log(tournamentValue)
  const sortedPlayersForTable = [...players].sort((a, b) => b.score - a.score);
  const playersForMatches = players;

  return (
    <div className={styles.container}>
      <h1>Americanas Padel Zone</h1>
      <button 
           className={`${styles.game} ${isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled}`}
          onClick={changeTournament}       
          disabled={isButtonDisabled}
       >
        Cambiar para {(tournamentValue === 8 ? "12" : "8")} jugadores
      </button>
      <button onClick={saveData} className={styles.finish}>
        <img src={Continue} className={styles.finish_img} alt="finalizar" />
        Finalizar torneo</button>

      <form className={styles.formulario} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={playerName}
          onChange={handleChangeName}
          placeholder="Nombre"
          disabled={isInputDisabled}
        />
        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        <button type="submit" disabled={isInputDisabled}>Agregar</button>
      </form>
      <div className={styles.section1}>
        <ul className={styles.list}>
          {sortedPlayersForTable.map((player) => (
            <li key={player.id} onClick={() => editName(player.id, player.name)}>
              <div className={styles.name}>
                {editPlayerId === player.id ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onBlur={() => updatePlayerName(player.id, newName)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        updatePlayerName(player.id, newName);
                      }
                    }}
                  />
                ) : (
                  player.name
                )}
                {nameError && <span style={{ color: 'red' }}>{nameError}</span>}
              </div>
              <div className={styles.score}>{player.score}</div>  
            </li>
          ))}
          <div className={styles.delete}>
            <img src={borrar} alt="borrar" onClick={clearDatabase} /> 
          </div>
        </ul>
        <div className={styles.jornada_section}>
            {
              tournamentValue === 8 ?
                Object.keys(MATCHES8).map(ronda => (
                  <Cardconfig key={ronda} ronda={ronda} players={playersForMatches} matchDetails={MATCHES8[ronda]} />
                )) :
                Object.keys(MATCHES12).map(ronda => (
                  <Card_12 key={ronda} ronda={ronda} players={playersForMatches} matchDetails={MATCHES12[ronda]} />
                ))
            }
</div>
      </div>
    </div>
  );
};

export default Config;
