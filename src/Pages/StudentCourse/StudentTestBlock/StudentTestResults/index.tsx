import React from 'react'
import { Button } from '../../../../components/common/Button/Button'
import styles from '../StudentQuestion/studentQuestion.module.scss'
import { AnswersT } from '../../../../components/AddQuestion'
import { useNavigate, useParams } from 'react-router-dom'
import { lessonT, sectionT } from 'types/sectionT'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'
import { convertSecondsToTime } from 'utils/convertDate'

type NewAnswer = {
  question_id: number
  question_name: string
}

interface TestResultProps {
  full_results: AnswersT[] | undefined
  success_percent: number
  user_percent: number
  questions: QuestionT[]
  showRightAnswers: boolean
  onCompleteTest: () => void
  setNumberTest: any
  showResult: boolean
  lessons: sectionT
  activeLessonIndex: number
  time?: number
  showPreview: () => void
}

type QuestionT = {
  question_type: keyof object
  body: string
  answers: AnswersT[]
  question_id: number
}

export const StudentTestResults: React.FC<TestResultProps> = ({
  success_percent,
  user_percent,
  onCompleteTest,
  setNumberTest,
  showResult,
  lessons,
  activeLessonIndex,
  time,
  showPreview,
}) => {
  const isSuccess = user_percent >= success_percent
  const { school_name: school, section_id: sectionId, course_id: courseId } = useParams()
  const lessonForward: lessonT = lessons?.lessons[activeLessonIndex + 1]
  const navigate = useNavigate()
  const handleRestartTest = () => {
    onCompleteTest()
    setNumberTest(1)
    showPreview()
  }

  return showResult ? (
    <div className={styles.wrapper}>
      <div className={styles.questionBlock}>
        <div className={styles.questionBlock_question}>
          <div className={styles.questionBlock_question_questionBlock}>
            <div className={styles.questionBlock_question_questionBlock_results}>
              <div className={styles.questionBlock_question_questionBlock_results_header}>
                <div className={styles.questionBlock_question_questionBlock_results_header_time}>
                  Время выполнения: <span>{time ? convertSecondsToTime(String(time)) : '00:00'}</span>
                </div>
                <div className={styles.questionBlock_question_questionBlock_results_header_correctAnswers}>
                  Правильных ответов: <span>{user_percent}%</span>
                </div>
              </div>
              <div className={styles.questionBlock_question_questionBlock_results_success}>
                <div
                  className={styles.questionBlock_question_questionBlock_results_success_circle}
                  style={!isSuccess ? { backgroundColor: 'gray' } : {}}
                >
                  {isSuccess ? (
                    <svg width="90" height="65" viewBox="0 0 90 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M32.2136 65C30.4127 65 28.7019 64.2745 27.4412 63.0049L1.95848 37.3404C-0.652826 34.7105 -0.652826 30.3575 1.95848 27.7276C4.56978 25.0977 8.89194 25.0977 11.5033 27.7276L32.2136 48.5856L78.4967 1.97245C81.1081 -0.657482 85.4302 -0.657482 88.0415 1.97245C90.6528 4.60237 90.6528 8.95535 88.0415 11.5853L36.986 63.0049C35.7254 64.2745 34.0145 65 32.2136 65Z"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M58.7518 65.8187L2.18322 9.25016C0.250458 7.3174 0.250457 4.11185 2.18322 2.17909C4.11597 0.24633 7.32153 0.24633 9.25428 2.17909L65.8228 58.7476C67.7556 60.6804 67.7556 63.8859 65.8228 65.8187C63.8901 67.7515 60.6845 67.7515 58.7518 65.8187Z"
                        fill="white"
                      />
                      <path
                        d="M2.17717 65.8187C0.244416 63.8859 0.244419 60.6804 2.17717 58.7476L58.7457 2.17909C60.6785 0.24633 63.884 0.24633 65.8168 2.17909C67.7495 4.11185 67.7495 7.3174 65.8168 9.25016L37.5325 37.5344L9.24824 65.8187C7.31549 67.7515 4.10993 67.7515 2.17717 65.8187Z"
                        fill="white"
                      />
                    </svg>
                  )}
                </div>
                {isSuccess ? <span>Тест пройден</span> : <span>Тест не пройден</span>}
              </div>
            </div>
          </div>
          <div className={styles.questionBlock_question_background}>
            <div className={styles.questionBlock_question_background_leftSide}>
              <div className={styles.questionBlock_question_background_leftSide_circleBg} style={!isSuccess ? { backgroundColor: 'gray' } : {}}></div>
            </div>
            <div className={styles.questionBlock_question_background_rightSide}>
              <div
                className={styles.questionBlock_question_background_rightSide_circleBg}
                style={!isSuccess ? { backgroundColor: 'gray' } : {}}
              ></div>
            </div>
          </div>
          <div className={styles.questionBlock_question_buttons} style={isSuccess ? { width: '600px' } : { width: '290px' }}>
            <Button text="Попробовать снова" variant="emptyInside" className={styles.button_complete} onClick={handleRestartTest} />

            {isSuccess && (
              <Button
                text={'Далее'}
                onClick={() =>
                  navigate(`/school/${school}/courses/student-course/${courseId}/module/${sectionId}/${lessonForward?.type}/${lessonForward?.id}`)
                }
                variant="newPrimary"
                disabled={lessons.lessons[activeLessonIndex].id === lessonForward?.id}
                className={styles.button_complete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LoaderLayout />
  )
}
