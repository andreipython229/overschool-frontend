import { FC, memo } from 'react'

import { CheckboxPropsT } from '../commonComponentsTypes'

import styles from './checkbox.module.scss'

export const Checkbox: FC<CheckboxPropsT> = memo(({ id, name, checked, onChange, children }) => {
  return (
    <>
      <input className={styles.custom_checkbox} type="checkbox" onChange={onChange} name={name} id={id} checked={checked} />
      <label htmlFor={id}> {children} </label>
    </>
  )
})
