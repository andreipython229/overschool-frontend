import { FC, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ModalTypeClasses, SettingClassesUsually, TasksModal, TestModal, WebinarModal } from 'components/Modal'
import { useFetchModulesQuery } from 'api/modulesServices'
import { LessonSettings } from './LessonSettings'
import { ModulesAndLessonsBlock } from './ModulesAndLessonsBlock'
import { AddModuleModal } from 'components/Modal/CoursesModal/AddModuleModal'
import { SettingsClassesModal } from 'components/Modal/CoursesModal/SettingsClassesModal'
import { useBoolean } from 'customHooks/useBoolean'

import styles from './constructor.module.scss'

interface ILessons {
  lessons: Array<object>
}

export const Constructor: FC = () => {
  const { course_id: courseId } = useParams()
  const { data: modulesAndLessons } = useFetchModulesQuery(courseId)

  const [modulesList, setModulesList] = useState<Array<object & ILessons>>([])
  const [lessonId, setLessonId] = useState<string>('')

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
    setModulesList(modulesAndLessons?.sections || [])
  }, [courseId, modulesAndLessons])

  return (
    <div className={styles.redactorCourse}>
      {isOpenModalLesson && <ModalTypeClasses changeClasses={setTypeModal} setShowModal={onOpenModalLesson} />}
      {activeTypeClasses === 0 && <SettingClassesUsually closedAll={closedAllModal} addCourse={addCourse} goToBack={goToBack} />}
      {activeTypeClasses === 1 && <TasksModal closedAll={closedAllModal} addCourse={addCourse} goToBack={goToBack} />}
      {activeTypeClasses === 2 && <TestModal closedAll={closedAllModal} goToBack={goToBack} addCourse={addCourse} />}
      {activeTypeClasses === 3 && <WebinarModal closedAll={closedAllModal} addCourse={addCourse} goToBack={goToBack} />}
      {isOpenModalModule && <AddModuleModal setShowModal={onModalModule} courseId={courseId as string} />}
      {isOpenSettingLessonModal && <SettingsClassesModal modulesList={modulesList} lessonId={lessonId} setShowModal={onSettingLessonModal} />}
      <ModulesAndLessonsBlock
        setLessonId={setLessonId}
        modulesList={modulesList || []}
        setModalTypeClasses={toggleOpenModalLesson}
        toggleModalModule={offModalModule}
      />
      {modulesList[0] && modulesList[0].lessons[0] && (
        <LessonSettings modulesList={modulesList} lessonId={lessonId} showSettingsClassesModal={toggleSettingLessonModal} />
      )}
    </div>
  )
}
