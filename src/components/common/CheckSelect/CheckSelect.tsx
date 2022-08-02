import React, { FC, useState } from 'react'
import { Checkbox } from 'components/common/Checkbox/Checkbox'
import styles from './checkSelect.module.scss'

type CheckSelectPropsT = {
  text: string
  children?: React.ReactNode
}

export const CheckSelect: FC<CheckSelectPropsT> = ({ text, children }) => {
  const [openChildren, setOpenChildren] = useState<boolean>(false)
  const [checkbox, setCheckbox] = useState<boolean>(false)
  const onChangeCheckbox = () => {
    setCheckbox(!checkbox)
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Checkbox
            id={'checkbox'}
            name={'checkbox'}
            checked={checkbox}
            onChange={onChangeCheckbox}
          />
          <span>{text}</span>
          <svg
            className={openChildren ? styles.content_arrow_open : styles.content_arrow}
            onClick={() => setOpenChildren(!openChildren)}
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.851982 0.518485C1.20996 0.160505 1.79036 0.160505 2.14834 0.518485L7.00016 5.3703L11.852 0.518485C12.21 0.160505 12.7904 0.160505 13.1483 0.518485C13.5063 0.876466 13.5063 1.45687 13.1483 1.81485L7.64834 7.31485C7.29036 7.67283 6.70996 7.67283 6.35198 7.31485L0.851982 1.81485C0.494001 1.45687 0.494001 0.876466 0.851982 0.518485Z"
              fill="#A8ABAD"
            />
          </svg>
        </div>
      </div>
      {children}
    </>
  )
}
