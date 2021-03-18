import { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext';

interface CountDownContextData {
    minutes: number,
    seconds: number,
    hasFinished: boolean,
    isActive: boolean,
    startCountDown: () => void;
    resetCountDown: () => void;
}

interface CountDownProviderProps {
    children: ReactNode
}

export const CountDownContext = createContext({} as CountDownContextData)

let countDownTimeout: NodeJS.Timeout;


export function CountDownProvider({ children }: CountDownProviderProps ) {
    const { startNewChallenge } = useContext(ChallengesContext)

    const [time, setTime] = useState(1 * 60)
    const [isActive, setisActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    function startCountDown() {
        setisActive(!false)
    }

    function resetCountDown() {
        clearTimeout(countDownTimeout)
        setisActive(false)
        setTime(1 * 60)
        setHasFinished(false)
    }

    useEffect(() => {
        if(isActive && time > 0) {
            countDownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000);
        } else if (isActive && time === 0){
            setHasFinished(true)
            setisActive(false)
            startNewChallenge()
        }
    },[isActive, time])


    return (
        <CountDownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountDown,
            resetCountDown
        }} >
            {children}
        </CountDownContext.Provider>
    )
}