import { ChangeEvent, FC, FocusEvent } from 'react'

import styles from './inputAuth.module.scss'

export type InputAuthPropsT = {
  id?: string
  name: string
  type: string
  value: string
  icon?: string
  label?: string
  placeholder?: string
  onClick?: () => void
  onChange: (value: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent) => void
}

export const InputAuth: FC<InputAuthPropsT> = props => {
  const { label, onClick, icon, type, id, name, onChange, value, placeholder, ...rest } = props

  return (
    <div className={styles.input_container}>
      <div className={styles.input_container_input}>
        <input id={id} name={name} type={type} onChange={onChange} value={value} onBlur={rest.onBlur} placeholder={placeholder} />
        <label htmlFor={name} className={styles.input_container_textFieldLabel}>
          {label}
        </label>
        {icon && <img onClick={onClick} className={styles.input_container_image} src={icon} alt="Button for show/close password" />}
      </div>
    </div>
  )
}
