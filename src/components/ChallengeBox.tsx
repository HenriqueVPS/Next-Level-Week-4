import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
    const { activeChallenge, resetChallenge, completedChallenge } = useContext(ChallengesContext)
    const { resetCountDown } = useContext(CountDownContext)

    function handleChallengeCompleted() {
        resetCountDown()
        completedChallenge()
    }

    function handleChallengeFailed() {
        resetChallenge()
        resetCountDown()
    }

    return(
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>{activeChallenge.amount}</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="body"/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button 
                            onClick={handleChallengeFailed}
                            type="button" 
                            className={styles.challengeFailedButton}>
                            Falhei
                            </button>
                        <button onClick={handleChallengeCompleted} type="button" className={styles.challengeCompletedButton}>Completei</button>
                    </footer>
                </div>
            ) : (
            <div className={styles.challengeNotActive}>
                <strong>Finalize um ciclo para receber um desafio.</strong>
                <p>
                    <img src="icons/level-up.svg" alt="level up"/>
                    Avance de level para novos desafios.
                </p>
            </div>    
            )}
        </div>
    )
}