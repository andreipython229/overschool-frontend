import { FC, useEffect, useState } from 'react'
import { useFetchQuestionsListQuery, useLazyFetchQuestionsListQuery } from '../../../../../../../api/questionsAndAnswersService'
import { orderBy } from 'lodash'
import { SimpleLoader } from '../../../../../../../components/Loaders/SimpleLoader'
import { AnswersT } from '../../../../../../../components/AddQuestion'
import styles from '../../../../../../../components/AddQuestion/addQuestion.module.scss'
import { AdminTextOptions } from './Options/AdminTextOption'
import { AdminOptionsWithPictures } from './Options/AdminOptionsWithPictures'
import { AdminPicturesAndOptions } from './Options/AdminPicturesAndOptions'
import { ITest } from 'types/sectionT'
import { useParams } from 'react-router-dom'

type AdminTestT = {
  testId: number
}

type QuestionT = {
  question_type: keyof object
  body: string
  answers: AnswersT[]
  question_id: number
}

export const AdminTest: FC<AdminTestT> = ({ testId }) => {
  const schoolName = window.location.href.split('/')[4]
  const { course_id: courseId } = useParams()
  const [fetchQuestionsList, { data: questionsList, isLoading, isSuccess }] = useLazyFetchQuestionsListQuery();

  // для функционала не только с текстовыми тестами =>
  // const [typeQuestions, setTypeQuestions] = useState<keyof QuestionT>(null as keyof object)

  const [questions, setQuestions] = useState<QuestionT[]>([])

  const sortedQuestions = orderBy(questions, 'question_id')

  useEffect(() => {
    if (testId && schoolName && courseId) {
      fetchQuestionsList({ id: String(testId), schoolName, course_id: courseId });
    }
  }, [testId, schoolName, courseId]);

  useEffect(() => {
    if (questionsList) {
      setQuestions(questionsList?.questions)
    }
  }, [questionsList, testId])

  if (isLoading) {
    return <SimpleLoader />
  }

  return isSuccess ? (
    <div className={styles.wrapper}>
      <div className={styles.settings_list}>
        <span className={styles.nameSettings}>
          {questionsList && typeof questionsList === 'object' && 'name' in questionsList && 'Тест на тему: ' + '"' + questionsList.name + '"'}
        </span>
        {sortedQuestions.map(question => {
          if (question.question_type === 'Text') {
            return (
              <AdminTextOptions
                answers={question.answers}
                question={question}
                title={question.body}
                id={question.question_id}
                key={question.question_id}
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
              />
            )
          }
        })}
      </div>
    </div>
  ) : (
    <SimpleLoader />
  )
}
