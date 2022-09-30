import { FC } from 'react'
import { Button } from 'components/common/Button/Button'
import { useAppDispatch } from 'store/hooks'
import { showModal } from 'store/redux/modal/slice'
import { ModulesBlock } from './ModulesBlock'
import { LessonAddBlockPropsT, modulesListT } from '../../../../navigationTypes'

import styles from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/Constructor/constructor.module.scss'

export const ModulesAndLessonsBlock: FC<LessonAddBlockPropsT> = ({ modulesList, setLessonIdAndType, setModalTypeClasses, toggleModalModule }) => {
  const dispatch = useAppDispatch()

  const handleOpenModalModule = () => {
    toggleModalModule()
    dispatch(showModal(true))
  }

  return (
    <div className={styles.redactorCourse_leftSide}>
      <h5 className={styles.redactorCourse_leftSide_title}>Структура курса</h5>
      <div className={styles.redactorCourse_leftSide_desc}>
        {modulesList &&
          modulesList.map(({ section_name, section, lessons }: modulesListT) => (
            <ModulesBlock
              key={section_name + section}
              id={section}
              setLessonIdAndType={setLessonIdAndType}
              moduleName={section_name}
              lessonsList={lessons}
              setModalTypeClasses={setModalTypeClasses}
            />
          ))}
        <hr />
        <Button onClick={handleOpenModalModule} style={{ width: '236px' }} text={'+ Модуль'} variant={'primary'} />
      </div>
    </div>
  )
}
