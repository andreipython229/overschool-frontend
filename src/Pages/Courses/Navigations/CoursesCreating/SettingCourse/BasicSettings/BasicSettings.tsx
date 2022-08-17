import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { publishedMarkerSvgIcon } from '../../../../../../constants/iconSvgConstants'
import { IconSvg } from '../../../../../../components/common/IconSvg/IconSvg'
import { Input } from '../../../../../../components/common/Input/Input/Input'
import { Toggle } from '@skbkontur/react-ui'
import { Checkbox } from '../../../../../../components/common/Checkbox/Checkbox'
import { SelectInput } from '../../../../../../components/common/SelectInput/SelectInput'
import { CoursesT } from '../../../../../../store/redux/courses/slice'
import { useDebounce } from '../../../../../../customHooks/useDebounce'

import styles from './../setting_course.module.scss'
import { useUpdateCoursesMutation } from '../../../../../../api/coursesServices'

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
  const [update, { data }] = useUpdateCoursesMutation()
  const [nameCourse, setNameCourse] = useState<string>(courseFind?.name || '')
  const [shortDescription, setShortDescription] = useState<string>(courseFind?.description || '')

  const debounced = useDebounce(nameCourse)

  const handleNameCourse = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'nameCourse') {
      setNameCourse(e.target.value)
    } else {
      setShortDescription(e.target.value)
    }
  }
  const formdata = new FormData()
  formdata.append('course_id', `${courseFind?.course_id}` || '')
  formdata.append('created_at', `${courseFind?.created_at}` || '')
  formdata.append('updated_at', `${courseFind?.updated_at}` || '')
  formdata.append('published', `${courseFind?.published}`)
  formdata.append('order', `${courseFind?.order}` || '')
  formdata.append('name', debounced || '')
  formdata.append('format', courseFind?.format || '')
  formdata.append('duration_days', `${courseFind?.duration_days}` || '')
  formdata.append('price', courseFind?.price || '')
  formdata.append('description', courseFind?.description || '')
  formdata.append('author_id', `${courseFind?.author_id}` || '')
  // formdata.append('photo_url', files[0])
  // formdata.append('photo', '')
  const id = courseFind?.course_id

  useEffect(() => {
    if (formdata) {
      update({ formdata, id })
    }
  }, [debounced])

  return (
    <div className={`${styles.basic_settings}`}>
      <div className={`${styles.header_basic_settings}`}>
        <p>Основные настройки</p>
        {!toggleCheckbox && (
          <p className={styles.right_content_header}>
            <IconSvg width={20} height={15} fill="#6C7889" viewBoxSize = ' 0 0 21 16' d={publishedMarkerSvgIcon.noPublished} />
            Не опубликован
          </p>
        )}
      </div>
      <div className={styles.publish_switch}>
        <p className={styles.publish_switch_title}>Статус курса</p>
        <div className={styles.publish_switch_wrapper_switch}>
          <span>Не опубликован</span>
          <Toggle defaultChecked={toggleCheckbox} onValueChange={toggleCheckboxPublished} />
          <span>Опубликован</span>
        </div>
      </div>
      <div className={styles.course_name_wrapper}>
        <p className={styles.course_name_title}>название курса</p>
        <Input type={'text'} name="nameCourse" value={nameCourse} onChange={handleNameCourse}/>
      </div>
      <div className={styles.short_discription_wrapper}>
        <p className={styles.short_discription_title}>кратное описание</p>
        <Input
          type={'text'}
          name="shortDescription"
          value={shortDescription}
          onChange={handleNameCourse}
        />
      </div>
      <div>
        <div className={styles.course_link_wrapper}>
          <p className={styles.course_link_title}>Курс для учеников доступен по ссылке:</p>
          <Input type={'text'} name="" value="" onChange={() => console.log(1)} />
        </div>
      </div>
      <div className={styles.link_switch_wrapper}>
        <div className={styles.link_switch_label}>
          <Checkbox />
          <p className={styles.link_switch_label_title}>Использовать переход по внешней ссылке при клике на карточку курса</p>
        </div>
        <p className={styles.link_switch_label_help}>
          Включите эту опцию, если хотите, чтобы ученики записывались на курс через ваш сайт вне
          платформы
        </p>
      </div>
      <div className={styles.course_category_wrapper}>
        <p className={styles.course_category_title}>Категории курса</p>
        <SelectInput optionsList={['1', '2', '3', '4']} /> 
      </div>
    </div>
  )
}
