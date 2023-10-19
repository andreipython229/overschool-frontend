import { FC, memo, useEffect, useState } from 'react'
import { orderBy } from 'lodash'
import { AddTextOptions } from './AddTextOptions'
import { AddOptionsWithPictures } from './AddOptionsWithPictures'
import { AddPicturesAndOptions } from './AddPicturesAndOptions'
import { AddNumericalTask } from './AddNumericalTask'
import { AddFreeForm } from './AddFreeForm'
import { OptionsWithPictures } from 'components/Questions/OptionsWithPictures'
import { PicturesAndOptions } from 'components/Questions/PicturesAndOptions'
import { FreeForm } from 'components/Questions/FreeForm'
import { NumericalTask } from 'components/Questions/NumericalTask'
import { TextOptions } from 'components/Questions/TextOptions'
import { useFetchQuestionsListQuery } from 'api/questionsAndAnswersService'

import styles from './addQuestion.module.scss'

export type AnswersT = {
  answer_id: number
  body: string
  image?: Blob
  is_correct: boolean
  question: number
}

type QuestionT = {
  question_type: keyof object
  body: string
  answers: AnswersT[]
  question_id: number
}

type AddQuestionT = {
  testId: number
}

export type AddQuestionOptionsT = {
  setTypeQuestions: (arg: keyof object) => void
  setQuestions: (arg: QuestionT[]) => void
  questions: QuestionT[]
  testId: number
}

export type PropsQuestionBlockT = {
  title?: string
  id?: number
  onToggle?: () => void
  isOpen?: boolean
  question?: QuestionT
  onPointerDown?: any
  answers?: AnswersT[]
  testId?: number
  // setQuestions?: (arg: QuestionT[]) => void
  // questions?: QuestionT[]
}

const questionsMaper = {
  Text: <TextOptions />,
  TextPics: <OptionsWithPictures />,
  TextPic: <PicturesAndOptions />,
  Free: <FreeForm />,
  Numerical: <NumericalTask />,
}

export const AddQuestion: FC<AddQuestionT> = memo(({ testId }) => {
  const { data: questionsList } = useFetchQuestionsListQuery(testId)

  const [typeQuestions, setTypeQuestions] = useState<keyof QuestionT>(null as keyof object)

  const [questions, setQuestions] = useState<QuestionT[]>([])

  const sortedQuestions = orderBy(questions, 'question_id')

  useEffect(() => {
    if (questionsList) {
      setQuestions(questionsList?.questions)
    }
  }, [questionsList])

  return (
    <div className={styles.wrapper}>
      <div className={styles.settings_list}>
        {sortedQuestions.map(question => {
          if (question.question_type === 'Text') {
            return (
              <TextOptions
                answers={question.answers}
                question={question}
                title={question.body}
                id={question.question_id}
                key={question.question_id}
                testId={testId}
              />
            )
          } else if (question.question_type === 'TextPic') {
            return (
              <OptionsWithPictures
                answers={question.answers}
                question={question}
                title={question.body}
                id={question.question_id}
                key={question.question_id}
                testId={testId}
              />
            )
          } else if (question.question_type === 'PicText') {
            return (
              <PicturesAndOptions
                answers={question.answers}
                question={question}
                title={question.body}
                id={question.question_id}
                key={question.question_id}
                testId={testId}
              />
            )
          }
        })}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
          <AddTextOptions setTypeQuestions={setTypeQuestions} setQuestions={setQuestions} questions={questions} testId={testId} />
        </div>
      </div>
      {/* <div className={styles.wrapper_addQuestionsWrapper}>
        <h2 className={styles.wrapper_addQuestionsWrapper_title}>Добавьте вопрос</h2>
        <div className={styles.wrapper_addQuestionsWrapper_btnWrapper}>
          <AddTextOptions setTypeQuestions={setTypeQuestions} setQuestions={setQuestions} questions={questions} testId={testId} />
          <AddOptionsWithPictures setTypeQuestions={setTypeQuestions} setQuestions={setQuestions} questions={questions} testId={testId} />
          <AddPicturesAndOptions setTypeQuestions={setTypeQuestions} setQuestions={setQuestions} questions={questions} testId={testId} />
          <AddFreeForm setTypeQuestions={setTypeQuestions} setQuestions={setQuestions}
                      questions={questions} testId={testId}/>
          <AddNumericalTask setTypeQuestions={setTypeQuestions} setQuestions={setQuestions}
                           questions={questions} testId={testId}/>
        </div>
      </div> */}
    </div>
  )
})
