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
import {StudentLessonNavBtns} from '../StudentLessonNavBtns'
import {LESSON_TYPE} from "../../../../enum/lessonTypeE";

type studentTestT = {
  lesson: ITest
  lessons: sectionT
  params: Params
  activeLessonIndex: number
}

export const StudentTest: FC<studentTestT> = ({ lesson, lessons, params , activeLessonIndex}) => {
    const { course_id: courseId, section_id: sectionId, lesson_id: lessonId, lesson_type: lessonType } = params

  const [isOpenTest, { on: closeTest, off: openTest }] = useBoolean()

  return (
    <div className={styles.wrapper}>
      <StudentCourseNavArr />
      <div className={styles.wrapper_title}>{activeLessonIndex + 1}. {lesson?.name}</div>
      <div className={styles.wrapper_testWrapper}>
        {!isOpenTest && lessonType !== 'lesson' ? <StudentTestPreview setShow={openTest} /> : isOpenTest && <StudentTestBlock lesson={lesson} />}
      </div>
        <StudentLessonNavBtns
                        courseId={`${courseId}`}
                        lessonId={`${lessonId}`}
                        sectionId={`${sectionId}`}
                        lessonType={`${lessonType}` as LESSON_TYPE}
                        activeLessonIndex={activeLessonIndex as number}
                        lessons={lessons as sectionT}
                    />
    </div>
  )
}
