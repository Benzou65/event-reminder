import React, { ReactElement } from 'react'
import dayjs from 'dayjs'
import styles from '../styles/Home.module.css'
const customParseFormat = require('dayjs/plugin/customParseFormat')
require('dayjs/locale/fr')

dayjs.extend(customParseFormat)

interface Props {
  link: string
  title: string
  description: string
  date: string
}

export default function Card({
  link,
  title,
  description,
  date,
}: Props): ReactElement {
  let formatedDate = dayjs(date, 'DD/MM/YYYY HH:mm', 'fr').format(
    'DD MMMM YYYY'
  )
  return (
    <a href={link} className={styles.card}>
      <h2>{title} &rarr;</h2>
      <p>{description}</p>
      <p>{formatedDate}</p>
    </a>
  )
}
