import { FC } from 'react'

import { BasicSettings } from './BasicSettings'
import { CardImageUpload } from './CardImageUpload'
import { useBoolean } from 'customHooks/useBoolean'
import { useParams } from 'react-router-dom'
import { useFetchCourseQuery } from 'api/coursesServices'

import styles from './setting_course.module.scss'

export const SettingCourse: FC = () => {
  const { course_id: courseId } = useParams()
  const school = window.location.href.split('/')[4]
  const { data: course } = useFetchCourseQuery({id: courseId as string, schoolName: school})
  const booleanValue = course?.public === 'О'

  const [isPublished, { onToggle: togglePublished }] = useBoolean(booleanValue)

  return (
    <div className={styles.container}>
      {course && <CardImageUpload toggleCheckbox={isPublished} courseFind={course} />}
      <div className={styles.container_right}>
        {course && <BasicSettings courseFind={course} toggleCheckbox={isPublished} toggleCheckboxPublished={togglePublished} />}
      </div>
    </div>
  )
}
