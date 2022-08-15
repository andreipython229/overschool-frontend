import React, { ChangeEvent, FC, useState } from 'react'
import { publishedMarkerSvgIcon } from '../../../../../../constants/iconSvgConstants'
import { IconSvg } from '../../../../../../components/common/IconSvg/IconSvg'
import { Input } from '../../../../../../components/common/Input/Input/Input'
import { Toggle } from '@skbkontur/react-ui'

import styles from './../setting_course.module.scss'

type BasicSettingsT = {
  toggleCheckbox: boolean
  toggleCheckboxPublished: () => void
}

export const BasicSettings: FC<BasicSettingsT> = ({ toggleCheckbox, toggleCheckboxPublished }) => {
  const [nameCourse, setNameCourse] = useState<string>('')
  const [shortDescription, setShortDescription] = useState<string>('')

  const handleNameCourse = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'nameCourse') {
      setNameCourse(e.target.value)
    } else {
      setShortDescription(e.target.value)
    }
  }

  return (
    <div className={`${styles.basic_settings}`}>
      <div className={`${styles.header_basic_settings} ${styles.container}`}>
        <p>Основные настройки</p>
        {!toggleCheckbox && (
          <p className={styles.right_content_header}>
            <IconSvg width={18} height={16} fill="#E0DCED" d={publishedMarkerSvgIcon.noPublished} />
            Не опубликован
          </p>
        )}
      </div>
      <div>
        <span>не опубликовано</span>
        <Toggle defaultChecked={toggleCheckbox} onValueChange={toggleCheckboxPublished} />
        <span>опубликовано</span>
      </div>
      <p>название курса</p>
      <Input type={'text'} name="nameCourse" value={nameCourse} onChange={handleNameCourse} />
      <p>кратное описание</p>
      <Input
        type={'text'}
        name="shortDescription"
        value={shortDescription}
        onChange={handleNameCourse}
      />
    </div>
  )
}
