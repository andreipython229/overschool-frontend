import { useState, FC } from 'react'
import styles from './addQuestion.module.scss'
import { AddTextOptions } from './AddTextOptions'
import { AddOptionsWithPictures } from './AddOptionsWithPictures'
import { AddPicturesAndOptions } from './AddPicturesAndOptions'
import { AddNumericalTask } from './AddNumericalTask'
import { AddFreeForm } from './AddFreeForm'

export const AddQuestion = () => {

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
}
