import { FC } from 'react'
import { AddQuestionOptionsT } from '../index'

import styles from './addPicturesAndOptions.module.scss'
import { useCreateQuestionsMutation } from '../../../api/questionsAndAnswersService'

export const AddPicturesAndOptions: FC<AddQuestionOptionsT> = ({ setTypeQuestions, testId, setQuestions, questions }) => {
  const [createOption, { data }] = useCreateQuestionsMutation()
  const schoolName = window.location.href.split('/')[4]

  const handleGetTypeQuestion = () => {
    setTypeQuestions('TextPics' as keyof object)
    createOption({
      question: {
        question_type: 'PicText',
        body: File,
        is_any_answer_correct: false,
        only_whole_numbers: false,
        test: testId,
      },
      schoolName,
    })
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
