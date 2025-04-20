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
import { LoaderLayout } from 'components/Loaders/LoaderLayout'
import { useFetchCourseQuery } from 'api/coursesServices'
import { useAppSelector } from 'store/hooks'
import { schoolSelector } from 'selectors'

export const Constructor: FC = () => {
  const { schoolName } = useAppSelector(schoolSelector)
  const { course_id: courseId } = useParams()

  const { data: course } = useFetchCourseQuery({ id: courseId as string, schoolName })

  const { data: modulesAndLessons, isSuccess } = useFetchModulesQuery({ id: courseId as string, schoolName })

  const [deleteLesson, { isLoading: isLoad }] = useDeleteLessonsMutation()

  const [modulesList, setModulesList] = useState<sectionT[]>([])

  const [lessonIdAndType, setLessonIdAndType] = useState<lessonIdAndTypeT>({} as lessonIdAndTypeT)

  const [type, setType] = useState<keyof object | null>(null)

  const [check, setCheck] = useState(false)

  const [show, setShow] = useState(false)

  const [insertAfterOrder, setInsertAfterOrder] = useState<number | undefined>(undefined) //state для передачи order урока
  const [insertAfterModuleOrder, setInsertAfterModuleOrder] = useState<number | undefined>(undefined) //state для передачи order модуля

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

  const handleSetShow = () => {
    setShow(!show)
  }

  const isLoading = modulesList[0] && modulesList[0].lessons[0] && lessonIdAndType.type

  const hasLesson = modulesList.some(module => module.lessons && module.lessons.length > 0)

  if (!isSuccess) return <LoaderLayout />

  return (
    <div className={styles.redactorCourse}>
      <ModulesAndLessonsBlock
        setType={setType}
        setModulesList={setModulesList}
        setLessonIdAndType={setLessonIdAndType}
        modulesList={modulesList || []}
        isLoading={check}
        baseLessonId={lessonIdAndType.baseLessonId}
        courseName={course?.name || ''}
        setInsertAfterOrder={setInsertAfterOrder}
        setInsertAfterModuleOrder={setInsertAfterModuleOrder}
      />
      {hasLesson && <LessonSettings deleteLesson={deleteLesson} lessonIdAndType={lessonIdAndType} setType={setType} />}
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
            insertAfterOrder={insertAfterOrder}
            setInsertAfterOrder={setInsertAfterOrder}
            insertAfterModuleOrder={insertAfterModuleOrder}
            setInsertAfterModuleOrder={setInsertAfterModuleOrder}
          />
        </Portal>
      )}
    </div>
  )
}