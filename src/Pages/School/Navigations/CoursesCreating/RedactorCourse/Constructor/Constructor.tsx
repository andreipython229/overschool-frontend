import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { sectionT } from '../../../../../../types/sectionT'
import { useDeleteLessonsMutation, useFetchModulesQuery } from 'api/modulesServices'
import { ModulesAndLessonsBlock } from './ModulesAndLessonsBlock'
import { Portal } from 'components/Modal/Portal'
import { ModalMaper } from 'constants/ModalMaper'
import { LessonSettings } from './LessonSettings'

import { lessonIdAndTypeT } from 'components/Modal/ModalTypes'

import styles from './constructor.module.scss'
import { SimpleLoader } from '../../../../../../components/Loaders/SimpleLoader'

export const Constructor: FC = () => {
  const { course_id: courseId } = useParams()

  const { data: modulesAndLessons, isSuccess } = useFetchModulesQuery(courseId as string)

  const [deleteLesson, { isLoading: isLoad }] = useDeleteLessonsMutation()

  const [modulesList, setModulesList] = useState<sectionT[]>([])

  const [lessonIdAndType, setLessonIdAndType] = useState<lessonIdAndTypeT>({} as lessonIdAndTypeT)

  const [type, setType] = useState<keyof object | null>(null)

  const [check, setCheck] = useState(false)

  const handleCloseAllModal = () => {
    setType(null as keyof object)
  }

  useEffect(() => {
    if (modulesAndLessons?.sections.length) {
      setModulesList(modulesAndLessons?.sections)
      setCheck(true)
      const initialState = {
        id: modulesAndLessons?.sections[0]?.lessons[0]?.id,
        type: modulesAndLessons?.sections[0]?.lessons[0]?.type,
      }
      if (!lessonIdAndType.type || isLoad) {
        setLessonIdAndType(initialState)
      }
    }
  }, [courseId, modulesAndLessons?.sections, lessonIdAndType.type, isLoad])

  const isLoading = modulesList[0] && modulesList[0].lessons[0] && lessonIdAndType.type

  if (!isSuccess)
    return (
      <div className={styles.loader_container}>
        <SimpleLoader />
      </div>
    )

  return (
    <div className={styles.redactorCourse}>
      <ModulesAndLessonsBlock setType={setType} setLessonIdAndType={setLessonIdAndType} modulesList={modulesList || []} isLoading={check} />
      {isLoading && <LessonSettings deleteLesson={deleteLesson} lessonIdAndType={lessonIdAndType} setType={setType} />}
      {type && (
        <Portal closeModal={handleCloseAllModal}>
          <ModalMaper
            lessonIdAndType={lessonIdAndType}
            setLessonIdAndType={setLessonIdAndType}
            modulesList={modulesList}
            setModulesList={setModulesList}
            setType={setType}
            type={type}
            courseId={courseId}
          />
        </Portal>
      )}
    </div>
  )
}
