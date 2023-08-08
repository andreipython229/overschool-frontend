import { FC } from 'react'
import { Params } from 'react-router-dom'

import styles from './studentTest.module.scss'
// import { useFetchQuestionsListQuery } from '../../../../api/questionsAndAnswersService'
import { sectionT, ITest } from 'types/sectionT'
import { StudentCourseNavArr } from '../StudentCourseNavArr'
// import { StudentLessonSidebar } from '../StudentLessonSidebar'
import { StudentTestPreview } from '../StudentTestPreview'
import { useBoolean } from '../../../../customHooks'
import { StudentTestBlock } from 'Pages/StudentCourse/StudentTestBlock'

type studentTestT = {
  lesson: ITest
  lessons: sectionT
  params: Params
}
export const StudentTest: FC<studentTestT> = ({ lesson, lessons, params }) => {
  const { course_id: courseId, section_id: sectionId, lesson_id: lessonId, lesson_type: lessonType } = params

  const [isOpenTest, { on: closeTest, off: openTest }] = useBoolean()

  return (
    <div className={styles.wrapper}>
      <StudentCourseNavArr />
      <div className={styles.wrapper_title}>{lesson?.name}</div>
      <div className={styles.wrapper_testWrapper}>
        {!isOpenTest && lessonType !== 'lesson' ? <StudentTestPreview setShow={openTest} /> : isOpenTest && <StudentTestBlock lesson={lesson} />}
      </div>
    </div>
  )
}
