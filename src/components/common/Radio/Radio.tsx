import React, { FC } from 'react'

import styles from './radio.module.scss'

type RadioPropsT = {
  title: string
  id: string
}

export const Radio: FC<RadioPropsT> = ({ title, id }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <input name={id} id={id} className={styles.custom_radio} type="radio" />
    <label htmlFor={id}>{title}</label>
  </div>
)
