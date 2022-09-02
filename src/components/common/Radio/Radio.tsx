import { FC } from 'react'

import styles from './radio.module.scss'

type RadioPropsT = {
  title: string
  id: string
}

export const Radio: FC<RadioPropsT> = ({ title, id }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <input type="radio" name={title} id={id} className={styles.custom_radio} value={id} />
    <label htmlFor={id}>{title}</label>
  </div>
)
