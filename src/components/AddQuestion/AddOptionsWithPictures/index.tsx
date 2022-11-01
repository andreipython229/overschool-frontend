import { FC } from 'react'
import { AddQuestionOptionsT } from '../index'

import styles from './addOptionsWithPictures.module.scss'

export const AddOptionsWithPictures: FC<AddQuestionOptionsT> = ({ setTypeQuestions }) => {
  const handleGetTypeQuestion = () => {
    setTypeQuestions('TextPic' as keyof object)
  }
  return (
    <button onClick={handleGetTypeQuestion} className={styles.wrapper}>
      <div className={styles.wrapper_iconWrapper}>
        <div className={styles.wrapper_iconWrapper_iconColumn}>
          <span />
        </div>
        <div className={styles.wrapper_iconWrapper_iconColumn}>
          <span />
        </div>
      </div>
      <h4 className={styles.wrapper_title}>Варианты с картинками</h4>
    </button>
  )
}
