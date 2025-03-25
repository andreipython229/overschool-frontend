import React, { FC, memo } from 'react'
import { RadioPropsT } from '../../../types/commonComponentsTypes'
import styles from './radio.module.scss'

export const Radio: FC<RadioPropsT> = React.memo(({ name, title, id, func, width, checked, onChange, value }) => (
  <div className={styles.radioContainer} style={width ? { width: width } : {}} onClick={func && (() => func(id || ''))} key={id}>
    <input type="radio" name={name} id={id} className={styles.custom_radio} value={value || id} key={`${id}`} checked={checked} onChange={onChange} />
    <label htmlFor={id}>{title}</label>
  </div>
))
