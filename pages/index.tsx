import type { GetStaticProps, NextPage, InferGetStaticPropsType } from 'next'
import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import MilestoneCard from '../components/Card'
import getMilestones from '../backend/milestone/milestone.controller'
import TMilestone from '../backend/milestone/TMilestone'
import styles from '../styles/Home.module.css'

const Home: NextPage = ({
  milestonesFromAirtable,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
          {milestonesFromAirtable.map((milestone: TMilestone) => (
            <MilestoneCard
              key={milestone.id}
              url={milestone?.project?.url}
              name={milestone.name}
              projectName={milestone?.project?.name}
              projectDescription={milestone?.project?.description}
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
  // Fetch data from Airtable
  const milestonesFromAirtable = await getMilestones()
  // Sort by date
  milestonesFromAirtable.sort((a, b) => {
    return (
      new Date(a.date as string).getTime() -
      new Date(b.date as string).getTime()
    )
  })

  return {
    props: { milestonesFromAirtable }, // will be passed to the page component as props
  }
}

export default Home
