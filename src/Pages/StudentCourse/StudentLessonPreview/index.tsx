import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { StudentTest } from './StudentTest'
import { StudentHomework } from './StudentHomework'
import { StudentLesson } from './StudentLesson'
import { LESSON_TYPE } from 'enum/lessonTypeE'
import {
  useFetchLessonQuery,
  useFetchModuleLessonsQuery,
  useLazyFetchLessonQuery,
  useLazyFetchModuleLessonsQuery,
} from '../../../api/modulesServices'
import { StudentLessonSidebar } from './StudentLessonSidebar'
import { sectionT } from 'types/sectionT'

import styles from './lesson.module.scss'
import { SimpleLoader } from '../../../components/Loaders/SimpleLoader'

export const StudentLessonPreview: FC = () => {
  const params = useParams()
  const schoolName = window.location.href.split('/')[4]

  const [fetchLessons, { data: lessons, isSuccess }] = useLazyFetchModuleLessonsQuery()
  const { data: lesson, isFetching: isLoading } = useFetchLessonQuery({
    id: Number(params?.lesson_id),
    type: `${params?.lesson_type}`,
    schoolName,
  })

  useEffect(() => {
    if (params) {
      fetchLessons({ sectionId: String(params.section_id), schoolName })
    }
  }, [params])

  const activeLessonIndex = lessons?.lessons.findIndex(lesson => `${lesson.id}` === params?.lesson_id && lesson.type === params?.lesson_type)

  const renderUI = () => {
    if (isSuccess && lessons) {
      switch (lesson?.type) {
        case LESSON_TYPE.LESSON:
          return <StudentLesson lessons={lessons} lesson={lesson} params={params} activeLessonIndex={activeLessonIndex as number} />
        case LESSON_TYPE.HOMEWORK:
          return <StudentHomework lessons={lessons} lesson={lesson} params={params} activeLessonIndex={activeLessonIndex as number} />
        case LESSON_TYPE.TEST:
          return <StudentTest lessons={lessons} params={params} activeLessonIndex={activeLessonIndex as number} />
      }
    }
  }

  if (!isLoading && isSuccess) {
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
  } else {
    return <SimpleLoader />
  }
}
