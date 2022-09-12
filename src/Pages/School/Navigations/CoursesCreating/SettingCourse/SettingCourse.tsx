import React, { FC, useCallback, useState } from 'react'

import { useFindCourse } from '../../../../../customHooks/useFindCourse'
import { BasicSettings } from './BasicSettings'
import { CardImageUpload } from './CardImageUpload'
import { CourseActions } from './CourseActions'
import { CourseAvailability } from './CourseAvailability'

import styles from './setting_course.module.scss'

export const SettingCourse: FC = () => {
  const courseFind = useFindCourse()
  const [toggleCheckbox, setToggleCheckbox] = useState<boolean>(false)

  const toggleCheckboxPublished = useCallback(() => {
    setToggleCheckbox(!toggleCheckbox)
  }, [toggleCheckbox])

  return (
    <div className={styles.container}>
      {courseFind && <CardImageUpload toggleCheckbox={toggleCheckbox} courseFind={courseFind} />}
      <div className={styles.container_right}>
        {courseFind && <BasicSettings courseFind={courseFind} toggleCheckbox={toggleCheckbox} toggleCheckboxPublished={toggleCheckboxPublished} />}
        <div className={styles.availability_course_wrapper}>
          <CourseAvailability />
        </div>
        <div className={styles.course_actions_wrapper}>{courseFind && <CourseActions courseFind={courseFind} />}</div>
      </div>
    </div>
  )
}
