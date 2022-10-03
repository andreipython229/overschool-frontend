import { ChangeEvent, FC, useState } from 'react'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { useShowModal } from 'customHooks/useShowModal'
import { crossIconPath } from 'config/commonSvgIconsPath'
import { basicModalHeaderIconPath } from '../config/svgIconsPath'
import { useCreateLessonsMutation } from 'api/modulesServices'
import { getSectionId } from 'selectors'
import { useAppSelector } from 'store/hooks'

import styles from '../../Modal.module.scss'
import { SettingClassesPropsT } from '../../ModalTypes'

export const SettingClassesUsually: FC<SettingClassesPropsT> = ({ goToBack, addCourse, closedAll }) => {
  const { section_id } = useAppSelector(getSectionId)

  console.log(section_id)

  const [nameLesson, setNameLesson] = useState<string>('')
  const [settingsActive, setSettingsActive] = useState<number>(0)

  const changeNameClasses = (event: ChangeEvent<HTMLInputElement>) => {
    setNameLesson(event.target.value)
  }

  const [createLesson] = useCreateLessonsMutation()

  const handleCreateLesson = async () => {
    if (!nameLesson) {
      return
    }
    const createLessonData = {
      name: nameLesson,
      section: section_id,
    }
    addCourse(nameLesson, 'usually')

    await createLesson(createLessonData)
  }

  useShowModal({ closedAll })

  return (
    <div className={styles.wrapper}>
      <div className={styles.classesContainer}>
        <div onClick={closedAll} className={styles.classesContainer_closed}>
          <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath} />
        </div>
        <div className={styles.usually_header}>
          <IconSvg width={60} height={53} viewBoxSize="0 0 60 53" path={basicModalHeaderIconPath} />
          <span>Настройте занятие</span>
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
          <div className={styles.usually_input}>
            <span className={styles.usually_title}>Название занятие:</span>
            <Input placeholder={'Основы языка HTML'} name={'name classes'} onChange={changeNameClasses} type={'text'} value={nameLesson} />
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

        <div className={styles.btnBlock}>
          <Button onClick={goToBack} text={'Назад'} style={{ width: '85px', height: '100%', marginRight: '10px', padding: '17px', fontSize: '18px', fontWeight: '400', borderRadius: '10px' }}/>
          <Button onClick={handleCreateLesson} text={'Добавить занятие'} variant={'primary'} />
        </div>
      </div>
    </div>
  )
}
