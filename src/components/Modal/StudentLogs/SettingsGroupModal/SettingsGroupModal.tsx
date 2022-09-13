import { FC, useState } from 'react'

import { MainSettingsGroup } from 'components/Modal/StudentLogs/SettingsGroupModal/common/Main'
import { AccessToClasses } from 'components/Modal/StudentLogs/SettingsGroupModal/common/AccessToClasses'
import { Messages } from 'components/Modal/StudentLogs/SettingsGroupModal/common/Messages'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { crossIconPath } from '../../../../config/commonSvgIconsPath'
import { settingsGroupIconPath } from '../config/svgIconsPath'

import styles from '../studentsLog.module.scss'

type SettingsGroupModalPropsT = {
  closeModal: () => void
}
type NavSwitcherPropsT = {
  changeActiveLink: (id: number) => void
  activeLink: number
}

const NavSwitcher: FC<NavSwitcherPropsT> = ({ changeActiveLink, activeLink }) => {
  return (
    <div className={styles.container_navBlock}>
      <span
        onClick={() => changeActiveLink(0)}
        className={activeLink === 0 ? styles.container_navBlock_btn + ' ' + styles.container_navBlock_active : styles.container_navBlock_btn}
      >
        Основные
      </span>
      <span
        onClick={() => changeActiveLink(1)}
        className={activeLink === 1 ? styles.container_navBlock_btn + ' ' + styles.container_navBlock_active : styles.container_navBlock_btn}
      >
        Доступ к занятиям
      </span>
      <span
        onClick={() => changeActiveLink(2)}
        className={activeLink === 2 ? styles.container_navBlock_btn + ' ' + styles.container_navBlock_active : styles.container_navBlock_btn}
      >
        Сообщения
      </span>
    </div>
  )
}

export const SettingsGroupModal: FC<SettingsGroupModalPropsT> = ({ closeModal }) => {
  const [settingsActive, setSettingsActive] = useState<number>(0)
  const [blockHomework, setBlockHomework] = useState<boolean>(false)
  const [strongSubsequence, setStrongSubsequence] = useState<boolean>(false)

  const changeActiveLink = (id: number) => {
    setSettingsActive(id)
  }

  const handlerHomeworkCheck = () => {
    setBlockHomework(!blockHomework)
  }
  const handlerSubsequenceCheck = () => {
    setStrongSubsequence(!strongSubsequence)
  }

  const deleteGroup = () => {
    // delete group fnc
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div onClick={closeModal} className={styles.container_closed}>
          <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath} />
        </div>
        <div className={styles.groupSetting}>
          <div className={styles.container_header}>
            <IconSvg width={44} height={50} viewBoxSize="0 0 44 50" path={settingsGroupIconPath} />
            <span className={styles.container_header_title}>Настройки группы </span>
          </div>
          <NavSwitcher activeLink={settingsActive} changeActiveLink={changeActiveLink} />
          {settingsActive === 0 && (
            <MainSettingsGroup
              strongSubsequence={strongSubsequence}
              blockHomework={blockHomework}
              deleteGroup={deleteGroup}
              handlerHomeworkCheck={handlerHomeworkCheck}
              handlerSubsequence={handlerSubsequenceCheck}
            />
          )}
          {settingsActive === 1 && <AccessToClasses />}
          {settingsActive === 2 && <Messages />}
        </div>
      </div>
    </div>
  )
}
