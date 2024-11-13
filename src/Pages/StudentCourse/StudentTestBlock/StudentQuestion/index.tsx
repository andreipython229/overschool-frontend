import { FC, useEffect, useState } from 'react'
import styles from './studentQuestion.module.scss'
import { StudentAnswer } from '../StudentAnswer'
import { Button } from 'components/common/Button/Button'
import { answerT } from 'types/sectionT'
import { AnswersType } from '../index'
import { queryByTestId } from '@testing-library/react'
import { AnswersT } from '../../../../components/AddQuestion'
import { useSendTestResultsMutation } from '../../../../api/userTestService'
import { Pagination } from 'components/Pagination/Pagination'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { bigQuestionIconPath, questionIconPath } from './assets/vectorPath'
import { convertSecondsToTime } from 'utils/convertDate'

export type questionT = {
  question_id: number
  answers: answerT[]
}

export type StudentQuestionT = {
  questions: questionT[] | any
  question: questionT[] | any
  length: any
  numberTest: number
  setNumberTest: any
  userAnswers?: any
  updateUserAnswers?: any
  onCompleteTest: () => void
  userAnswerFull: any
  setUserAnswerFull: any
  test: number | string
  user: any
  setShowResult: any
  setUserPercent: any
  timer?: number
}

export const StudentQuestion: FC<StudentQuestionT> = ({
  questions,
  question,
  length,
  numberTest,
  setNumberTest,
  userAnswers = {},
  updateUserAnswers,
  onCompleteTest,
  userAnswerFull,
  setUserAnswerFull,
  test,
  user,
  setShowResult,
  setUserPercent,
  timer,
}) => {
  const questionLength = length.length
  const schoolName = window.location.href.split('/')[4]
  const nameAnswer = question && question.body.length > 0 ? question.body : ''
  const progress = (100 / questionLength) * numberTest
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
  const [resetSelection, setResetSelection] = useState<boolean>(false)
  const [sendTestResults, { isSuccess }] = useSendTestResultsMutation()

  const handleAnswerSelect = (isCorrect: boolean, answer_id: string, title: string) => {
    const answerIdNum = parseInt(answer_id)
    const selectedAnswer = {
      answer_id: answerIdNum,
      body: title,
      is_correct: isCorrect,
      question: question.question_id,
    }

    updateUserAnswers((prevAnswers: AnswersType) => {
      const currentAnswers = Array.isArray(prevAnswers[question.question_id]) ? prevAnswers[question.question_id] : ([] as number[])
      if (!Array.isArray(currentAnswers)) {
        console.error('Expected currentAnswers to be an array.')
        return prevAnswers
      }
      const updatedAnswers = currentAnswers.includes(answerIdNum)
        ? currentAnswers.filter((id: number) => id !== answerIdNum)
        : [...currentAnswers, answerIdNum]
      return {
        ...prevAnswers,
        [question.question_id]: updatedAnswers,
      }
    })

    setUserAnswerFull((prevUserAnswer: AnswersType) => {
      const currentAnswers = Array.isArray(prevUserAnswer[question.question_id]) ? prevUserAnswer[question.question_id] : ([] as any[])
      if (!Array.isArray(currentAnswers)) {
        console.error('Expected currentAnswers to be an array.')
        return prevUserAnswer
      }
      const updatedAnswers = currentAnswers.some((ans: any) => ans.answer_id === selectedAnswer.answer_id)
        ? currentAnswers.filter((ans: any) => ans.answer_id !== selectedAnswer.answer_id)
        : [...currentAnswers, selectedAnswer]
      return {
        ...prevUserAnswer,
        [question.question_id]: updatedAnswers,
      }
    })

    setButtonDisabled(false)
  }

  const handlePrevQ = () => {
    if (numberTest > 1) {
      setNumberTest(numberTest - 1)
      setResetSelection(true)
    }
    setButtonDisabled(true)
  }

  const handleNextQ = () => {
    setNumberTest(numberTest + 1)
    setResetSelection(true)

    setButtonDisabled(true)
  }

  const percentage = () => {
    const totalQuestions = questions.length
    let correctAnswers = 0

    questions.forEach((question: any) => {
      const questionId = question.question_id
      const userAnswerIds = userAnswers[questionId]

      if (userAnswerIds) {
        const correctAnswerIds = question.answers.filter((answer: any) => answer.is_correct).map((answer: any) => answer.answer_id)
        const isCorrect = userAnswerIds.every((id: number) => correctAnswerIds.includes(id))

        if (isCorrect) {
          correctAnswers += 1
        }
      }
    })

    return parseFloat(((correctAnswers / totalQuestions) * 100).toFixed(2))
  }

  const handleCompleteTest = () => {
    onCompleteTest()
    setUserPercent(percentage())
    const testResults = {
      success_percent: percentage(),
      test: test as number,
      user: user,
    }
    sendTestResults({ body: testResults, schoolName })
      .unwrap()
      .then(() => {
        setShowResult(true)
      })
      .catch((error: { data: any }) => {
        console.log(error.data)
      })
  }

  useEffect(() => {
    if (timer && timer <= 0) {
      handleCompleteTest()
    }
  }, [timer])

  useEffect(() => {
    if (resetSelection) {
      setResetSelection(false)
    }
  }, [resetSelection])

  return (
    <div className={styles.wrapper}>
      <Pagination currentPage={numberTest} paginationRange={Array.from({ length: questions.length }, (_, i) => i + 1)} onPageChange={setNumberTest} />
      <div className={styles.questionBlock}>
        <div className={styles.questionBlock_question}>
          <div
            className={styles.questionBlock_question_questionBlock}
            style={
              question.answers.length && 'picture' in question.answers[0] && question.answers[0].picture
                ? { gridTemplateColumns: '1fr 2fr' }
                : { gridTemplateColumns: '1fr 30rem' }
            }
          >
            <div className={styles.questionBlock_question_questionBlock_content}>
              <div className={styles.questionBlock_question_questionBlock_content_title}>
                <div className={styles.questionBlock_question_questionBlock_content_title_number}>{numberTest}</div>
                <div className={styles.questionBlock_question_questionBlock_content_title_textBlock}>
                  <div className={styles.questionBlock_question_questionBlock_content_title_textBlock_questionTitle}>{question.body}</div>
                  <div className={styles.questionBlock_question_questionBlock_content_title_textBlock_questionSubtitle}>
                    Выберите один или несколько вариантов ответа
                  </div>
                </div>
              </div>
              <div className={styles.questionBlock_question_questionBlock_content_answers}>
                {question?.answers &&
                  question?.answers.map(({ body: answer, answer_id: id, is_correct: isCorrect, picture }: any, index: number) => (
                    <StudentAnswer
                      key={index}
                      id={id}
                      title={answer}
                      name={nameAnswer}
                      isCorrect={isCorrect}
                      resetSelection={resetSelection}
                      onSelect={handleAnswerSelect}
                    />
                  ))}
              </div>
            </div>
            {question.answers.length && 'picture' in question.answers[0] && question.answers[0].picture && (
              <div className={styles.questionBlock_question_questionBlock_images}>
                {question?.answers &&
                  question?.answers.map(({ body: answer, answer_id: id, is_correct: isCorrect, picture }: any, index: number) => (
                    <div className={styles.imageBorder} key={id}>
                      <img src={picture} alt={answer} className={styles.imageBorder_image} />
                      <div className={styles.imageBorder_icon}>{index + 1}</div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className={styles.questionBlock_question_background}>
            <div className={styles.questionBlock_question_background_leftSide}>
              <div className={styles.questionBlock_question_background_leftSide_circleBg}></div>
            </div>
            {question.answers.length && 'picture' in question.answers[0] && question.answers[0].picture ? (
              <div className={styles.questionBlock_question_background_rightSide}>
                <div className={styles.questionBlock_question_background_rightSide_circleBg}></div>
              </div>
            ) : (
              <div className={styles.questionBlock_question_background_rightSide}>
                <IconSvg width={196.435547} height={802.730225} viewBoxSize="0 0 196.436 802.73" path={bigQuestionIconPath}>
                  <defs>
                    <linearGradient
                      x1="4.000000"
                      y1="401.365112"
                      x2="192.435532"
                      y2="401.365112"
                      id="paint_linear_10504_50816_0"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.135000" stopColor="#3170E7" />
                      <stop offset="1.000000" stopColor="#7A90F7" />
                    </linearGradient>
                  </defs>
                </IconSvg>
                <IconSvg width={126} height={163} viewBoxSize="0 0 126 163" path={questionIconPath} />
                <IconSvg width={126} height={163} viewBoxSize="0 0 126 163" path={questionIconPath} />
                <IconSvg width={126} height={163} viewBoxSize="0 0 126 163" path={questionIconPath} />
                <IconSvg width={126} height={163} viewBoxSize="0 0 126 163" path={questionIconPath} />
                <IconSvg width={126} height={163} viewBoxSize="0 0 126 163" path={questionIconPath} />
                <IconSvg width={126} height={163} viewBoxSize="0 0 126 163" path={questionIconPath} />
                <div className={styles.questionBlock_question_background_rightSide_circleBg}></div>
              </div>
            )}
          </div>
          <div className={styles.questionBlock_question_timer}>
            <p>Осталось {convertSecondsToTime(String(timer))}</p>
            <h2>
              Вопросы {numberTest} из {questionLength}
            </h2>
          </div>
          <div className={styles.questionBlock_question_buttons}>
            <Button text="Назад" variant="emptyInside" className={styles.button} disabled={numberTest <= 1} onClick={handlePrevQ} />
            {questionLength > numberTest ? (
              <Button text={'Далее'} onClick={handleNextQ} variant="newPrimary" className={styles.button} disabled={buttonDisabled} />
            ) : (
              <Button text={'Завершить'} onClick={handleCompleteTest} variant="newPrimary" className={styles.button} disabled={buttonDisabled} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
