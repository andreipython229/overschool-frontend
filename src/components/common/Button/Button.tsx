import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC, memo } from 'react'

import styles from './button.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type SuperButtonPropsT = DefaultButtonPropsType & {
  text: string
  variant?:
    | 'default'
    | 'primary'
    | 'disabled'
    | 'registrationDisabled'
    | 'secondary'
    | 'withoutBack'
    | 'delete'
    | 'logIn'
    | 'create'
}

export const Button: FC<SuperButtonPropsT> = memo(({ text, variant = 'default', ...restProps }) => {
  let propsStyle = styles.btn_default

  if (variant === 'primary') {
    propsStyle += ' ' + styles.primary
  } else if (variant === 'disabled') {
    propsStyle += ' ' + styles.disabled
  } else if (variant === 'registrationDisabled') {
    propsStyle += ' ' + styles.registartionDisabled
  } else if (variant === 'secondary') {
    propsStyle += ' ' + styles.secondary
  } else if (variant === 'withoutBack') {
    propsStyle += ' ' + styles.withoutBack
  } else if (variant === 'delete') {
    propsStyle += ' ' + styles.delete
  } else if (variant === 'logIn') {
    propsStyle += ' ' + styles.logIn
  } else if (variant === 'create') {
    propsStyle += ' ' + styles.create
  } else {
    propsStyle = styles.btn_default
  }

  return (
    <>
      <button {...restProps} className={restProps.className || propsStyle}>
        {text}
      </button>
    </>
  )
})
