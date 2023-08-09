import { FC, useEffect } from 'react'
import { AddQuestionOptionsT } from '../index'
import { useCreateQuestionsMutation } from 'api/questionsAndAnswersService'

import styles from './addTextOptions.module.scss'

export const AddTextOptions: FC<AddQuestionOptionsT> = ({ setTypeQuestions, setQuestions, questions, testId }) => {
  const [createOption, { data }] = useCreateQuestionsMutation()

  const handleGetTypeQuestion = () => {
    setTypeQuestions('Text' as keyof object)
    createOption({
      question_type: 'Text',
      body: 'Введите текст вопроса',
      is_any_answer_correct: false,
      only_whole_numbers: false,
      test: testId,
    })
  }

  useEffect(() => {
    if (data) {
      setQuestions([...questions, data])
    }
  }, [data])

  return (
    <button onClick={handleGetTypeQuestion} className={styles.wrapper}>
      <div className={styles.wrapper_iconWrapper}>
        <div className={styles.wrapper_iconWrapper_iconRow}>
          <span />
        </div>
        <div className={styles.wrapper_iconWrapper_iconRow}>
          <span />
        </div>
        <div className={styles.wrapper_iconWrapper_iconRow}>
          <span />
        </div>
      </div>
      <h4 className={styles.wrapper_title}>Текстовые варианты</h4>
    </button>
  )
}
