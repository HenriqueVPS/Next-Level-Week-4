import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
    const { currentExp, expToNextLevel } = useContext(ChallengesContext)

    const percentToNextLevel = Math.round((currentExp * 100) / expToNextLevel);

    return(
        <header className={styles.experienceBar}>
            <span> 0 XP</span>
            <div>
                <div style={{ width: `${percentToNextLevel}` }}></div>
                <span style={{ left: `${percentToNextLevel}` }} className={styles.currentExperience}>{currentExp} XP</span>
            </div>
            <span>{expToNextLevel} XP</span>
        </header>
    )
}