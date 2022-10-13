import { FC, useState } from 'react'

import { MainSettingsGroup } from 'components/Modal/StudentLogs/SettingsGroupModal/Main'
import { AccessToClasses } from 'components/Modal/StudentLogs/SettingsGroupModal/AccessToClasses'
import { Messages } from 'components/Modal/StudentLogs/SettingsGroupModal/Messages'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { crossIconPath } from '../../../../config/commonSvgIconsPath'
import { settingsGroupIconPath } from '../config/svgIconsPath'
import { SettingsGroupModalPropsT } from '../../ModalTypes'
import { useDeleteStudentsGroupMutation } from '../../../../api/studentsGroupService'
import { navBtnsLables } from './config/navSwitchersLabels'
import { NavSwitcherBtn } from './NavSwitcherBtn'

import styles from '../studentsLog.module.scss'

export const SettingsGroupModal: FC<SettingsGroupModalPropsT> = ({ closeModal, groupId, name }) => {
  const [settingsActive, setSettingsActive] = useState<number>(0)
  const [blockHomework, setBlockHomework] = useState<boolean>(false)
  const [strongSubsequence, setStrongSubsequence] = useState<boolean>(false)

  const [deleteStudentsGroup] = useDeleteStudentsGroupMutation()

  const changeActiveLink = (id: number) => {
    setSettingsActive(id)
  }

  const handlerHomeworkCheck = () => {
    setBlockHomework(!blockHomework)
  }
  const handlerSubsequenceCheck = () => {
    setStrongSubsequence(!strongSubsequence)
  }

  const handleDeleteGroup = async () => {
    await deleteStudentsGroup(groupId)
    closeModal()
  }
  return (
    <div className={styles.container}>
      <div onClick={closeModal} className={styles.container_closed}>
        <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath} />
      </div>
      <div className={styles.groupSetting}>
        <div className={styles.container_header}>
          <IconSvg width={44} height={50} viewBoxSize="0 0 44 50" path={settingsGroupIconPath} />
          <span className={styles.container_header_title}>Настройки группы </span>
        </div>
        <div className={styles.container_navBlock}>
          {navBtnsLables?.map((label, index) => (
            <NavSwitcherBtn key={index} label={label} index={index} activeLink={settingsActive} changeActiveLink={changeActiveLink} />
          ))}
        </div>
        {settingsActive === 0 && (
          <MainSettingsGroup
            strongSubsequence={strongSubsequence}
            blockHomework={blockHomework}
            title={name}
            deleteGroup={handleDeleteGroup}
            handlerHomeworkCheck={handlerHomeworkCheck}
            handlerSubsequence={handlerSubsequenceCheck}
          />
        )}
        {settingsActive === 1 && <AccessToClasses />}
        {settingsActive === 2 && <Messages />}
      </div>
    </div>
  )
}
