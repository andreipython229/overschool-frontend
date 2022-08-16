import React, { ChangeEvent, FC, useState } from 'react'
import { publishedMarkerSvgIcon } from '../../../../../../constants/iconSvgConstants'
import { IconSvg } from '../../../../../../components/common/IconSvg/IconSvg'
import { Input } from '../../../../../../components/common/Input/Input/Input'
import { Toggle } from '@skbkontur/react-ui'
import { Checkbox } from '../../../../../../components/common/Checkbox/Checkbox'
import { SelectInput } from '../../../../../../components/common/SelectInput/SelectInput'
import { CoursesT } from '../../../../../../store/redux/courses/slice'
import { useDebounce } from '../../../../../../customHooks/useDebounce'

import styles from './../setting_course.module.scss'

type BasicSettingsT = {
  toggleCheckbox: boolean
  toggleCheckboxPublished: () => void
  courseFind: CoursesT | undefined
}

export const BasicSettings: FC<BasicSettingsT> = ({
  toggleCheckbox,
  toggleCheckboxPublished,
  courseFind,
}) => {
  const [nameCourse, setNameCourse] = useState<string>(courseFind?.name || '')
  const [shortDescription, setShortDescription] = useState<string>(courseFind?.description || '')

  const debounced = useDebounce(nameCourse)

  console.log(debounced)

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
      <div>
        <p>Курс для учеников доступен по ссылке:</p>
        <Input type={'text'} name="" value="" onChange={() => console.log(1)} />
      </div>
      <div>
        <Checkbox />
        <p>Использовать переход по внешней ссылке при клике на карточку курса</p>
        <p>
          Включите эту опцию, если хотите, чтобы ученики записывались на курс через ваш сайт вне
          платформы
        </p>
      </div>
      <SelectInput optionsList={['1', '2', '3', '4']} />
    </div>
  )
}
