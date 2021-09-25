import React, { ReactElement } from 'react'
import dayjs from 'dayjs'
import styles from '../styles/Home.module.css'
const customParseFormat = require('dayjs/plugin/customParseFormat')
require('dayjs/locale/fr')

dayjs.extend(customParseFormat)

interface Props {
  url: string
  name: string
  projectName: string
  projectDescription: string
  date: string
}

export default function MilestoneCard({
  url,
  name,
  projectName,
  projectDescription,
  date,
}: Props): ReactElement {
  let formatedDate = dayjs(date, 'DD/MM/YYYY HH:mm', 'fr').format(
    'DD MMMM YYYY'
  )
  return (
    <a href={url} className={styles.card} target="_blank" rel="noreferrer">
      <h2>
        {projectName} - {projectDescription}&rarr;
      </h2>
      <p>{name}</p>
      <p>{formatedDate}</p>
    </a>
  )
}
