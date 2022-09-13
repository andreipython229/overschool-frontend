import { ButtonHTMLAttributes, DetailedHTMLProps, FC, memo } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './navAccountBtn.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type NavAccountBtnPropsT = DefaultButtonPropsType & {
  text: string
  path: string
}
interface IIsActive {
  isActive?: boolean
}

export const NavAccountBtn: FC<NavAccountBtnPropsT> = memo(({ text, path }) => {
  const isActive = ({ isActive }: IIsActive): string =>
    isActive ? styles.nav_btn + ' ' + styles.active : styles.nav_btn
  return (
    <NavLink to={path} replace={true} className={isActive}>
      {text}
    </NavLink>
  )
})
