import React, { DetailedHTMLProps, FC, InputHTMLAttributes } from "react"
import styles from "./input.module.scss"

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export type InputPropsT = DefaultInputPropsType & {
  id?: string
  name: string
  type: string
  onChange: (value: any) => void
  value: string
  onBlur?: (e: any) => void
  icon?: string
  onClick?: () => void
  label?: string
  placeholder?: string
}

export const Input: FC<InputPropsT> = (props) => {
  const { label, onClick, icon, type, id, name, onChange, value, placeholder, style, ...rest } =
    props
  return (
    <div style={style} className={styles.input_container}>
      {label && (
        <label htmlFor={name} className={styles.input_container_textFieldLabel}>
          {label}
        </label>
      )}
      <div className={styles.input}>
        <input
          {...rest}
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
}
