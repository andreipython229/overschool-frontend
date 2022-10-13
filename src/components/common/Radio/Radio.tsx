import { FC } from 'react'

import { RadioPropsT } from '../commonComponentsTypes'

import styles from './radio.module.scss'

export const Radio: FC<RadioPropsT> = ({ name, title, id, func }) => (
  <div onClick={func ? func : () => console.log('заглушка')}>
    <input type="radio" name={name} id={id} className={styles.custom_radio} value={id} />
    <label htmlFor={id}>{title}</label>
  </div>
)
