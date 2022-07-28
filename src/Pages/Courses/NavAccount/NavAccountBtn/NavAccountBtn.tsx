import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC, memo } from "react"
import styles from "./navAccountBtn.module.scss"
import { NavLink } from "react-router-dom"

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type NavAccountBtnPropsT = DefaultButtonPropsType & {
  text: string
  path: string
}

export const NavAccountBtn: FC<NavAccountBtnPropsT> = memo(({ text, path, ...restProps }) => {
  // @ts-ignore
  const isActive = ({ isActive }) =>
    isActive ? styles.nav_btn + " " + styles.active : styles.nav_btn
  return (
    <NavLink to={path} replace={true} className={isActive}>
      {text}
    </NavLink>
  )
})
