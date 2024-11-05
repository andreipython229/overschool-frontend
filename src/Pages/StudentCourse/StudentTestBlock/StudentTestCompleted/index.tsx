import React, { useEffect, useState } from 'react'
import { Button } from '../../../../components/common/Button/Button'
import styles from '../StudentQuestion/studentQuestion.module.scss'
import { Params, useNavigate, useParams } from 'react-router-dom'
import { lessonT, sectionT } from 'types/sectionT'
import { arrowLeftIconPath } from 'config/commonSvgIconsPath'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { StudentLessonNavBtns } from 'Pages/StudentCourse/StudentLessonPreview/StudentLessonNavBtns'
import { LESSON_TYPE } from 'enum/lessonTypeE'

interface TestCompleted {
  lessons: sectionT
  activeLessonIndex: number
  params: Params
}

export const CompletedTest: React.FC<TestCompleted> = ({ lessons, activeLessonIndex }) => {
  const { school_name: school, course_id: courseId, section_id: sectionId, lesson_id: lessonId, lesson_type: lessonType } = useParams()
  const lessonForward: lessonT = lessons?.lessons[activeLessonIndex + 1]
  const navigate = useNavigate()

  return (
    <div className={styles.wrapper}>
      <div className={styles.lessonHeader}>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <h2 className={styles.lessonHeader_title}>{lessons.lessons[activeLessonIndex].name}</h2>
        </div>
        <div className={styles.lessonHeader_nav}>
          <Button text={'К материалам курса'} onClick={() => navigate('../')} variant="emptyInside" className={styles.lessonHeader_backToMaterials}>
            <IconSvg viewBoxSize="0 0 24 24" height={24} width={24} path={arrowLeftIconPath} />
          </Button>
          <StudentLessonNavBtns
            courseId={`${courseId}`}
            lessonId={`${lessonId}`}
            sectionId={`${sectionId}`}
            lessonType={`${lessonType}` as LESSON_TYPE}
            activeLessonIndex={activeLessonIndex as number}
            nextDisabled={false}
            lessons={lessons as sectionT}
          />
        </div>
      </div>
      <div className={styles.questionBlock}>
        <div className={styles.questionBlock_question}>
          <div className={styles.questionBlock_question_questionBlock}>
            <div className={styles.questionBlock_question_questionBlock_results}>
              <div className={styles.questionBlock_question_questionBlock_results_header}>
                <div className={styles.questionBlock_question_questionBlock_results_header_time}>{/* Время выполнения: <span>00:00</span> */}</div>
                <div className={styles.questionBlock_question_questionBlock_results_header_correctAnswers}>
                  {/* Правильных ответов: <span>{user_percent}%</span> */}
                </div>
              </div>
              <div className={styles.questionBlock_question_questionBlock_results_success}>
                <div className={styles.questionBlock_question_questionBlock_results_success_circle}>
                  <svg width="90" height="65" viewBox="0 0 90 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M32.2136 65C30.4127 65 28.7019 64.2745 27.4412 63.0049L1.95848 37.3404C-0.652826 34.7105 -0.652826 30.3575 1.95848 27.7276C4.56978 25.0977 8.89194 25.0977 11.5033 27.7276L32.2136 48.5856L78.4967 1.97245C81.1081 -0.657482 85.4302 -0.657482 88.0415 1.97245C90.6528 4.60237 90.6528 8.95535 88.0415 11.5853L36.986 63.0049C35.7254 64.2745 34.0145 65 32.2136 65Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <span>Тест пройден</span>
              </div>
            </div>
          </div>
          <div className={styles.questionBlock_question_background}>
            <div className={styles.questionBlock_question_background_leftSide}>
              <div className={styles.questionBlock_question_background_leftSide_circleBg}></div>
            </div>
            <div className={styles.questionBlock_question_background_rightSide}>
              <div className={styles.questionBlock_question_background_rightSide_circleBg}></div>
            </div>
          </div>
          <div className={styles.questionBlock_question_buttons} style={{ width: '290px' }}>
            <Button
              text={'Далее'}
              onClick={() =>
                navigate(`/school/${school}/courses/student-course/${courseId}/module/${sectionId}/${lessonForward?.type}/${lessonForward?.id}`)
              }
              variant="newPrimary"
              className={styles.button_complete}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
