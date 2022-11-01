import { FC } from 'react'
import { AddQuestionOptionsT } from '../index'

import styles from './addNumericalTask.module.scss'

export const AddNumericalTask: FC<AddQuestionOptionsT> = ({ setTypeQuestions }) => {
  const handleGetTypeQuestion = () => {
    setTypeQuestions('Numerical' as keyof object)
  }
  return (
    <button onClick={handleGetTypeQuestion} className={styles.wrapper}>
      <div className={styles.wrapper_iconWrapper}>
        <div className={styles.wrapper_iconWrapper_icon}>
          <span>123</span>
        </div>
      </div>
      <h4 className={styles.wrapper_title}>Численная задача</h4>
    </button>
  )
}
