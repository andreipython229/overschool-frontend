import React, { FC } from 'react'
import styles from '../studentsLog.module.scss'

type SettingsGroupModalPropsT = {
  closeModal: () => void
}
export const SettingsGroupModal: FC<SettingsGroupModalPropsT> = ({ closeModal }) => {
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
      </div>
    </div>
  )
}
