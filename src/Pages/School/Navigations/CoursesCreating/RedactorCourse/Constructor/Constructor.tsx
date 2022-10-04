import { FC, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ModalTypeClasses, SettingClassesUsually, TasksModal, TestModal, WebinarModal } from 'components/Modal'
import { useFetchModulesQuery } from 'api/modulesServices'
import { LessonSettings } from './LessonSettings'
import { ModulesAndLessonsBlock } from './ModulesAndLessonsBlock'
import { AddModuleModal } from 'components/Modal/CoursesModal/AddModuleModal'
import { SettingsClassesModal } from 'components/Modal/CoursesModal/SettingsClassesModal'
import { useBoolean } from 'customHooks/useBoolean'
import { modulesListT } from '../../../navigationTypes'
import { lessonIdAndTypeT } from 'components/Modal/ModalTypes'

import styles from './constructor.module.scss'

export const Constructor: FC = () => {
  const { course_id: courseId } = useParams()
  const { data: modulesAndLessons } = useFetchModulesQuery(courseId)

  const [modulesList, setModulesList] = useState<modulesListT[]>([])

  const [lessonIdAndType, setLessonIdAndType] = useState<lessonIdAndTypeT>({} as lessonIdAndTypeT)

  const [isOpenSettingLessonModal, { onToggle: toggleSettingLessonModal, on: onSettingLessonModal }] = useBoolean()

  const [isOpenModalModule, { on: onModalModule, off: offModalModule }] = useBoolean()

  const [isOpenModalLesson, { onToggle: toggleOpenModalLesson, on: onOpenModalLesson }] = useBoolean()

  const [activeTypeClasses, setActiveTypeClasses] = useState<null | number>(null)

  const goToBack = useCallback(() => {
    toggleOpenModalLesson()
    setActiveTypeClasses(null)
  }, [activeTypeClasses, isOpenModalLesson])

  const closedAllModal = useCallback(() => {
    setActiveTypeClasses(null)
  }, [activeTypeClasses])

  const setTypeModal = useCallback(
    (id: number) => {
      setActiveTypeClasses(id)
      toggleOpenModalLesson()
    },
    [activeTypeClasses, isOpenModalLesson],
  )

  const addCourse = useCallback(() => {
    setActiveTypeClasses(null)
  }, [activeTypeClasses])

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
      {isOpenModalLesson && <ModalTypeClasses changeClasses={setTypeModal} setShowModal={onOpenModalLesson} />}
      {activeTypeClasses === 0 && (
        <SettingClassesUsually modulesList={modulesList} closedAll={closedAllModal} addCourse={addCourse} goToBack={goToBack} />
      )}
      {activeTypeClasses === 1 && <TasksModal modulesList={modulesList} closedAll={closedAllModal} addCourse={addCourse} goToBack={goToBack} />}
      {activeTypeClasses === 2 && <TestModal modulesList={modulesList} closedAll={closedAllModal} goToBack={goToBack} addCourse={addCourse} />}
      {activeTypeClasses === 3 && <WebinarModal closedAll={closedAllModal} addCourse={addCourse} goToBack={goToBack} />}
      {isOpenModalModule && <AddModuleModal setShowModal={onModalModule} courseId={courseId as string} />}
      {isOpenSettingLessonModal && (
        <SettingsClassesModal modulesList={modulesList} lessonIdAndType={lessonIdAndType} setShowModal={onSettingLessonModal} />
      )}
      <ModulesAndLessonsBlock
        setLessonIdAndType={setLessonIdAndType}
        modulesList={modulesList || []}
        setModalTypeClasses={toggleOpenModalLesson}
        toggleModalModule={offModalModule}
      />
      {modulesList[0] && modulesList[0].lessons[0] && (
        <LessonSettings lessonIdAndType={lessonIdAndType} showSettingsClassesModal={toggleSettingLessonModal} />
      )}
    </div>
  )
}
