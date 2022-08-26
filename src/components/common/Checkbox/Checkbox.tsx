import React, { ChangeEvent, FC } from 'react'

import styles from './checkbox.module.scss'

type CheckboxPropsT = {
  id?: string
  name?: string
  checked?: boolean
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox: FC<CheckboxPropsT> = ({ id, name, checked, onChange }) => {
  return (
    <>
      <input className={styles.custom_checkbox} type="checkbox" onChange={onChange} name={name} id={id} checked={checked} />
      <label htmlFor={id} />
    </>
  )
}
