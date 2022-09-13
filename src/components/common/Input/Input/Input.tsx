import { FC, memo, useEffect, useRef } from 'react'
import { InputPropsT } from '../../commonComponentsTypes'

import styles from './input.module.scss'

export const Input: FC<InputPropsT> = memo(props => {
  const { children, label, onClick, icon, type, id, name, onChange, value, placeholder, style, focus, ...rest } = props
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (focus) {
      inputRef?.current?.focus()
    }
  }, [focus])

  return (
    <div style={style} className={styles.input_container}>
      {label && (
        <label htmlFor={name} className={styles.input_container_textFieldLabel}>
          {label}
        </label>
      )}
      <div className={styles.input}>
        {children}
        <input
          {...rest}
          ref={inputRef}
          required
          id={id}
          name={name}
          type={type}
          onChange={onChange}
          value={value}
          onBlur={rest.onBlur}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
})
