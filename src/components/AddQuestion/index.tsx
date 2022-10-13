import { memo } from 'react'
import { AddTextOptions } from './AddTextOptions'
import { AddOptionsWithPictures } from './AddOptionsWithPictures'
import { AddPicturesAndOptions } from './AddPicturesAndOptions'
import { AddNumericalTask } from './AddNumericalTask'
import { AddFreeForm } from './AddFreeForm'

import styles from './addQuestion.module.scss'

export const AddQuestion = memo(() => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.wrapper_title}>Добавьте вопрос</h2>
      <div className={styles.wrapper_questionWrapper}>
        <AddTextOptions />
        <AddOptionsWithPictures />
        <AddPicturesAndOptions />
        <AddFreeForm />
        <AddNumericalTask />
      </div>
    </div>
  )
})
