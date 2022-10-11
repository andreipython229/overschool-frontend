import { FC, useState, useEffect } from 'react'
import { Reorder } from 'framer-motion'

import { SettingStudentTableT } from '../ModalTypes'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { SettingItem } from './SettingItem'
import { crossIconPath } from '../../../config/commonSvgIconsPath'
import { useFetchStudentsTableHeaderQuery, usePatchStudentsTableHeaderMutation } from '../../../api/studentsGroupService'
import { studentGroupInfoT } from 'types/studentsGroup'
import { useDebounceFunc } from 'customHooks/useDebounceFunc'

import styles from '../Modal.module.scss'
import scss from './settingStudentTable.module.scss'

export const SettingStudentTable: FC<SettingStudentTableT> = ({ setShowModal }) => {
  const { data: studentsTableInfo, isSuccess } = useFetchStudentsTableHeaderQuery(4)
  const [patchTable] = usePatchStudentsTableHeaderMutation()
  const debounced = useDebounceFunc(() => patchTable({ id: 4, students_table_info: settingList  }), 1000)

  const [settingList, setSettingsList] = useState<studentGroupInfoT[]>([])

  const closeSettingsModal = async () => {
    setShowModal()
  }

  useEffect(() => {
    isSuccess && setSettingsList(studentsTableInfo?.students_table_info)
  }, [isSuccess])

  useEffect(() => {
    debounced()
  }, [settingList])

  return (
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
  )
}
