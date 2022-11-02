import { FC, memo, useEffect, useState } from 'react'
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
import { Reorder } from 'framer-motion'

import styles from './addQuestion.module.scss'

export type AnswersT = {
  answer_id: number
  body: string
}

type QuestionT = {
  question_type: keyof object
  body: string
  answers: AnswersT[]
  question_id: number
}

type AddQuestionT = {
  testId: string | number
}

export type AddQuestionOptionsT = {
  setTypeQuestions: (arg: keyof object) => void
  setQuestions: (arg: QuestionT[]) => void
  questions: QuestionT[]
}

export type PropsQuestionBlockT = {
  title?: string
  id?: number
  onToggle?: () => void
  isOpen?: boolean
  question?: QuestionT
  onPointerDown?: any
  answers?: AnswersT[]
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

  useEffect(() => {
    if (questionsList) {
      setQuestions(questionsList?.questions)
    }
  }, [questionsList])

  return (
    <div className={styles.wrapper}>
      <Reorder.Group className={styles.settings_list} as="ul" onReorder={setQuestions} values={questions}>
        {questions.map(({ question_type }) => questionsMaper[question_type])}
        {questions.map((question) => (
          <TextOptions answers={question.answers} question={question} title={question.body} id={question.question_id} key={question.question_id} />
        ))}
      </Reorder.Group>
      <div className={styles.wrapper_addQuestionsWrapper}>
        <h2 className={styles.wrapper_addQuestionsWrapper_title}>Добавьте вопрос</h2>
        <div className={styles.wrapper_addQuestionsWrapper_btnWrapper}>
          <AddTextOptions setTypeQuestions={setTypeQuestions} setQuestions={setQuestions} questions={questions} />
          <AddOptionsWithPictures setTypeQuestions={setTypeQuestions} setQuestions={setQuestions} questions={questions} />
          <AddPicturesAndOptions setTypeQuestions={setTypeQuestions} setQuestions={setQuestions} questions={questions} />
          <AddFreeForm setTypeQuestions={setTypeQuestions} setQuestions={setQuestions} questions={questions} />
          <AddNumericalTask setTypeQuestions={setTypeQuestions} setQuestions={setQuestions} questions={questions} />
        </div>
      </div>
    </div>
  )
})
