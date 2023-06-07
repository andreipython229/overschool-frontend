import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { StudentTest } from './StudentTest'
import { StudentHomework } from './StudentHomework'
import { StudentLesson } from './StudentLesson'
import { LESSON_TYPE } from 'enum/lessonTypeE'
import { useFetchLessonQuery, useFetchModuleLessonsQuery } from '../../../api/modulesServices'
import { useFetchQuestionsListQuery } from '../../../api/questionsAndAnswersService'
import { StudentLessonSidebar } from './StudentLessonSidebar/index'
import { sectionT } from 'types/sectionT'

import styles from './lesson.module.scss'

export const StudentLessonPreview: FC = () => {
  const params = useParams()

  const testId = params?.lesson_type === 'test' && params?.lesson_id

  const { data: lessons, isSuccess } = useFetchModuleLessonsQuery(`${params?.section_id}`)
  const { data: lesson } = useFetchLessonQuery({ id: Number(params?.lesson_id) as number, type: `${params?.lesson_type}` })
  const { data: questionsList } = useFetchQuestionsListQuery(testId)

  const activeLessonIndex = lessons?.lessons.findIndex(lesson => `${lesson.id}` === params?.lesson_id && lesson.type === params?.lesson_type)

  const renderUI = () => {
    if (isSuccess) {
      switch (lesson?.type) {
        case LESSON_TYPE.LESSON:
          return <StudentLesson lessons={lessons} lesson={lesson} params={params} activeLessonIndex={activeLessonIndex as number} />
        case LESSON_TYPE.HOMEWORK:
          return <StudentHomework lessons={lessons} lesson={lesson} params={params} activeLessonIndex={activeLessonIndex as number} />
        case LESSON_TYPE.TEST:
          return <StudentTest lessons={lessons} lesson={questionsList} params={params} />
      }
    }
  }

  return (
    <div className={styles.lesson_wrapper}>
      {renderUI()}
      <StudentLessonSidebar
        lessonType={`${params?.lesson_type}` as LESSON_TYPE}
        courseId={`${params?.course_id}`}
        sectionId={`${params?.section_id}`}
        activeLessonIndex={activeLessonIndex as number}
        lessons={lessons as sectionT}
      />
    </div>
  )
}
