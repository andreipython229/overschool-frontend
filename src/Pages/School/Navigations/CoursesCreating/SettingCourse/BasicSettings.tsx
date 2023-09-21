import { ChangeEvent, FC, useEffect, useState } from 'react'

import { noPublishedGreyIconPath } from '../../../config/svgIconsPath'
import { IconSvg } from '../../../../../components/common/IconSvg/IconSvg'
import { Input } from '../../../../../components/common/Input/Input/Input'
import { Checkbox } from '../../../../../components/common/Checkbox/Checkbox'
import { SelectInput } from '../../../../../components/common/SelectInput/SelectInput'
import { usePatchCoursesMutation } from '../../../../../api/coursesServices'
import { formDataConverter } from '../../../../../utils/formDataConverter'
import { CheckboxBall } from '../../../../../components/common/CheckboxBall'

import { CoursesDataT } from '../../../../../types/CoursesT'

import styles from './setting_course.module.scss'
import { useDebounceFunc } from '../../../../../customHooks'

type BasicSettingsT = {
  toggleCheckbox: boolean
  toggleCheckboxPublished: () => void
  courseFind: CoursesDataT
}

export const BasicSettings: FC<BasicSettingsT> = ({ toggleCheckbox, toggleCheckboxPublished, courseFind }) => {
  const [update] = usePatchCoursesMutation()
  const [nameCourse, setNameCourse] = useState<string>(courseFind?.name || '')
  const [shortDescription, setShortDescription] = useState<string>(courseFind?.description || '')

  const debounce = useDebounceFunc(update, 1000)

  const handleNameCourse = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'nameCourse') {
      setNameCourse(e.target.value)
    } else {
      setShortDescription(e.target.value)
    }
  }

  useEffect(() => {
    const updateCurse = {
      name: nameCourse,
      description: shortDescription,
      public: toggleCheckbox ? 'О' : 'Н',
    }

    if (updateCurse.name !== courseFind?.name || updateCurse.description !== courseFind?.description || updateCurse.public !== courseFind?.public) {
      const formdata = formDataConverter(updateCurse)
      if (formdata && courseFind) {
        const id = courseFind?.course_id
        debounce({ formdata, id })
      }
    }
  }, [toggleCheckbox, nameCourse, shortDescription])

  return (
    <div className={`${styles.basic_settings}`}>
      <div className={`${styles.header_basic_settings}`}>
        <p>Основные настройки</p>
        {/* {!toggleCheckbox && (
          <p className={styles.right_content_header}>
            <IconSvg width={20} height={15} viewBoxSize=" 0 0 21 16" path={noPublishedGreyIconPath} />
            Не опубликован
          </p>
        )} */}
      </div>
      {/* <div className={styles.publish_switch}>
        <p className={styles.publish_switch_title}>Статус курса</p>
        <div className={styles.publish_switch_wrapper_switch}>
          <CheckboxBall isChecked={toggleCheckbox} toggleChecked={toggleCheckboxPublished} />
        </div>
      </div> */}
      <div className={styles.course_name_wrapper}>
        <p className={styles.course_name_title}>название курса</p>
        <Input type={'text'} name="nameCourse" value={nameCourse} onChange={handleNameCourse} />
      </div>
      <div className={styles.short_discription_wrapper}>
        <p className={styles.short_discription_title}>кратное описание</p>
        <Input type={'text'} name="shortDescription" value={shortDescription} onChange={handleNameCourse} />
      </div>
    </div>
  )
}
