import type { GetStaticProps, NextPage, NextPageContext } from 'next'
import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import MilestoneCard from '../components/Card'
import styles from '../styles/Home.module.css'
import data from '../data'

const Home: NextPage = ({ milestonesFromAirtable }) => {
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
          {milestonesFromAirtable.map((milestone: any) => (
            <MilestoneCard
              key={milestone.id}
              url={milestone.project.url}
              name={milestone.name}
              projectName={milestone.project.name}
              projectDescription={milestone.project.description}
              date={milestone.date}
            />
          ))}
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

export const getStaticProps: GetStaticProps = async (context) => {
  // Fetch data from API
  const res = await axios.get('http://localhost:3000/api/milestone')
  const milestonesFromAirtable = res.data

  return {
    props: { milestonesFromAirtable }, // will be passed to the page component as props
  }
}

export default Home
