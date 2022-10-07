import React from 'react'
import { AddModuleModal } from 'components/Modal/CoursesModal/AddModuleModal'
import { SettingsClassesModal } from '../components/Modal/CoursesModal/SettingsClassesModal'
import { ModalTypeClasses, SettingClassesUsually, TasksModal, TestModal, WebinarModal } from '../components/Modal'

export const ModalMaper = ({ lessonIdAndType, type, setType, modulesList }: keyof object | any): JSX.Element | null => {
  if (type) {
    const modalMapper = {
      setting: <SettingsClassesModal lessonIdAndType={lessonIdAndType} modulesList={modulesList} setType={setType} />,
      lessonsModal: <ModalTypeClasses setType={setType} />,
      lesson: <SettingClassesUsually modulesList={modulesList} setType={setType} />,
      homework: <TasksModal modulesList={modulesList} setType={setType} />,
      test: <TestModal modulesList={modulesList} setType={setType} />,
      webinar: <WebinarModal setType={setType} />,
      module: <AddModuleModal modulesList={modulesList} setType={setType} />,
    }
    return <div>{modalMapper[type as keyof object]}</div>
  } else {
    return null
  }
}
