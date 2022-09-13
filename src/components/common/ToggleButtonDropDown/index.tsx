// used once at coursed page

import { FC } from 'react'

import { IconSvg } from '../IconSvg/IconSvg'
import { arrowIcon } from '../../../constants/iconSvgConstants'

import styles from '../ToggleButtonDropDown/toggle_btn_drop_down.module.scss'

type ToggleButtonDropDown = {
  isOpen: boolean
  handleToggleHiddenBlocks: () => void
}

export const ToggleButtonDropDown: FC<ToggleButtonDropDown> = ({ isOpen, handleToggleHiddenBlocks }) => {
  return (
    <button className={styles.modal_btn_is_toggle} onClick={handleToggleHiddenBlocks}>
      <span className={isOpen ? styles.arrow_rotate : ''}>
        <IconSvg width={50} height={50} fill="#9A9A9A" d={arrowIcon} viewBoxSize="0 0 21 21" />
      </span>
      {isOpen ? 'Скрыть все курсы' : 'Показать все курсы'}
    </button>
  )
}
