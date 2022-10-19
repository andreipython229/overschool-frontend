import { FC, memo } from 'react'
import { InputAuthPropsT } from '../../../../types/commonComponentsTypes'

import styles from './inputAuth.module.scss'

export const InputAuth: FC<InputAuthPropsT> = memo(props => {
  const { label, onClick, icon, type, id, name, onChange, value, placeholder, ...rest } = props

  return (
    <div className={`${styles.input_container} ${rest.className}`}>
      <div className={styles.input_container_input}>
        <input id={id} name={name} type={type} onChange={onChange} value={value} onBlur={rest.onBlur} placeholder={placeholder} />
        <label htmlFor={name} className={styles.input_container_textFieldLabel}>
          {label}
        </label>
        {icon && <img onClick={onClick} className={styles.input_container_image} src={icon} alt="Button for show/close password" />}
      </div>
    </div>
  )
})
