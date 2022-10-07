import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchModulesQuery } from 'api/modulesServices'
import { ModulesAndLessonsBlock } from './ModulesAndLessonsBlock'
import { Portal } from 'components/Modal/Portal'
import { ModalMaper } from 'constants/ModalMaper'
import { LessonSettings } from './LessonSettings'

import { modulesListT } from '../../../navigationTypes'
import { lessonIdAndTypeT } from 'components/Modal/ModalTypes'

import styles from './constructor.module.scss'

export const Constructor: FC = () => {
  const { course_id: courseId } = useParams()
  const { data: modulesAndLessons } = useFetchModulesQuery(courseId)

  const [modulesList, setModulesList] = useState<modulesListT[]>([])

  const [lessonIdAndType, setLessonIdAndType] = useState<lessonIdAndTypeT>({} as lessonIdAndTypeT)

  const [type, setType] = useState<keyof object | null>(null)

  const handleCloseAllModal = () => {
    setType(null as keyof object)
  }

  useEffect(() => {
    if (modulesAndLessons?.sections.length) {
      setModulesList(modulesAndLessons?.sections)
      const initialState = {
        id: modulesAndLessons?.sections[0]?.lessons[0]?.id,
        type: modulesAndLessons?.sections[0]?.lessons[0]?.type,
      }
      setLessonIdAndType(initialState)
    }
  }, [courseId, modulesAndLessons?.sections])

  return (
    <div className={styles.redactorCourse}>
      <ModulesAndLessonsBlock setType={setType} setLessonIdAndType={setLessonIdAndType} modulesList={modulesList || []} />
      {modulesList[0] && modulesList[0].lessons[0] && <LessonSettings lessonIdAndType={lessonIdAndType} setType={setType} />}
      {type && (
        <Portal closeModal={handleCloseAllModal}>
          <ModalMaper lessonIdAndType={lessonIdAndType} modulesList={modulesList} setType={setType} type={type} />
        </Portal>
      )}
    </div>
  )
}
