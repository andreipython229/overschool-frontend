import { FC, useEffect } from 'react'
import { AddQuestionOptionsT } from '../index'
import { useCreateQuestionsMutation } from 'api/questionsAndAnswersService'

import styles from './addTextOptions.module.scss'

export const AddTextOptions: FC<AddQuestionOptionsT> = ({ setTypeQuestions, setQuestions, questions, testId }) => {
  const [createOption, { data }] = useCreateQuestionsMutation()
  const schoolName = window.location.href.split('/')[4]
  const handleGetTypeQuestion = () => {
    setTypeQuestions('Text' as keyof object)
    createOption({
      question: {
        question_type: 'Text',
        body: 'Введите текст вопроса',
        is_any_answer_correct: false,
        only_whole_numbers: false,
        test: testId,
      },
      schoolName,
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
      <h4 className={styles.wrapper_title}>Добавить вопрос</h4>
    </button>
  )
}
