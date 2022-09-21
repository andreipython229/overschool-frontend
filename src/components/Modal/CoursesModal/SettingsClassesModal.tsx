import { FC, useState } from 'react'

import { Input } from 'components/common/Input/Input/Input'
import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { useShowModal } from '../../../customHooks/useShowModal'
import { settingsClassesIconPath } from './config/svgIconsPath'
import { crossIconPath } from '../../../config/commonSvgIconsPath'

import styles from '../Modal.module.scss'
import { SettingsClassesModalPropT } from '../ModalTypes'

const classesType = ['Занятие', 'Задание', 'Тест', 'Вебинар']

export const SettingsClassesModal: FC<SettingsClassesModalPropT> = ({ setShowModal }) => {
  const [settingsActive, setSettingsActive] = useState<number>(0)

  useShowModal({ setShowModal })

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.classesContainer}>
        <form>
          <div onClick={handleClose} className={styles.classesContainer_closed}>
            <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath} />
          </div>
          <div className={styles.settings_header}>
            <IconSvg width={17} height={17} viewBoxSize={'0 0 17 17'} path={settingsClassesIconPath} />
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
                <Input
                  style={{ width: '496px' }}
                  name={'name'}
                  type={'text'}
                  value={''}
                  placeholder={'Основы HTML'}
                  onChange={() => console.log('заглушка')}
                />
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

          <Button style={{ width: '496px' }} variant={'primary'} text={'Сохранить'} />
        </form>
      </div>
    </div>
  )
}
