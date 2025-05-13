import { FC, memo, useEffect, useRef, useState } from 'react'
import { InputPropsT } from '../../../../types/commonComponentsTypes'

import styles from './input.module.scss'
import PhoneInput from 'react-phone-input-2'

export const Input: FC<InputPropsT> = memo(props => {
  const { children, label, type, id, name, onChange, value, placeholder, style, focus, required, variant, error, onChangePhone, ...rest } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputClass, setInputClass] = useState<string>(styles.inputDefault)
  const phonePattern = /^\+\d{10,17}$/
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  useEffect(() => {
    if (props.variant) {
      switch (variant) {
        case 'feedback':
          return setInputClass(styles.inputFeedback)
        case 'phone':
          return setInputClass(styles.inputPhone)
        case 'default':
          return setInputClass(styles.inputDefault)
        case 'teacherInput':
          return setInputClass(styles.inputTeacher)
        default:
          return setInputClass(styles.inputDefault)
      }
    }
  }, [props, props.variant])

  function validateInput(inputValue: string, variant: string) {
    switch (variant) {
      case 'default':
        return inputValue.trim() !== ''

      case 'phone':
        return phonePattern.test(inputValue)

      case 'feedback':
        return inputValue.length > 0 && inputValue.length <= 500

      default:
        return false
    }
  }

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
      <div className={`${rest.className} ${inputClass} ${error ? styles.error : ''}`}>
        {children}
        {variant === 'phone' && onChangePhone ? (
          <PhoneInput
            inputProps={{
              name: 'phone_number',
              style: {
                border: 'none',
                height: '38px',
                borderRadius: '10px',
                width: '100%',
                fontSize: '20px',
              },
            }}
            specialLabel=""
            onChange={onChangePhone}
            value={value}
            onBlur={props.onBlur}
            placeholder="Номер телефона"
            country={'by'}
          />
        ) : (
          <input
            {...rest}
            style={{ borderStyle: 'hidden' }}
            className={styles.input_input}
            ref={inputRef}
            required={!required ? required : true}
            id={id}
            name={name}
            type={type}
            onChange={onChange}
            value={value}
            onBlur={rest.onBlur}
            placeholder={placeholder}
          />
        )}
      </div>
    </div>
  )
})
