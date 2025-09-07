import { FC, memo } from 'react'

import { CheckboxPropsT } from '../../../types/commonComponentsTypes'

import styles from './checkbox.module.scss'

export const Checkbox: FC<CheckboxPropsT> = memo(({ id, name, checked, onChange, children }) => {
  return (
    <>
      <label className={styles.label} htmlFor={id}>
        <input className={styles.label_input} type="checkbox" onChange={onChange} name={name} id={id} checked={checked} />
        <span className={styles.label_customCheckbox} />
        {children}
      </label>
    </>
  )
})
