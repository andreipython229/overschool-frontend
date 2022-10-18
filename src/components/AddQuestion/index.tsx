import { memo } from 'react'
import { AddTextOptions } from './AddTextOptions'
import { AddOptionsWithPictures } from './AddOptionsWithPictures'
import { AddPicturesAndOptions } from './AddPicturesAndOptions'
import { AddNumericalTask } from './AddNumericalTask'
import { AddFreeForm } from './AddFreeForm'
import { TextOptions } from 'components/Questions/TextOptions'

import styles from './addQuestion.module.scss'
import { OptionsWithPictures } from 'components/Questions/OptionsWithPictures'
import { PicturesAndOptions } from 'components/Questions/PicturesAndOptions'
import { FreeForm } from 'components/Questions/FreeForm'
import { NumericalTask } from 'components/Questions/NumericalTask'

export const AddQuestion = memo(() => {
  return (
    <div className={styles.wrapper}>
      {/* <TextOptions />
      <OptionsWithPictures />
      <PicturesAndOptions />
      <FreeForm />
      <NumericalTask /> */}
      <div className={styles.wrapper_addQuestionsWrapper}>
          <h2 className={styles.wrapper_addQuestionsWrapper_title}>Добавьте вопрос</h2>
          <div className={styles.wrapper_addQuestionsWrapper_btnWrapper}>
              <AddTextOptions />
              <AddOptionsWithPictures />
              <AddPicturesAndOptions />
              <AddFreeForm />
              <AddNumericalTask />
          </div>
      </div>
    </div>
  )
})
