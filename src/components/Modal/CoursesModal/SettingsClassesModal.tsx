import { ChangeEvent, FC, useEffect, useState } from 'react'

import { Input } from 'components/common/Input/Input/Input'
import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { settingsClassesIconPath } from './config/svgIconsPath'
import { crossIconPath } from '../../../config/commonSvgIconsPath'
import { SettingsClassesModalPropT } from '../ModalTypes'
import { useFetchLessonQuery, usePatchLessonsMutation } from '../../../api/modulesServices'
import { patchData } from '../../../utils/patchData'

import styles from '../Modal.module.scss'
import { classesType } from '../../../constants/other'

export const SettingsClassesModal: FC<SettingsClassesModalPropT> = ({ setType, modulesList, lessonIdAndType }) => {
  // const lessonIdVar = lessonIdAndType ? lessonIdAndType : modulesList[0]?.lessons[0]?.id

  const [changeNameLesson, { isSuccess }] = usePatchLessonsMutation()

  const { data } = useFetchLessonQuery({ id: lessonIdAndType.id, type: lessonIdAndType.type })

  const [nameLesson, setNameLesson] = useState<string>(`${data?.name}`)

  const handleClose = () => {
    setType(null as keyof object)
  }

  const handleChangeNameLesson = (event: ChangeEvent<HTMLInputElement>) => {
    setNameLesson(event.target.value)
  }

  const saveChangeNameLesson = (event: any) => {
    event.preventDefault()
    patchData(data, `${lessonIdAndType.type}_id`, 'name', nameLesson, changeNameLesson, lessonIdAndType.type)
  }

  useEffect(() => {
    if (isSuccess) {
      setType(null as keyof object)
    }
  }, [isSuccess])

  return (
    <div className={styles.wrapper}>
      <div className={styles.classesContainer}>
        <form>
          <div onClick={handleClose} className={styles.classesContainer_closed}>
            <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath} />
          </div>
          <div className={styles.settings_header}>
            <IconSvg width={60} height={60} viewBoxSize={'0 0 60 60'} path={settingsClassesIconPath} />
            <span className={styles.classesContainer_title}>Настройки занятия </span>
          </div>

          <div className={styles.settings_block}>
            <div className={styles.settings_block_input}>
              <span className={styles.settings_block_input_title}>Изменить название</span>
              <Input name={'name'} type={'text'} value={nameLesson} onChange={handleChangeNameLesson} />
            </div>
          </div>

          <Button onClick={saveChangeNameLesson} style={{ width: '496px' }} variant={'primary'} text={'Сохранить'} />
        </form>
      </div>
    </div>
  )
}
