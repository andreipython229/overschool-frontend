import { FC, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ModalTypeClasses, SettingClassesUsually, TasksModal, TestModal, WebinarModal } from 'components/Modal'

import { LessonSettings } from './LessonSettings'
import { ModulesAndLessonsBlock } from './ModulesAndLessonsBlock'
import { AddModuleModal } from 'components/Modal/CoursesModal/AddModuleModal'
import { SettingsClassesModal } from 'components/Modal/CoursesModal/SettingsClassesModal'
import { useFetchModulesQuery } from 'api/modulesServices'
import { useBoolean } from 'customHooks/useBoolean'

import styles from './constructor.module.scss'

export const Constructor: FC = () => {
  const { course_id: courseId } = useParams()

  const [modulesList, setModulesList] = useState<Array<object>>([])
  const [lessonId, setLessonId] = useState('')

  const { data: modulesAndLessons } = useFetchModulesQuery(courseId)

  console.log(modulesAndLessons)

  const [isOpenModalModule, { on: onModalModule, off: offModalModule }] = useBoolean()

  const [typeClassesModal, setTypeClassesModal] = useState<boolean>(false)
  const [settingClassesModal, setSettingClassesModal] = useState<boolean>(false)

  const [activeTypeClasses, setActiveTypeClasses] = useState<null | number>(null)

  const showSettingsClasses = useCallback(() => {
    setSettingClassesModal(!settingClassesModal)
  }, [settingClassesModal])

  const setModalTypeClasses = useCallback(() => {
    setTypeClassesModal(!typeClassesModal)
  }, [typeClassesModal])

  const goToBack = useCallback(() => {
    setModalTypeClasses()
    setActiveTypeClasses(null)
  }, [activeTypeClasses, typeClassesModal])

  const closedAllModal = useCallback(() => {
    setActiveTypeClasses(null)
  }, [activeTypeClasses])

  const setTypeModal = useCallback(
    (id: number) => {
      setActiveTypeClasses(id)
      setModalTypeClasses()
    },
    [activeTypeClasses, typeClassesModal],
  )

  const addCourse = useCallback(
    (name: string, type: string) => {
      setActiveTypeClasses(null)
    },
    [activeTypeClasses],
  )
  useEffect(() => {
    if (modulesAndLessons?.sections) {
      setModulesList(modulesAndLessons?.sections)
    }
  }, [courseId, modulesAndLessons])
  return (
    <div className={styles.redactorCourse}>
      {typeClassesModal && <ModalTypeClasses changeClasses={setTypeModal} setShowModal={setTypeClassesModal} />}
      {activeTypeClasses === 0 && <SettingClassesUsually closedAll={closedAllModal} addCourse={addCourse} goToBack={goToBack} />}
      {activeTypeClasses === 1 && <TasksModal closedAll={closedAllModal} addCourse={addCourse} goToBack={goToBack} />}
      {activeTypeClasses === 2 && <TestModal closedAll={closedAllModal} goToBack={goToBack} addCourse={addCourse} />}
      {activeTypeClasses === 3 && <WebinarModal closedAll={closedAllModal} addCourse={addCourse} goToBack={goToBack} />}
      {isOpenModalModule && <AddModuleModal setShowModal={onModalModule} courseId={courseId as string} />}
      {settingClassesModal && <SettingsClassesModal setShowModal={setSettingClassesModal} />}
      <ModulesAndLessonsBlock
        setLessonId={setLessonId}
        setModalTypeClasses={setModalTypeClasses}
        toggleModalModule={offModalModule}
        modulesList={modulesList}
      />
      {modulesList.length !== 0 && <LessonSettings modulesList={modulesList} lessonId={lessonId} showSettingsClassesModal={showSettingsClasses} />}
    </div>
  )
}
