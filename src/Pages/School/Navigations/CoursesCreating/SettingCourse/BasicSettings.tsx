import { ChangeEvent, FC, useEffect, useState } from 'react'

import { noPublishedGreyIconPath } from '../../../config/svgIconsPath'
import { IconSvg } from '../../../../../components/common/IconSvg/IconSvg'
import { Input } from '../../../../../components/common/Input/Input/Input'
import { Checkbox } from '../../../../../components/common/Checkbox/Checkbox'
import { SelectInput } from '../../../../../components/common/SelectInput/SelectInput'
import { useDebounce } from '../../../../../customHooks/useDebounce'
import { usePatchCoursesMutation } from '../../../../../api/coursesServices'
import { formDataConverter } from '../../../../../utils/formDataConverter'
import { CheckboxBall } from '../../../../../components/common/CheckboxBall'

import { CoursesDataT } from '../../../../../types/CoursesT'

import styles from './setting_course.module.scss'

type BasicSettingsT = {
  toggleCheckbox: boolean
  toggleCheckboxPublished: () => void
  courseFind: CoursesDataT
}

export const BasicSettings: FC<BasicSettingsT> = ({ toggleCheckbox, toggleCheckboxPublished, courseFind }) => {
  const [update] = usePatchCoursesMutation()
  const [nameCourse, setNameCourse] = useState<string>(courseFind?.name || '')
  const [shortDescription, setShortDescription] = useState<string>(courseFind?.description || '')

  const [debouncedCourseName] = useDebounce(nameCourse)
  const [debouncedDescription] = useDebounce(shortDescription)

  const handleNameCourse = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'nameCourse') {
      setNameCourse(e.target.value)
    } else {
      setShortDescription(e.target.value)
    }
  }

  useEffect(() => {
    const updateCurse = {
      name: debouncedCourseName,
      description: debouncedDescription,
      public: toggleCheckbox ? 'О' : 'Н',
    }

    const formdata = formDataConverter(updateCurse)
    if (formdata && courseFind) {
      const id = courseFind?.course_id
      update({ formdata, id })
    }
  }, [debouncedCourseName, debouncedDescription, toggleCheckbox])

  return (
    <div className={`${styles.basic_settings}`}>
      <div className={`${styles.header_basic_settings}`}>
        <p>Основные настройки</p>
        {!toggleCheckbox && (
          <p className={styles.right_content_header}>
            <IconSvg width={20} height={15} viewBoxSize=" 0 0 21 16" path={noPublishedGreyIconPath} />
            Не опубликован
          </p>
        )}
      </div>
      <div className={styles.publish_switch}>
        <p className={styles.publish_switch_title}>Статус курса</p>
        <div className={styles.publish_switch_wrapper_switch}>
          <CheckboxBall isChecked={toggleCheckbox} toggleChecked={toggleCheckboxPublished} />
        </div>
      </div>
      <div className={styles.course_name_wrapper}>
        <p className={styles.course_name_title}>название курса</p>
        <Input type={'text'} name="nameCourse" value={nameCourse} onChange={handleNameCourse} />
      </div>
      <div className={styles.short_discription_wrapper}>
        <p className={styles.short_discription_title}>кратное описание</p>
        <Input type={'text'} name="shortDescription" value={shortDescription} onChange={handleNameCourse} />
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
          Включите эту опцию, если хотите, чтобы ученики записывались на курс через ваш сайт вне платформы
        </p>
      </div>
      <div className={styles.course_category_wrapper}>
        <p className={styles.course_category_title}>Категории курса</p>
        <SelectInput optionsList={['1', '2', '3', '4']} />
      </div>
    </div>
  )
}
