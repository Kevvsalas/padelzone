import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, set, push, onValue, remove } from 'firebase/database';
import styles from './form.module.css';
import borrar from '../assets/borrar.png';

import Cardconfig from '../components/cardConfig';

const Config = () => {
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  const [players, setPlayers] = useState([]);
  const [errors, setErrors] = useState({});

  const addPlayer = () => {
    const playerRef = ref(database, 'player');
    const newPlayerRef = push(playerRef);

    const newPlayer = {
      name: playerName,
      score: score
    };

    set(newPlayerRef, newPlayer);
    setPlayerName('');
    setScore(0);
  };

  const clearDatabase = () => {
    const playerRef = ref(database, 'player');
    const rondasRef = ref(database, 'rondas');
    remove(playerRef)
      .then(() => {
        console.log('Database cleared successfully');
      })
      .catch((error) => {
        console.error('Error clearing database:', error);
      });

      remove(rondasRef)
      .then(() => {
        console.log('Database cleared successfully');
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
    if (!playerName) tempErrors.name = "Name is required";
    if (score === '' || isNaN(score) || score < 0) tempErrors.score = "Valid score is required";
    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErrors = validate();
    setErrors(tempErrors);
    if (Object.keys(tempErrors).length === 0) {
      addPlayer();
    }
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

      <form className={styles.formulario} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={playerName}
          onChange={handleChangeName}
          placeholder="Enter player name"
        />
        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        
        <button type="submit">Add Player</button>
      </form>

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
          <div className={styles.delete}>
            <img src={borrar} alt="borrar" onClick={clearDatabase} />
          </div>
        </ul>
        <div className={styles.jornada_section}>
        <Cardconfig ronda="1" players={players} matchDetails={matchesRonda1} />
        <Cardconfig ronda="2" players={players} matchDetails={matchesRonda2} />
        <Cardconfig ronda="3" players={players} matchDetails={matchesRonda3} />
        <Cardconfig ronda="4" players={players} matchDetails={matchesRonda4} />
        <Cardconfig ronda="5" players={players} matchDetails={matchesRonda5} />
        <Cardconfig ronda="6" players={players} matchDetails={matchesRonda6} />
        <Cardconfig ronda="7" players={players} matchDetails={matchesRonda7} />
        </div>
      </div>
    </div>
  );
};

export default Config;
