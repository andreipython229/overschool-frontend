import React, { FC } from 'react'
import { Reorder } from 'framer-motion'
import { useShowModal } from '../../../customHooks/useShowModal'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { cross } from '../../../constants/iconSvgConstants'
import { SettingItem } from './SettingItem'
import { SettingItemT } from '../../../Pages/CoursesStats/CoursesStats'

import styles from '../Modal.module.scss';
import scss from './settingStudentTable.module.scss';

type SettingStudentTable = {
  settingList: SettingItemT[]
  setShowModal: (arg: boolean) => void
  setSettingsList: (arg: SettingItemT[]) => void
}

export const SettingStudentTable: FC<SettingStudentTable> = ({ settingList, setSettingsList, setShowModal }) => {
  const closeSettingsModal = () => {
    setShowModal(false)
  }

  useShowModal({ setShowModal })

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.container}>
          <span className={styles.main_closed}>
            <IconSvg
              functionOnClick={closeSettingsModal}
              width={25}
              height={25}
              d={cross}
              stroke={'#E0DCED'}
              strokeWidth={'2'}
              strokeLinecap={'round'}
              strokeLinejoin={'round'}
            />
          </span>
          <div className={styles.settings_title}>Настройка таблицы учеников</div>
          <p style={{ fontSize: '14px', textAlign: 'center', margin: '10px 0' }}>Выберите до 7 колонок для отображения в таблице</p>
          <form className={scss.form}>
            <Reorder.Group className={styles.settings_list} as="ul" onReorder={setSettingsList} values={settingList}>
              {settingList.map(item => (
                <SettingItem key={item.id} item={item} settingList={settingList} setSettingsList={setSettingsList} />
              ))}
            </Reorder.Group>
          </form>
        </div>
      </div>
    </div>
  )
}
