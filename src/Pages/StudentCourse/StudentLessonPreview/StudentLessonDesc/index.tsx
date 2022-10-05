import { FC } from 'react'

import styles from './../lesson.module.scss'

type studentLessonDescT = {
  text: string
}

export const StudentLessonDesc: FC<studentLessonDescT> = ({ text }) => {
  return <span className={styles.lesson__desc}>{text || 'Здесь будет текст ДЗ'}</span>
}
