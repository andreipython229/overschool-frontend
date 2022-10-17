import { FC, memo } from 'react'

import { RadioPropsT } from '../commonComponentsTypes'

import styles from './radio.module.scss'

export const Radio: FC<RadioPropsT> = memo(({ name, title, id, func }) => (
  <div onClick={func ? () => func(id || '') : () => console.log('заглушка')}>
    <input type="radio" name={name} id={id} className={styles.custom_radio} value={id} />
    <label htmlFor={id}>{title}</label>
  </div>
))
