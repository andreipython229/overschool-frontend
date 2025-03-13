import {ChangeEvent, FC, useEffect, useState} from 'react'

import {Input} from 'components/common/Input/Input/Input'
import {Button} from 'components/common/Button/Button'
import {IconSvg} from '../../common/IconSvg/IconSvg'
import {settingsClassesIconPath} from './config/svgIconsPath'
import {crossIconPath} from '../../../config/commonSvgIconsPath'
import {SettingsClassesModalPropT} from '../ModalTypes'
import {useFetchLessonQuery, usePatchLessonsMutation} from '../../../api/modulesServices'
// import {patchData} from '../../../utils/patchData'

import styles from '../Modal.module.scss'
// import {classesType} from '../../../constants/other'
import {CheckboxBall} from "../../common/CheckboxBall";
import { penIconPath } from 'Pages/Settings/Main/iconComponents'
// import {PublishedMark} from "../../common/PublishedMark";

export const SettingsClassesModal: FC<SettingsClassesModalPropT> = ({setType, modulesList, lessonIdAndType}) => {
  const [isPublished, setIsPublished] = useState(false);
  const schoolName = window.location.href.split('/')[4]
  const [saveData, {isSuccess}] = usePatchLessonsMutation()

  const {data} = useFetchLessonQuery({id: lessonIdAndType.id, type: lessonIdAndType.type, schoolName})

  const [nameLesson, setNameLesson] = useState<string>(data?.name || '')
  const [show_right_answers, setShowRightAnswers] = useState(false)

  useEffect(() => {
    if (data) {
      setIsPublished(data.active);
      if (lessonIdAndType.type === 'test') {
        setShowRightAnswers(data.show_right_answers);
      }
    }
  }, [data]);

  useEffect(() => {
    console.log(lessonIdAndType)
  }, [lessonIdAndType]);

  useEffect(() => {
    if (data?.name !== undefined) {
      setNameLesson(data?.name)
    }
  }, [data?.name]);

  const handleClose = () => {
    setType(null as keyof object)
  }

  const handleChangeNameLesson = (event: ChangeEvent<HTMLInputElement>) => {
    setNameLesson(event.target.value)
  }

  const saveChangeNameLesson = (event: any) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append('name', nameLesson)
    formData.append('order', String(data?.order))
    formData.append('section', String(data?.section))
    formData.append('active', String(isPublished))
    if (lessonIdAndType.type === 'test') {
      formData.append('show_right_answers', String(show_right_answers))
    }
    saveData({arg: {id: +lessonIdAndType.id, type: lessonIdAndType.type, formdata: formData}, schoolName})
  }

  useEffect(() => {
    if (isSuccess) {
      setType(null as keyof object)
    }
  }, [isSuccess])

  return (
    <div className={styles.wrapper}>
      <div className={styles.classesContainer}>
        <form style={{ width: '100%' }}>
          <div onClick={handleClose} className={styles.classesContainer_closed}>
            <IconSvg width={64} height={64} viewBoxSize="0 0 64 64" path={crossIconPath} />
          </div>
          <div className={styles.settings_header}>
            <IconSvg width={60} height={60} viewBoxSize={'0 0 60 60'} path={settingsClassesIconPath} />
            <span className={styles.classesContainer_title}>Настройки занятия</span>
          </div>

          <div className={styles.settings_block}>
            <div className={styles.settings_block_input}>
              <span className={styles.settings_block_input_title}>Изменить название</span>
              <div className={styles.module_input}>
                <Input
                  name={'name'}
                  value={nameLesson}
                  type={'text'}
                  onChange={handleChangeNameLesson}
                >
                  <IconSvg className={styles.module_input_penIcon} width={24} height={24} viewBoxSize='0 0 24 24' path={penIconPath} />
                </Input>
              </div>
            </div>
            {/* <span className={styles.settings_block_input_isPublished}>
                <CheckboxBall isChecked={isPublished} toggleChecked={() => setIsPublished(!isPublished)}/>
                <PublishedMark isPublished={isPublished}/>
            </span> */}
            {lessonIdAndType.type === 'test' && (
              <span className={styles.settings_block_input_isPublished}>
                <div className={styles.settings_block_input_switch}>
                  <CheckboxBall isChecked={show_right_answers} toggleChecked={() => setShowRightAnswers(!show_right_answers)}/>
                </div>
                <span>Показать правильные ответы при завершению теста.</span>
              </span>
            )}
          </div>
          <Button
            className={styles.settings_block_input_btnChangeNameLesson}
            onClick={saveChangeNameLesson}
            variant={'newPrimary'}
            text={'Сохранить'}
          />
        </form>
      </div>
    </div>
  )
}
