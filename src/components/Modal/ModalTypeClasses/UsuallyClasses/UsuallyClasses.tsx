import React, { ChangeEvent, FC, useState } from 'react'
import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { basicModalHeaderSvgIcon, cross } from '../../../../constants/iconSvgConstants'
import { IconSvg } from '../../../common/IconSvg/IconSvg'

import styles from '../../Modal.module.scss'
import { useShowModal } from '../../../../customHooks/useShowModal'

type SettingClassesPropsType = {
  goToBack: () => void
  addCourse: (name: string, type: string) => void
  closedAll: () => void
}

export const SettingClassesUsually: FC<SettingClassesPropsType> = ({
  goToBack,
  addCourse,
  closedAll,
}) => {
  const [nameClasses, setNameClasses] = useState<string>('')
  const [settingsActive, setSettingsActive] = useState<number>(0)

  const changeNameClasses = (event: ChangeEvent<HTMLInputElement>) => {
    setNameClasses(event.currentTarget.value)
  }

  useShowModal({ closedAll })

  return (
    <div className={styles.wrapper}>
      <div className={styles.classesContainer}>
        <div onClick={closedAll} className={styles.classesContainer_closed}>
          <IconSvg
            width={14}
            height={14}
            d={cross}
            stroke={'#E0DCED'}
            strokeWidth={'2'}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
            viewBoxSize="0 0 14 14"
          />
        </div>
        <div className={styles.usually_header}>
          <IconSvg
            width={60}
            height={53}
            d={basicModalHeaderSvgIcon}
            fill={'#FFFFFF'}
            stroke={'#CACDD2'}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
            viewBoxSize="0 0 60 53"
          />
          <span>Настройте занятие</span>
        </div>

        <div className={styles.navBtn}>
          <span
            onClick={() => setSettingsActive(0)}
            className={
              settingsActive === 0
                ? styles.navBtn_btn + ' ' + styles.navBtn_active
                : styles.navBtn_btn
            }
          >
            Основные
          </span>
          <span
            onClick={() => setSettingsActive(1)}
            className={
              settingsActive === 1
                ? styles.navBtn_btn + ' ' + styles.navBtn_active
                : styles.navBtn_btn
            }
          >
            Баллы за прохождение
          </span>
        </div>
        {settingsActive === 0 ? (
          <div className={styles.usually_input}>
            <span className={styles.usually_title}>Название занятие:</span>
            <Input
              placeholder={'Основы языка HTML'}
              name={'name classes'}
              onChange={changeNameClasses}
              type={'text'}
              value={nameClasses}
            />
          </div>
        ) : (
          <div>
            <span className={styles.usually_title}>
              Сколько баллов будет выдано ученику по завершению занятия:
            </span>
            <div className={styles.usually_grade}>
              <input type={'number'} placeholder={'0'} className={styles.usually_grade_points} />
              <span>баллов</span>
            </div>
          </div>
        )}

        <div className={styles.btnBlock}>
          <Button onClick={goToBack} text={'Назад'} />
          <Button
            onClick={() => addCourse(nameClasses, 'usually')}
            text={'Добавить занятие'}
            variant={'primary'}
          />
        </div>
      </div>
    </div>
  )
}
