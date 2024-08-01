import React, { useState, useEffect} from 'react';
import { database } from '../firebase';
import { ref, set, push, onValue, remove } from 'firebase/database';
import styles from './config.module.css';
import borrar from '../assets/borrar.png';
import Cardconfig from '../components/cardConfig';
import Card_12 from '../components/Card_12';


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
      { team1Indices: [0, 1], team2Indices: [2, 3] },
      { team1Indices: [4, 5], team2Indices: [6, 7] }
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
      if (players.length < 8) {
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
    const playerRef = ref(database, 'player');

    const unsubscribe = onValue(playerRef, (snapshot) => {
      const data = snapshot.val();
      const playersList = data ? Object.entries(data).map(([id, player]) => ({ id, ...player })) : [];
      setPlayers(playersList);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (players.length >= 8) {
      setIsInputDisabled(true);
    } else {
      setIsInputDisabled(false);
    }
  }, [players]);

  const sortedPlayersForTable = [...players].sort((a, b) => b.score - a.score);
  const playersForMatches = players;

  return (
    <div className={styles.container}>
      <h1>Americanas Padel Zone</h1>
      <button className={styles.game}>
        Cambiar torneo
      </button>
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
            <button className={styles.finish}>Finalizar torneo</button>
          </div>
        </ul>
        <div className={styles.jornada_section}>
          { Object.keys(MATCHES8).map(ronda => (
                <Cardconfig key={ronda} ronda={ronda} players={playersForMatches} matchDetails={MATCHES8[ronda]} />
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default Config;
