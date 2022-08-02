import React, { FC, memo, useState } from 'react'
import styles from '../checkSelect.module.scss'
import { Checkbox } from 'components/common/Checkbox/Checkbox'

type CheckSelectChildrenPropsT = {
  text: string
}

export const CheckSelectChildren: FC<CheckSelectChildrenPropsT> = memo(({ text }) => {
  const [checkbox, setCheckbox] = useState<boolean>(false)
  const handlerCheckbox = () => {
    setCheckbox(!checkbox)
  }
  return (
    <div
      style={checkbox ? { backgroundColor: '#F5EBFF' } : { backgroundColor: '#F6F6F6' }}
      className={styles.selectChildren}
    >
      <div className={styles.selectChildren_content}>
        <Checkbox id={'lesson'} name={'lesson'} checked={checkbox} onChange={handlerCheckbox} />
        <div>
          <span>{text}</span>
          <div>
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.32812 10.8906H10.8906V15.9688M1.90625 7.375H19.0938M14.4062 4.25V1.125M6.59375 4.25V1.125M3.46875 19.875H17.5312C18.3942 19.875 19.0938 19.1754 19.0938 18.3125V4.25C19.0938 3.38706 18.3942 2.6875 17.5312 2.6875H3.46875C2.60581 2.6875 1.90625 3.38705 1.90625 4.25V18.3125C1.90625 19.1754 2.6058 19.875 3.46875 19.875Z"
                stroke="#9884AC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
})
