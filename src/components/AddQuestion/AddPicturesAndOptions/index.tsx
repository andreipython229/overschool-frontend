import { FC } from 'react'
import { AddQuestionOptionsT } from '../index'

import styles from './addPicturesAndOptions.module.scss'

export const AddPicturesAndOptions: FC<AddQuestionOptionsT> = ({ setTypeQuestions }) => {
  const handleGetTypeQuestion = () => {
    setTypeQuestions('TextPics' as keyof object)
  }
  return (
    <button onClick={handleGetTypeQuestion} className={styles.wrapper}>
      <div className={styles.wrapper_iconWrapper}>
        <div className={styles.wrapper_iconWrapper_iconColumn}>
          <span />
        </div>
        <div className={styles.wrapper_iconWrapper_iconRowWrapper}>
          <div className={styles.wrapper_iconWrapper_iconRowWrapper_iconRow}>
            <span />
          </div>
          <div className={styles.wrapper_iconWrapper_iconRowWrapper_iconRow}>
            <span />
          </div>
          <div className={styles.wrapper_iconWrapper_iconRowWrapper_iconRow}>
            <span />
          </div>
        </div>
      </div>
      <h4 className={styles.wrapper_title}>Картинка и варианты</h4>
    </button>
  )
}
