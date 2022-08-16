import React, { FC, useCallback, useState } from 'react'

import { BasicSettings } from './BasicSettings/BasicSettings'
import { CardImageUpload } from './CardImageUpload/CardImageUpload'
import { СourseActions } from './СourseActions/СourseActions'
import { useFindCourse } from '../../../../../customHooks/useFindCourse'
import { CourseAvailability } from './CourseAvailability/CourseAvailability'

import styles from './setting_course.module.scss'

export const SettingCourse: FC = () => {
  const [toggleCheckbox, setToggleCheckbox] = useState<boolean>(false)

  const courseFind = useFindCourse()

  const toggleCheckboxPublished = useCallback(() => {
    setToggleCheckbox(!toggleCheckbox)
  }, [toggleCheckbox])

  return (
    <div className={styles.container}>
      <CardImageUpload toggleCheckbox={toggleCheckbox} courseFind={courseFind} />
      <div className={styles.container_right}>
        <BasicSettings
          courseFind={courseFind}
          toggleCheckbox={toggleCheckbox}
          toggleCheckboxPublished={toggleCheckboxPublished}
        />
        <CourseAvailability />
        <СourseActions courseFind={courseFind} />
      </div>
    </div>
  )
}
