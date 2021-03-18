import { CompletedChallenges } from '../components/CompletedChanllenges'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { CountDown } from '../components/CountDown'

import Head from 'next/head'
import { GetServerSideProps } from 'next'

import styles from '../styles/pages/Home.module.css'
import { ChallengeBox } from '../components/ChallengeBox'
import { CountDownProvider } from '../contexts/CountDownContext'
import { ChallengesProvider } from '../contexts/ChallengesContext'


interface HomeProps {
  leve: number
  currentExp: number
  challengesCompleted: number
}

export default function Home(props) {
  console.log(props)

  return (
    <ChallengesProvider
     level={props.level} 
     currentExp={props.currentExp} 
     challengesCompleted={props.challengesCompleted} 
     > 
    <div className={styles.container}>    
      <Head>
        <title>
          Início | move.it
        </title>
      </Head>

      <ExperienceBar />

      <CountDownProvider>

      <section>
        <div >
          <Profile />
          <CompletedChallenges />
            <CountDown />
        </div>
        <div>
          <ChallengeBox />
        </div>
      </section>
    </CountDownProvider>
    </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {



  const { level, currentExp, challengesCompleted } = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExp: Number(currentExp),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}