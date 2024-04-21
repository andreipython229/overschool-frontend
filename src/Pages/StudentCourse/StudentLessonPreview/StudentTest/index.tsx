import { FC, useEffect, useState } from 'react'
import { Params } from 'react-router-dom'

import styles from './studentTest.module.scss'
import { sectionT, ITest } from 'types/sectionT'
import { StudentCourseNavArr } from '../StudentCourseNavArr'
import { StudentTestPreview } from '../StudentTestPreview'
import { useBoolean } from '../../../../customHooks'
import { StudentTestBlock } from 'Pages/StudentCourse/StudentTestBlock'
import { StudentLessonNavBtns } from '../StudentLessonNavBtns'
import { LESSON_TYPE } from '../../../../enum/lessonTypeE'
import { useFetchQuestionsListQuery, useGetUserTestsByTestMutation } from '../../../../api/questionsAndAnswersService'
import { SimpleLoader } from '../../../../components/Loaders/SimpleLoader'

type studentTestT = {
  lessons: sectionT
  params: Params
  activeLessonIndex: number
  sended?: boolean
  completed?: boolean
}

export const StudentTest: FC<studentTestT> = ({ lessons, params, activeLessonIndex, sended, completed}) => {
  const { course_id: courseId, section_id: sectionId, lesson_id: lessonId, lesson_type: lessonType } = params
  const schoolName = window.location.href.split('/')[4]
  const { data: lesson, isFetching } = useFetchQuestionsListQuery({ id: String(lessonId), schoolName })
  const [getUsertests] = useGetUserTestsByTestMutation()
  const [passStatus, setPassStatus] = useState('')
  const [testSended, setTestSended] = useState(sended)
  const [testSuccess, setTestSuccess] = useState(completed)
  const [nextDisabled, setNextDisabled] = useState(false)

  useEffect(() => {
    getUsertests({ id: String(lessonId), schoolName }).then((data: any) => {
      const usertests = data.data
      if (usertests.length) {
        const passedTest = usertests.filter((usertest: any) => usertest.status === true)
        passedTest.length ? setPassStatus('passed') : setPassStatus('not_passed')
      }
    })
  }, [lessonId])

  useEffect(() => {
    const disabled = lessons.group_settings.submit_test_to_go_on && !testSended || lessons.group_settings.success_test_to_go_on && !testSuccess
    setNextDisabled(disabled)
  }, [testSended, testSuccess])

  const [isOpenTest, { on: closeTest, off: openTest }] = useBoolean()

  if (!isFetching) {
    return (
      <div className={styles.wrapper}>
        <StudentCourseNavArr />
        <div className={styles.wrapper_title}>
          {activeLessonIndex + 1}. {lesson?.name}
        </div>
        <div className={styles.wrapper_testWrapper}>
          {!isOpenTest && lessonType !== 'lesson' ? (
            <StudentTestPreview passStatus={passStatus} setTestSended={setTestSended} setTestSuccess={setTestSuccess} setShow={openTest} />
          ) : (
            isOpenTest && <StudentTestBlock lesson={lesson} setTestSended={setTestSended} setTestSuccess={setTestSuccess}/>
          )}
        </div>
        <StudentLessonNavBtns
          courseId={`${courseId}`}
          lessonId={`${lessonId}`}
          sectionId={`${sectionId}`}
          lessonType={`${lessonType}` as LESSON_TYPE}
          activeLessonIndex={activeLessonIndex as number}
          nextDisabled={nextDisabled}
          lessons={lessons as sectionT}
        />
      </div>
    )
  } else {
    return <SimpleLoader />
  }
}
