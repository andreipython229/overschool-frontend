import React, { useState } from 'react'
import styles from './modal_check_home_work.module.scss'
import { MyEditor } from '../../MyEditor/MyEditor'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { arrowIcon } from '../../../constants/iconSvgConstants'

export const ModalCheckHomeWork = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleToggleHiddenBlocks = (): void => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_header}></div>
      <div className={styles.modal_visibility_block}>
        <MyEditor />
      </div>
      <button className={styles.modal_btn_is_toggle} onClick={handleToggleHiddenBlocks}>
        <span className={isOpen ? styles.arrow_rotate : ''}>
          <IconSvg width={25} height={25} fill="#9A9A9A" d={arrowIcon} viewBoxSize="0 0 21 21" />
        </span>
        {isOpen ? 'Скрыть историю проверки' : 'Показать историю проверки'}
      </button>
      {isOpen && (
        <div className={styles.modal_hidden_block}>
          <p>fdsfsdfsdfsd</p>
          <p>fdsfsdfsdfsd</p>
          <p>fdsfsdfsdfsd</p>
          <p>fdsfsdfsdfsd</p>
          <p>fdsfsdfsdfsd</p>
        </div>
      )}
    </div>
  )
}
