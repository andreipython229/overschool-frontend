import { FC } from 'react'

import { ToggleButtonDropDownT } from '../commonComponentsTypes'
import { IconSvg } from '../IconSvg/IconSvg'
import { toggleBtnArr } from 'config/commonSvgIconsPath'

import styles from '../ToggleButtonDropDown/toggle_btn_drop_down.module.scss'

export const ToggleButtonDropDown: FC<ToggleButtonDropDownT> = ({ isOpen, handleToggleHiddenBlocks, nameOfItems }) => {
  return (
    <button className={styles.modal_btn_is_toggle} onClick={handleToggleHiddenBlocks}>
      <span className={isOpen ? styles.arrow_rotate : ''}>
        <IconSvg width={15} height={9} viewBoxSize="0 0 15 9" path={toggleBtnArr} />
      </span>
      {isOpen ? `Скрыть все ${nameOfItems}` : `Показать все ${nameOfItems}`}
    </button>
  )
}
