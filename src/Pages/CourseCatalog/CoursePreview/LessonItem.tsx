import { FC, memo } from 'react'
import { lessonSvgMapper } from 'config/index'

import styles from '../../../components/StudentAccardion/ExerciseItem/exerciseItem.module.scss'
import { Lesson } from 'types/courseStatT'

type lessonItemT = {
  lesson: Lesson
}

export const LessonItem: FC<lessonItemT> = memo(({ lesson }) => {
  return (
    <div className={styles.accardionWrapper_component_exerciseWrapper_exercise}>
      {lessonSvgMapper[lesson.type]}
      <div className={styles.accardionWrapper_component_exerciseWrapper_exercise_nameWrapper}>
        <h5 className={styles.accardionWrapper_component_exerciseWrapper_exercise_nameWrapper_title}>{lesson.name}</h5>
      </div>
    </div>
  )
})
