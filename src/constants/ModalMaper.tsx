import React, { ReactElement } from 'react'
import { AddModuleModal } from 'components/Modal/CoursesModal/AddModuleModal'
import { SettingsClassesModal } from '@/components/Modal/CoursesModal/SettingsClassesModal'
import { ModalTypeClasses, SettingClassesUsually, TasksModal, TestModal } from '@/components/Modal'

export const ModalMaper = ({ courseId, lessonIdAndType, setLessonIdAndType, type, setType, modulesList, setModulesList, insertAfterOrder, setInsertAfterOrder, insertAfterModuleOrder, setInsertAfterModuleOrder }: keyof object | any): ReactElement | null => {

  if (type) {
    const modalMapper = {
      setting: <SettingsClassesModal lessonIdAndType={lessonIdAndType} modulesList={modulesList} setType={setType} />,
      lessonsModal: <ModalTypeClasses setType={setType} />,
      lesson: <SettingClassesUsually setLessonIdAndType={setLessonIdAndType} modulesList={modulesList} setType={setType} setModulesList={setModulesList} insertAfterOrder={insertAfterOrder} setInsertAfterOrder = {setInsertAfterOrder} />,
      homework: <TasksModal modulesList={modulesList} setType={setType} setLessonIdAndType={setLessonIdAndType} insertAfterOrder={insertAfterOrder} setInsertAfterOrder={setInsertAfterOrder} />,
      test: <TestModal setLessonIdAndType={setLessonIdAndType} modulesList={modulesList} setType={setType} insertAfterOrder={insertAfterOrder} setInsertAfterOrder={setInsertAfterOrder} />,
      // webinar: <WebinarModal setType={setType} />,
      module: <AddModuleModal courseId={courseId} modulesList={modulesList} setType={setType} insertAfterModuleOrder={insertAfterModuleOrder} setInsertAfterModuleOrder={setInsertAfterModuleOrder} setModulesList = {setModulesList}/>,
    }
    return <div>{modalMapper[type as keyof object]}</div>
  } else {
    return null
  }
}
