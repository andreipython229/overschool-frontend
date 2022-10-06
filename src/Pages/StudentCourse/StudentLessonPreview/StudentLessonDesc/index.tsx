import { FC } from 'react'
import parse from 'html-react-parser'

import styles from './../lesson.module.scss'

type studentLessonDescT = {
  text: string
}

export const StudentLessonDesc: FC<studentLessonDescT> = ({ text }) => {
  return <span className={styles.lesson__desc}>{parse(`${text || ''}`) || 'Здесь будет текст ДЗ'}</span>
}
