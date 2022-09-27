import { ChangeEvent, FC, useEffect, useState } from 'react'

import { Input } from 'components/common/Input/Input/Input'
import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { useShowModal } from '../../../customHooks/useShowModal'
import { settingsClassesIconPath } from './config/svgIconsPath'
import { crossIconPath } from '../../../config/commonSvgIconsPath'
import { SettingsClassesModalPropT } from '../ModalTypes'
import { useFetchLessonQuery, usePatchLessonsMutation } from '../../../api/modulesServices'

import styles from '../Modal.module.scss'
import { patchData } from '../../../utils/patchData'

const classesType = ['Занятие', 'Задание', 'Тест', 'Вебинар']

export const SettingsClassesModal: FC<SettingsClassesModalPropT> = ({ modulesList, lessonId, setShowModal }) => {
  const lessonIdVar = lessonId ? lessonId : modulesList[0]?.lessons[0]?.lesson_id
  const [changeNameLesson, { isSuccess }] = usePatchLessonsMutation()
  const { data } = useFetchLessonQuery(lessonIdVar)

  const [settingsActive, setSettingsActive] = useState<number>(0)
  const [nameLesson, setNameLesson] = useState<string>(data?.name)

  useShowModal({ setShowModal })

  const handleClose = () => {
    setShowModal(false)
  }

  const handleChangeNameLesson = (event: ChangeEvent<HTMLInputElement>) => {
    setNameLesson(event.target.value)
  }

  const saveChangeNameLesson = (event: any) => {
    event.preventDefault()
    patchData(data, 'lesson_id', 'name', nameLesson, changeNameLesson)
  }

  useEffect(() => {
    if (isSuccess) {
      setShowModal(false)
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
          <div className={styles.navBtn}>
            <span
              onClick={() => setSettingsActive(0)}
              className={settingsActive === 0 ? styles.navBtn_btn + ' ' + styles.navBtn_active : styles.navBtn_btn}
            >
              Основные
            </span>
            <span
              onClick={() => setSettingsActive(1)}
              className={settingsActive === 1 ? styles.navBtn_btn + ' ' + styles.navBtn_active : styles.navBtn_btn}
            >
              Баллы за прохождение
            </span>
          </div>

          {settingsActive === 0 ? (
            <div className={styles.settings_block}>
              <div className={styles.settings_block_input}>
                <span className={styles.settings_block_input_title}>Изменить название</span>
                <Input style={{ width: '496px' }} name={'name'} type={'text'} value={nameLesson} onChange={handleChangeNameLesson} />
              </div>

              <div className={styles.settings_block_input}>
                <span style={{ paddingBottom: '5px' }} className={styles.settings_block_input_title}>
                  Изменить тип
                </span>
                <SelectInput optionsList={classesType} />
              </div>
            </div>
          ) : (
            <div>
              <span className={styles.usually_title}>Сколько баллов будет выдано ученику по завершению занятия:</span>
              <div className={styles.usually_grade}>
                <input type={'number'} placeholder={'0'} className={styles.usually_grade_points} />
                <span>баллов</span>
              </div>
            </div>
          )}

          <Button onClick={saveChangeNameLesson} style={{ width: '496px' }} variant={'primary'} text={'Сохранить'} />
        </form>
      </div>
    </div>
  )
}
