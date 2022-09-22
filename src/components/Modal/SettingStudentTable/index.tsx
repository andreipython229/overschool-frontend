import { FC } from 'react'
import { Reorder } from 'framer-motion'
import { SettingStudentTableT } from '../ModalTypes'
import { useShowModal } from '../../../customHooks/useShowModal'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { SettingItem } from './SettingItem'
import { crossIconPath } from '../../../config/commonSvgIconsPath'

import styles from '../Modal.module.scss'
import scss from './settingStudentTable.module.scss'

export const SettingStudentTable: FC<SettingStudentTableT> = ({ settingList, setSettingsList, setShowModal }) => {
  const closeSettingsModal = () => {
    setShowModal()
  }

  useShowModal({ setShowModal })

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.container}>
          <span className={styles.main_closed}>
            <IconSvg functionOnClick={closeSettingsModal} width={25} height={25} path={crossIconPath} />
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
