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
  image?: string
  picture?: string
  is_correct: boolean
  question: number
}

export type QuestionT = {
  question_type: keyof object
  body: string
  picture?: string
  answers: AnswersT[]
  question_id: number
  multiple_answer: boolean
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
  questions?: QuestionT[]
  multiple_answer?: boolean
}

const questionsMaper = {
  Text: <TextOptions />,
  TextPics: <OptionsWithPictures />,
  TextPic: <PicturesAndOptions />,
  Free: <FreeForm />,
  Numerical: <NumericalTask />,
}

export const AddQuestion: FC<AddQuestionT> = memo(({ testId }) => {
  const schoolName = window.location.href.split('/')[4]
  const { data: questionsList } = useFetchQuestionsListQuery({ id: testId, schoolName })

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
                questions={sortedQuestions}
                multiple_answer={question.multiple_answer}
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
                questions={sortedQuestions}
                multiple_answer={question.multiple_answer}
              />
            )
          } else if (question.question_type === 'TextPics') {
            return (
              <PicturesAndOptions
                answers={question.answers}
                question={question}
                title={question.body}
                id={question.question_id}
                key={question.question_id}
                testId={testId}
                questions={sortedQuestions}
                multiple_answer={question.multiple_answer}
              />
            )
          }
        })}
        {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
          <AddTextOptions setTypeQuestions={setTypeQuestions} setQuestions={setQuestions} questions={questions} testId={testId} />
        </div> */}
      </div>

      <div className={styles.wrapper_addQuestionsWrapper_btnWrapper}>
        <AddOptionsWithPictures setTypeQuestions={setTypeQuestions} setQuestions={setQuestions} questions={questions} testId={testId} />
        <AddPicturesAndOptions setTypeQuestions={setTypeQuestions} setQuestions={setQuestions} questions={questions} testId={testId} />
        <AddTextOptions setTypeQuestions={setTypeQuestions} setQuestions={setQuestions} questions={questions} testId={testId} />
        {/* <AddFreeForm setTypeQuestions={setTypeQuestions} setQuestions={setQuestions}
                      questions={questions} testId={testId}/>
          <AddNumericalTask setTypeQuestions={setTypeQuestions} setQuestions={setQuestions}
                           questions={questions} testId={testId}/> */}
      </div>
    </div>
  )
})
