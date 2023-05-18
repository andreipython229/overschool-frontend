import { FC, memo } from 'react'
import { Button } from 'components/common/Button/Button'
import { ModulesBlock } from './ModulesBlock'
import { LessonAddBlockPropsT } from '../../../../../../../types/navigationTypes'

import styles from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/Constructor/constructor.module.scss'

export const ModulesAndLessonsBlock: FC<LessonAddBlockPropsT> = memo(({ setType, modulesList, setLessonIdAndType }) => {
  const handleOpenModalModule = () => {
    setType('module' as keyof object)
  }

  return (
    <div className={styles.redactorCourse_leftSide}>
      <h5 className={styles.redactorCourse_leftSide_title}>Структура курса</h5>
      <div className={styles.redactorCourse_leftSide_desc}>
        {modulesList &&
          modulesList.map(({ section_name, section, lessons }) => (
            <ModulesBlock
              setType={setType}
              key={section_name + section}
              id={section}
              setLessonIdAndType={setLessonIdAndType}
              moduleName={section_name}
              lessonsList={lessons}
            />
          ))}
        <hr />
        <Button onClick={handleOpenModalModule} className={styles.btnModule} text={'+ Модуль'} variant={'primary'} />
      </div>
    </div>
  )
})
