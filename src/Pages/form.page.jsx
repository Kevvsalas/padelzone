import React, { useState, useEffect } from 'react';
import { database } from '../firebase';

import { ref, set, push, onValue , remove} from 'firebase/database';
import styles from './form.module.css';

import borrar from '../assets/borrar.png'
import Card from '../components/card';
// import Jornada_Card from '../components/jornada_Card';

const FirebaseExample = () => {
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  const [players, setPlayers] = useState([]);

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
    remove(playerRef)
      .then(() => {
        console.log('Database cleared successfully');
      })
      .catch((error) => {
        console.error('Error clearing database:', error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (playerName.trim() !== '') { 
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

  return (
    <div className={styles.container}>
      <h1>Americanas Padel Zone</h1>

      <form className={styles.formulario} onSubmit={handleSubmit}>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter player name"
        />
        
        <button onClick={addPlayer}>Add Player</button>
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
          <Card title="Jornada 2" players={players}></Card>
          <Card title="Jornada 2" players={players}></Card>
          <Card title="Jornada 2" players={players}></Card>
          <Card title="Jornada 2" players={players}></Card>
          <Card title="Jornada 2" players={players}></Card>
          <Card title="Jornada 2" players={players}></Card>
          <Card title="Jornada 2" players={players}></Card>
          <Card title="Jornada 2" players={players}></Card>
          {/* <Jornada_Card title="Jornada 1" players={players}></Jornada_Card> 
          <Jornada_Card title="Jornada 2" players={players}></Jornada_Card> 
          <Jornada_Card title="Jornada 3" players={players}></Jornada_Card> 
          <Jornada_Card title="Jornada 4" players={players}></Jornada_Card> 
          <Jornada_Card title="Jornada 5" players={players}></Jornada_Card> 
          <Jornada_Card title="Jornada 6" players={players}></Jornada_Card> 
          <Jornada_Card title="Jornada 7" players={players}></Jornada_Card> 
          <Jornada_Card title="Jornada 8" players={players}></Jornada_Card> 
          <Jornada_Card title="Jornada 9" players={players}></Jornada_Card>  */}
          
        </div>
    
        
          
      </div>
      
      
    
    </div>
  );
};

export default FirebaseExample;
