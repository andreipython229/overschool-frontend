import { FC } from 'react'
import { orderBy } from 'lodash'
import { NewLoader } from '../../../../../../../components/Loaders/SimpleLoader'
import { AnswersT } from '../../../../../../../components/AddQuestion'
import styles from '../../../../../../../components/AddQuestion/addQuestion.module.scss'
import { AdminTextOptions } from './Options/AdminTextOption'
import { AdminOptionsWithPictures } from './Options/AdminOptionsWithPictures'
import { AdminPicturesAndOptions } from './Options/AdminPicturesAndOptions'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'

type AdminTestT = {
  testId?: number
  isLoading?: boolean
  isSuccess?: boolean
  questions?: QuestionT[]
}

type QuestionT = {
  question_type: keyof object
  body: string
  answers: AnswersT[]
  question_id: number
  multiple_answer: boolean
}

export const AdminTest: FC<AdminTestT> = ({ isLoading, isSuccess, questions }) => {
  const sortedQuestions = orderBy(questions, 'question_id')

  if (isLoading) {
    return <NewLoader />
  }

  return isSuccess ? (
    <div className={styles.wrapper}>
      <div className={styles.settings_list}>
        {sortedQuestions.map(question => {
          if (question.question_type === 'Text') {
            return (
              <AdminTextOptions
                answers={question.answers}
                question={question}
                title={question.body}
                id={question.question_id}
                key={question.question_id}
                questions={sortedQuestions}
                multiple_answer={question.multiple_answer}
              />
            )
          } else if (question.question_type === 'TextPic') {
            return (
              <AdminOptionsWithPictures
                answers={question.answers}
                question={question}
                title={question.body}
                id={question.question_id}
                key={question.question_id}
                questions={sortedQuestions}
                multiple_answer={question.multiple_answer}
              />
            )
          } else if (question.question_type === 'TextPics') {
            return (
              <AdminPicturesAndOptions
                answers={question.answers}
                question={question}
                title={question.body}
                id={question.question_id}
                key={question.question_id}
                questions={sortedQuestions}
                multiple_answer={question.multiple_answer}
              />
            )
          }
        })}
      </div>
    </div>
  ) : (
    <LoaderLayout />
  )
}
