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
  } else if (variant === 'leaveRequest') {
    propsStyle += ' ' + styles.leaveRequest
  } else if (variant === 'emptyInside') {
    propsStyle += ' ' + styles.emptyInside
  } else if (variant === 'newPrimary') {
    propsStyle += ' ' + styles.newPrimary
  } else if (variant === 'newSecondary') {
    propsStyle += ' ' + styles.newSecondary
  } else if (variant === 'withoutBack') {
    propsStyle += ' ' + styles.withoutBack
  } else if (variant === 'delete') {
    propsStyle += ' ' + styles.delete
  } else if (variant === 'logIn') {
    propsStyle += ' ' + styles.logIn
  } else if (variant === 'newLogIn') {
    propsStyle += ' ' + styles.newLogIn
  } else if (variant === 'create') {
    propsStyle += ' ' + styles.create
  } else if (variant === 'newCreate') {
    propsStyle += ' ' + styles.newCreate
  } else if (variant === 'goPlatform') {
    propsStyle += ' ' + styles.goPlatform
  } else if (variant === 'more') {
    propsStyle += ' ' + styles.more
  } else if (variant === 'tryForFree') {
      propsStyle += ' ' + styles.tryForFree
  } else if (variant === 'mobile') {
     propsStyle += ' ' + styles.mobile
  } else if (variant === 'newSecondaryHeader') {
     propsStyle += ' ' + styles.newSecondaryHeader
  } else if (variant === 'newLogInHeader') {
     propsStyle += ' ' + styles.newLogInHeader
  } else if (variant === 'newCreateHeader') {
     propsStyle += ' ' + styles.newCreateHeader
  } else if (variant === 'newLeaveRequest') {
     propsStyle += ' ' + styles.newLeaveRequest
  } else if (variant === 'newTryForFree') {
     propsStyle += ' ' + styles.newTryForFree
  } else if (variant === 'newMobile') {
     propsStyle += ' ' + styles.newMobile
  } else if (variant === 'inActive') {
    propsStyle += ' ' + styles.inActive
  } else if (variant === 'cancel') {
    propsStyle += ' ' + styles.cancel
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
