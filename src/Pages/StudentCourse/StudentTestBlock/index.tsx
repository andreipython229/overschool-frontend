import { FC, useState, useEffect } from 'react'
import { StudentQuestion } from './StudentQuestion'

import styles from './studentTestBlock.module.scss'
import { StudentTestResults } from './StudentTestResults'
import { selectUser } from '../../../selectors'
import { useSelector } from 'react-redux'
import { AnswersT } from '../../../components/AddQuestion'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { useSendTestResultsMutation } from 'api/userTestService'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'

type questionListT = {
  attempt_count: number
  attempt_limit: boolean
  name: string
  questions: string
  show_right_answers: boolean
  test: string
}
type QuestionT = {
  question_type: keyof object
  body: string
  answers: AnswersT[]
  question_id: number
}

export type AnswersType = {
  [key: string | number]: boolean | string
}

export const StudentTestBlock: FC<any> = ({ lesson, setTestSended, setTestSuccess, lessons, activeLessonIndex, showPreview }) => {
  const [timer, setTimer] = useState<number>(Math.floor(parseFloat(lesson.time_limit)))
  const [finalTime, setFinalTime] = useState<number>(0)
  const [userAnswers, updateUserAnswers] = useState<AnswersType>({})
  const [userAnswerFull, setUserAnswerFull] = useState<AnswersT[]>([])
  const [testCompleted, setTestCompleted] = useState(false)
  const user = useSelector(selectUser)
  const [userPercent, setUserPercent] = useState<number>(0)
  const [questions, setQuestions] = useState<QuestionT[]>([])
  const [showResult, setShowResult] = useState(false)
  const [numberTest, setNumberTest] = useState<number>(1)
  const [startTime] = useState<number>(() => Date.now()) 

  useEffect(() => {
    if (testCompleted && finalTime === 0) {
      const timeUsed = Math.floor((Date.now() - startTime) / 1000) 
      setFinalTime(timeUsed)
    }
  }, [testCompleted])

  useEffect(() => {
    if (testCompleted) return; 

    const intervalId = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(intervalId)
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [testCompleted]) // таймер стартует только при монтировании или смене testCompleted


  const completeTest = () => {
    updateUserAnswers({})
    if (!testCompleted) {
      setTestSended(true)
    }
    setTestCompleted(!testCompleted)
  }

  useEffect(() => {
    setQuestions(lesson.questions)
  }, [lesson])

  useEffect(() => {
    console.log('[useEffect] userPercent:', userPercent);
    if (userPercent >= lesson.success_percent) {
    setTestSuccess(true);
  }
  }, [userPercent])

  useEffect(() => {
    if (questions.length > 0 && numberTest - 1 >= questions.length) {
      setNumberTest(1)
    }
  }, [questions, numberTest])

  if (!questions || questions.length === 0) {
    return <LoaderLayout />
  }

  return (
    <div className={styles.wrapper} key={lesson.test}>
      {testCompleted ? (
        <StudentTestResults
          time={finalTime}
          lessons={lessons}
          activeLessonIndex={activeLessonIndex}
          success_percent={lesson.success_percent}
          user_percent={userPercent}
          questions={questions}
          showRightAnswers={lesson.show_right_answers}
          full_results={userAnswerFull}
          onCompleteTest={completeTest}
          setNumberTest={setNumberTest}
          showResult={showResult}
          showPreview={showPreview}
        />
      ) : (
        <StudentQuestion
          timer={timer}
          questions={questions}
          question={questions[numberTest - 1]}
          length={questions}
          numberTest={numberTest}
          setUserPercent={setUserPercent}
          setNumberTest={setNumberTest}
          userAnswers={userAnswers}
          userAnswerFull={userAnswerFull}
          setUserAnswerFull={setUserAnswerFull}
          updateUserAnswers={updateUserAnswers}
          onCompleteTest={completeTest}
          test={lesson.test}
          user={user.userId}
          setShowResult={setShowResult}
        />
      )}
    </div>
  )
}
