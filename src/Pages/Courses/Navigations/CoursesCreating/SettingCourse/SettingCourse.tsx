import React, { useCallback, useState } from 'react'

import { BasicSettings } from './BasicSettings/BasicSettings'
import { CardImageUpload } from './CardImageUpload/CardImageUpload'

import styles from './setting_course.module.scss'

export const SettingCourse = () => {
  const [toggleCheckbox, setToggleCheckbox] = useState<boolean>(false)

  const toggleCheckboxPublished = useCallback(() => {
    setToggleCheckbox(!toggleCheckbox)
  }, [toggleCheckbox])

  return (
    <div className={styles.container}>
      <CardImageUpload toggleCheckbox={toggleCheckbox} />
      <BasicSettings
        toggleCheckbox={toggleCheckbox}
        toggleCheckboxPublished={toggleCheckboxPublished}
      />
    </div>
  )
}
