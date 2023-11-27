import { FC, memo, useEffect, useState } from 'react'
import { Button } from 'components/common/Button/Button'
import { ModulesBlock } from './ModulesBlock'
import { LessonAddBlockPropsT } from '../../../../../../../types/navigationTypes'

import styles from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/Constructor/constructor.module.scss'

export const ModulesAndLessonsBlock: FC<LessonAddBlockPropsT> = memo(({ setType, modulesList, setLessonIdAndType, isLoading }) => {
  const [selectedLessonId, setSelectedLessonId] = useState<number>()

  useEffect(() => {
    console.log('modulesList changed:', modulesList);
  }, [modulesList]);
  

  useEffect(() => {
    if (modulesList.length > 0 && modulesList[0].lessons.length > 0) {
      setSelectedLessonId(modulesList[0].lessons[0].baselesson_ptr_id)
    }
  }, [isLoading])

  const handleOpenModalModule = () => {
    setType('module' as keyof object)
  }

  return (
    <div className={styles.redactorCourse_leftSide}>
      <h5 className={styles.redactorCourse_leftSide_title}>Структура курса:</h5>
      <div className={styles.redactorCourse_leftSide_desc}>
        {modulesList &&
          modulesList.map(({ section_name, section, lessons }, index: number) => {
            if (!section_name) return
            return (
              <ModulesBlock
                setType={setType}
                key={section_name + section + index}
                id={section}
                setLessonIdAndType={setLessonIdAndType}
                moduleName={section_name}
                lessonsList={lessons}
                selectedLessonId={selectedLessonId}
                setSelectedLessonId={setSelectedLessonId}
              />
            )
          })}
        <hr />
        <div>
          <Button onClick={handleOpenModalModule} text={'+ Модуль'} variant={'primary'} />
        </div>
      </div>
    </div>
  )
})
