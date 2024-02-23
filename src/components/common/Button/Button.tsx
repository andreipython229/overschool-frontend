import { FC, memo } from 'react'
import { SuperButtonPropsT } from '../../../types/commonComponentsTypes'

import styles from './button.module.scss'

export const Button: FC<SuperButtonPropsT> = memo(({ text, variant = 'default', children, ...restProps }) => {
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
    <button {...restProps} className={` ${propsStyle} ${restProps.className}`}>
      {children}
      {text}
    </button>
  )
})
