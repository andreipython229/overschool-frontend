import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { StudentTest } from './StudentTest/index'
import { StudentHomework } from './StudentHomework/index'
import { StudentLesson } from './StudentLesson/index'
import { LESSON_TYPE } from 'enum/lessonTypeE'
import { useFetchLessonQuery, useFetchModuleLessonsQuery } from '../../../api/modulesServices'

export const StudentLessonPreview: FC = () => {
  const params = useParams()

  const { data: lessons, isSuccess } = useFetchModuleLessonsQuery(`${params?.section_id}`)
  const { data: lesson } = useFetchLessonQuery({ id: Number(params?.lesson_id) as number, type: `${params?.lesson_type}` })

  const renderUI = () => {
    if (isSuccess) {
      switch (lesson?.type) {
        case LESSON_TYPE.LESSON:
          return <StudentLesson lessons={lessons} lesson={lesson} params={params} />
        case LESSON_TYPE.HOMEWORK:
          return <StudentHomework lessons={lessons} lesson={lesson} params={params} />
        case LESSON_TYPE.TEST:
          return <StudentTest />
      }
    }
  }

  return <>{renderUI()}</>
}
