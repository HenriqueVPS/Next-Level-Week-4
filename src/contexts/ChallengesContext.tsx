import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number
}

interface ChallengesContextData {
    level: number;
    currentExp: number;
    challengesCompleted: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    expToNextLevel: number;
    completedChallenge: () => void;
    closeLevelUpModal: () => void;

}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number
    currentExp: number
    challengesCompleted: number
}



export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps ) {
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExp, setCurrentExp] = useState(rest.currentExp ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
     
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [islevelUpModalOpen, setIslevelUpModalOpen] = useState(false)

    const expToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    },[])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExp', String(currentExp))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExp, challengesCompleted])

    function levelUp() {
        setLevel(level + 1)
        setIslevelUpModalOpen(true)
    }

    function startNewChallenge() {
       const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
       const challenge = challenges[randomChallengeIndex]

       setActiveChallenge(challenge)

       new Audio('/notification.mp3').play()

       if(Notification.permission === 'granted') {
           new Notification('Novo desafio 🎉', {
               body: `Valendo ${challenge.amount}XP!`
           })
       }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function closeLevelUpModal() {
        setIslevelUpModalOpen(false)
    }

    function completedChallenge() {
        if (!activeChallenge) {
            return
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExp + amount;

        if(finalExperience >= expToNextLevel) {
            finalExperience = finalExperience - expToNextLevel;

            levelUp()
        }

        setCurrentExp(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }
 
    return (
        <ChallengesContext.Provider value={{ closeLevelUpModal ,completedChallenge ,expToNextLevel, level, currentExp, challengesCompleted, startNewChallenge, levelUp, activeChallenge, resetChallenge }}>
            {children}

            { islevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}