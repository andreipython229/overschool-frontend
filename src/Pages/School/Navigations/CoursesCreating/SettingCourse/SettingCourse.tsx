import { FC, useCallback, useState } from 'react'

import { BasicSettings } from './BasicSettings'
import { CardImageUpload } from './CardImageUpload'
import { CourseActions } from './CourseActions'
import { CourseAvailability } from './CourseAvailability'
import { CoursesT } from 'types/CoursesT'

import styles from './setting_course.module.scss'

type settingsCourseT = {
  course: CoursesT
}

export const SettingCourse: FC<settingsCourseT> = ({ course }) => {
  const [toggleCheckbox, setToggleCheckbox] = useState<boolean>(false)

  const toggleCheckboxPublished = useCallback(() => {
    setToggleCheckbox(!toggleCheckbox)
  }, [toggleCheckbox])

  return (
    <div className={styles.container}>
      {course && <CardImageUpload toggleCheckbox={toggleCheckbox} courseFind={course} />}
      <div className={styles.container_right}>
        {course && <BasicSettings courseFind={course} toggleCheckbox={toggleCheckbox} toggleCheckboxPublished={toggleCheckboxPublished} />}
        <div className={styles.availability_course_wrapper}>
          <CourseAvailability />
        </div>
        <div className={styles.course_actions_wrapper}>{course && <CourseActions courseFind={course} />}</div>
      </div>
    </div>
  )
}
