import { FC, memo } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'

import { Student } from '../../../enum/pathE'
import { lessonT } from '../../../types/sectionT'
import { lessonSvgMapper } from 'config/index'

import styles from './exerciseItem.module.scss'

type exerciseItemT = {
  lesson: lessonT
  sectionId: number
  disabled?: boolean
}

export const ExerciseItem: FC<exerciseItemT> = memo(({ lesson, sectionId, disabled }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (!disabled) {
      navigate(generatePath(Student.Lesson, { section_id: `${sectionId}`, lesson_type: `${lesson.type}`, lesson_id: `${lesson.id}` }))
    }
  }

  return (
    <div onClick={handleClick}
         className={`${styles.accardionWrapper_component_exerciseWrapper_exercise} ${disabled ? styles.disabled : ''} ${disabled ? styles.inactive : ''}`}>
      {lessonSvgMapper[lesson.type]}
      <div className={styles.accardionWrapper_component_exerciseWrapper_exercise_nameWrapper}>
        <h5 className={styles.accardionWrapper_component_exerciseWrapper_exercise_nameWrapper_title}>{lesson.name}</h5>
        <span className={styles.accardionWrapper_component_exerciseWrapper_exercise_nameWrapper_status_neg}>
          {lesson.viewed? 'Пройдено': 'Не пройдено'}
        </span>
        {/* <span className={styles.accardionWrapper_component_exerciseWrapper_exercise_nameWrapper_status}>Не пройдено</span> */}
      </div>
    </div>
  )
})
