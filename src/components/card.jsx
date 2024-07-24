
import styles from './card.module.css'

const Card = ({title , players}) => {
    const getPlayerName = (index) => {
        return players[index] ? players[index].name : 'N/A';
      };
return(

    <div className={styles.container}>

        <div className={styles.partido}>
            <div className={styles.equipo}>
                <div className={styles.name}>{getPlayerName(0)}</div>
                <div className={styles.name}>{getPlayerName(1)}</div>    
            </div>
            <div className={styles.marcador}> -</div>
            <div className={styles.marcador}> -</div>
            <div className={styles.equipo}> 
            <div className={styles.name}>{getPlayerName(3)}</div>
            <div className={styles.name}>{getPlayerName(4)}</div>
            </div>
        </div>
        <div className={styles.partido}>
            <div className={styles.equipo}>
                <div className={styles.name}>{getPlayerName(0)}</div>
                <div className={styles.name}>{getPlayerName(1)}</div>    
            </div>
            <div className={styles.marcador}> - </div>
            <div className={styles.marcador}> -</div>
            <div className={styles.equipo}> 
                <div className={styles.name}>{getPlayerName(1)}</div> 
                <div className={styles.name}>{getPlayerName(0)}</div>
            </div>
        </div>
    </div>
)
}

export default Card