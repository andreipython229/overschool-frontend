import { FC, memo } from 'react'
import { useNavigate } from 'react-router-dom'

import { lessonSvgMapper } from '../../../../config/index'
import { lessonT, sectionT } from '../../../../types/sectionT'

import styles from '../lesson.module.scss'

type studentLessonSidebar = {
  courseId: string
  sectionId: string
  activeLessonIndex: number
  lessons: sectionT
}

export const StudentLessonSidebar: FC<studentLessonSidebar> = memo(({ courseId, sectionId, activeLessonIndex, lessons }) => {
  const navigate = useNavigate()

  return (
    <div className={styles.lesson__block}>
      <p className={styles.lesson__block_title}>Занятия модуля:</p>
      <div>
        {lessons?.lessons.length &&
          lessons?.lessons.map(({ name, id, type, order }: lessonT, index: number) => (
            <div
              style={{ cursor: 'pointer' }}
              key={order}
              onClick={() => navigate(`/login/courses/student-course/${courseId}/module/${sectionId}/${type}/${id}`)}
              className={activeLessonIndex === index ? styles.lesson__item_active : styles.lesson__item}
            >
              {lessonSvgMapper[type]}
              <span className={styles.lesson__item_name}>{name}</span>
            </div>
          ))}
      </div>
    </div>
  )
})
