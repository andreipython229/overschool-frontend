import { FC, memo, useEffect, useRef } from 'react'
import { InputPropsT } from '../../../../types/commonComponentsTypes'

import styles from './input.module.scss'

export const Input: FC<InputPropsT> = memo(props => {
  const { children, label, type, id, name, onChange, value, placeholder, style, focus, required, ...rest } = props
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
          required={!required? required: true}
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
