import { FC, useState, useEffect } from 'react'
import { Reorder } from 'framer-motion'

import { SettingStudentTableT } from '../ModalTypes'
import { useShowModal } from '../../../customHooks/useShowModal'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { SettingItem } from './SettingItem'
import { crossIconPath } from '../../../config/commonSvgIconsPath'
import { useFetchStudentsTableHeaderQuery, usePatchStudentsTableHeaderMutation } from '../../../api/studentsGroupService'
import { studentGroupInfoT } from 'Pages/pageTypes'

import styles from '../Modal.module.scss'
import scss from './settingStudentTable.module.scss'

export const SettingStudentTable: FC<SettingStudentTableT> = ({ setShowModal, toggleSettingModal }) => {
  const { data: studentsTableInfo, isSuccess } = useFetchStudentsTableHeaderQuery(1)
  const [patchTable] = usePatchStudentsTableHeaderMutation()

  const [settingList, setSettingsList] = useState<studentGroupInfoT[]>(studentsTableInfo?.students_table_info || [])

  const closeSettingsModal = async () => {
    setShowModal()
    await patchTable({ id: 1, students_table_info: { students_table_info: settingList } })
  }

  useShowModal({ setShowModal })

  useEffect(() => {
    isSuccess && setSettingsList(studentsTableInfo?.students_table_info)
  }, [isSuccess])

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
              {settingList.map((item: studentGroupInfoT) => (
                <SettingItem key={item.order} item={item} settingList={settingList} setSettingsList={setSettingsList} />
              ))}
            </Reorder.Group>
          </form>
        </div>
      </div>
    </div>
  )
}
