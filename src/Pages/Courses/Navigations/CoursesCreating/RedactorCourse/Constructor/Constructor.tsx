import React, { useState } from "react"
import styles from "./constructor.module.scss"
import { ModalTypeClasses } from "components/Modal"
import { SettingClassesUsually } from "components/Modal"
import { useAppDispatch } from "store/redux/store"
import { TasksModal } from "components/Modal"
import { addClasses } from "store/redux/course/slice"
import { TestModal } from "components/Modal"
import { WebinarModal } from "components/Modal"
import { ClassesSettings } from "./ClassesSettings/ClassesSettings"
import { LessonAddBlock } from "Pages/Courses/Navigations/CoursesCreating/RedactorCourse/Constructor/LessonAddBlock/LessonAddBlock"

export const Constructor = () => {
  const dispatch = useAppDispatch()
  const [typeClassesModal, setTypeClassesModal] = useState<boolean>(false)
  const [activeTypeClasses, setActiveTypeClasses] = useState<null | number>(null)

  const setModalTypeClasses = () => {
    setTypeClassesModal(!typeClassesModal)
  }

  const goToBack = () => {
    setModalTypeClasses()
    setActiveTypeClasses(null)
  }

  const closedAllModal = () => {
    setActiveTypeClasses(null)
  }

  const setTypeModal = (id: number) => {
    setActiveTypeClasses(id)
    setModalTypeClasses()
  }

  const addCourse = (name: string, type: string) => {
    setActiveTypeClasses(null)
    dispatch(addClasses({ name, type }))
  }

  return (
    <div className={styles.redactorCourse}>
      {typeClassesModal && (
        <ModalTypeClasses changeClasses={setTypeModal} closeModal={setModalTypeClasses} />
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

      <LessonAddBlock setModalTypeClasses={setModalTypeClasses} />
      <ClassesSettings />
    </div>
  )
}
