import React, { FC, useState } from 'react'
import styles from '../studentsLog.module.scss'
import { MainSettingsGroup } from 'components/Modal/StudentLogs/SettingsGroupModal/common/Main'
import { AccessToClasses } from 'components/Modal/StudentLogs/SettingsGroupModal/common/AccessToClasses'
import { Messages } from 'components/Modal/StudentLogs/SettingsGroupModal/common/Messages'

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
        className={
          activeLink === 0
            ? styles.container_navBlock_btn + ' ' + styles.container_navBlock_active
            : styles.container_navBlock_btn
        }
      >
        Основные
      </span>
      <span
        onClick={() => changeActiveLink(1)}
        className={
          activeLink === 1
            ? styles.container_navBlock_btn + ' ' + styles.container_navBlock_active
            : styles.container_navBlock_btn
        }
      >
        Доступ к занятиям
      </span>
      <span
        onClick={() => changeActiveLink(2)}
        className={
          activeLink === 2
            ? styles.container_navBlock_btn + ' ' + styles.container_navBlock_active
            : styles.container_navBlock_btn
        }
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
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.3125 12.6875L12.6875 1.3125M12.6875 12.6875L1.3125 1.3125"
              stroke="#E0DCED"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className={styles.groupSetting}>
          <div className={styles.container_header}>
            <svg
              width="44"
              height="50"
              viewBox="0 0 44 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.75 5.75C12.2312 5.75 11 6.98122 11 8.5C11 10.0188 12.2312 11.25 13.75 11.25C15.2688 11.25 16.5 10.0188 16.5 8.5C16.5 6.98122 15.2688 5.75 13.75 5.75ZM5.96944 5.75C7.10199 2.54572 10.1579 0.25 13.75 0.25C17.3421 0.25 20.398 2.54572 21.5306 5.75H41.25C42.7688 5.75 44 6.98122 44 8.5C44 10.0188 42.7688 11.25 41.25 11.25H21.5306C20.398 14.4543 17.3421 16.75 13.75 16.75C10.1579 16.75 7.10199 14.4543 5.96944 11.25H2.75C1.23122 11.25 0 10.0188 0 8.5C0 6.98122 1.23122 5.75 2.75 5.75H5.96944ZM30.25 22.25C28.7312 22.25 27.5 23.4812 27.5 25C27.5 26.5188 28.7312 27.75 30.25 27.75C31.7688 27.75 33 26.5188 33 25C33 23.4812 31.7688 22.25 30.25 22.25ZM22.4694 22.25C23.602 19.0457 26.6579 16.75 30.25 16.75C33.8421 16.75 36.898 19.0457 38.0306 22.25H41.25C42.7688 22.25 44 23.4812 44 25C44 26.5188 42.7688 27.75 41.25 27.75H38.0306C36.898 30.9543 33.8421 33.25 30.25 33.25C26.6579 33.25 23.602 30.9543 22.4694 27.75H2.75C1.23122 27.75 0 26.5188 0 25C0 23.4812 1.23122 22.25 2.75 22.25H22.4694ZM13.75 38.75C12.2312 38.75 11 39.9812 11 41.5C11 43.0188 12.2312 44.25 13.75 44.25C15.2688 44.25 16.5 43.0188 16.5 41.5C16.5 39.9812 15.2688 38.75 13.75 38.75ZM5.96944 38.75C7.10199 35.5457 10.1579 33.25 13.75 33.25C17.3421 33.25 20.398 35.5457 21.5306 38.75H41.25C42.7688 38.75 44 39.9812 44 41.5C44 43.0188 42.7688 44.25 41.25 44.25H21.5306C20.398 47.4543 17.3421 49.75 13.75 49.75C10.1579 49.75 7.10199 47.4543 5.96944 44.25H2.75C1.23122 44.25 0 43.0188 0 41.5C0 39.9812 1.23122 38.75 2.75 38.75H5.96944Z"
                fill="#BA75FF"
              />
            </svg>
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
