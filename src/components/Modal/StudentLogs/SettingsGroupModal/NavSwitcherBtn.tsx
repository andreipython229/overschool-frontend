import { FC, memo } from 'react'

import styles from '../studentsLog.module.scss'

type navSwitcherBtnT = {
  changeActiveLink: (index: number) => void
  label: string
  index: number
  activeLink: number
}

export const NavSwitcherBtn: FC<navSwitcherBtnT> = memo(({ changeActiveLink, index, activeLink, label }) => {
  return (
    <span
      onClick={() => changeActiveLink(index)}
      className={activeLink === index ? `${styles.container_navBlock_btn} ${styles.container_navBlock_active}` : styles.container_navBlock_btn}
    >
      {label}
    </span>
  )
})
