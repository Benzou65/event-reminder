import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import MilestoneCard from '../components/Card'
import styles from '../styles/Home.module.css'
import data from '../data'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Epitech Event Reminder</title>
        <meta name="description" content="Don't miss any more events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{' '}
          <a href="https://gandalf.epitech.eu/">Epitech Event Reminder!</a>
        </h1>

        <div className={styles.grid}>
          {data.map((project) =>
            project.milestones.map((milestone) => (
              <MilestoneCard
                key={milestone.id}
                url={project.url}
                name={milestone.name}
                projectName={project.name}
                projectDescription={project.description}
                date={milestone.date}
              />
            ))
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Benzou and{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
