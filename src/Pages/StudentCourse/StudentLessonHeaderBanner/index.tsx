import { FC, memo } from 'react'
import styles from '../StudentLessonPreview/lesson.module.scss'

interface ILessonHeader {
  photo: string
  courseName: string
}

export const StudentCourseHeaderBanner: FC<ILessonHeader> = memo(({ photo, courseName }) => {
  const changedBg =
    photo.length > 0
      ? {
          backgroundImage: `url(${photo})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          ObjectFit: 'fill',
          zIndex: 2,
        }
      : { backgroundColor: 'rgba(51, 47, 54, 0.5)' }
  return (
    <div className={styles.lessonHeaderBanner} style={changedBg}>
      <div className={styles.lessonHeaderBanner_infoBlock}>
        <div className={styles.lessonHeaderBanner_infoBlock_title}>
          <p className={styles.lessonHeaderBanner_infoBlock_title_name}>{courseName}</p>
        </div>
      </div>
    </div>
  )
})
