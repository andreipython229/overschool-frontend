import React, { useCallback, useState } from 'react'
import {
  ModalTypeClasses,
  SettingClassesUsually,
  TasksModal,
  TestModal,
  WebinarModal,
} from 'components/Modal'

import { useAppDispatch } from '../../../../../../store/hooks'
import { addClasses } from 'store/redux/course/slice'
import { ClassesSettings } from './ClassesSettings/ClassesSettings'
import { LessonAddBlock } from 'Pages/Courses/Navigations/CoursesCreating/RedactorCourse/Constructor/LessonAddBlock/LessonAddBlock'
import { AddModuleModal } from 'components/Modal/CoursesModal/AddModuleModal'
import { SettingsClassesModal } from 'components/Modal/CoursesModal/SettingsClassesModal'

import styles from './constructor.module.scss'

export const Constructor = () => {
  const dispatch = useAppDispatch()
  const [typeClassesModal, setTypeClassesModal] = useState<boolean>(false)
  const [showModalModule, setShowModalModule] = useState<boolean>(false)
  const [settingClassesModal, setSettingClassesModal] = useState<boolean>(false)

  const [activeTypeClasses, setActiveTypeClasses] = useState<null | number>(null)

  const showSettingsClasses = useCallback(() => {
    setSettingClassesModal(!settingClassesModal)
  }, [settingClassesModal])

  const toggleModalModule = useCallback(() => {
    setShowModalModule(!showModalModule)
  }, [showModalModule])

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
      dispatch(addClasses({ name, type }))
    },
    [activeTypeClasses],
  )

  return (
    <div className={styles.redactorCourse}>
      {typeClassesModal && (
        <ModalTypeClasses changeClasses={setTypeModal} setShowModal={setTypeClassesModal} />
      )}
      {activeTypeClasses === 0 && (
        <SettingClassesUsually
          closedAll={closedAllModal}
          addCourse={addCourse}
          goToBack={goToBack}
        />
      )}
      {activeTypeClasses === 1 && (
        <TasksModal closedAll={closedAllModal} addCourse={addCourse} goToBack={goToBack} />
      )}
      {activeTypeClasses === 2 && (
        <TestModal closedAll={closedAllModal} goToBack={goToBack} addCourse={addCourse} />
      )}
      {activeTypeClasses === 3 && (
        <WebinarModal closedAll={closedAllModal} addCourse={addCourse} goToBack={goToBack} />
      )}

      {showModalModule && <AddModuleModal setShowModal={setShowModalModule} />}
      {settingClassesModal && <SettingsClassesModal setShowModal={setSettingClassesModal} />}

      <LessonAddBlock
        setModalTypeClasses={setModalTypeClasses}
        toggleModalModule={toggleModalModule}
      />
      <ClassesSettings showSettingsClassesModal={showSettingsClasses} />
    </div>
  )
}
