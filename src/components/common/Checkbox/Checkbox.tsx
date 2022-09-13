import { ChangeEvent, FC, memo, ReactNode } from 'react'

import styles from './checkbox.module.scss'

type CheckboxPropsT = {
  id?: string
  name?: string
  checked?: boolean
  children?: ReactNode
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox: FC<CheckboxPropsT> = memo(({ id, name, checked, onChange, children }) => {
  return (
    <>
      <input className={styles.custom_checkbox} type="checkbox" onChange={onChange} name={name} id={id} checked={checked} />
      <label htmlFor={id}> {children} </label>
    </>
  )
})
