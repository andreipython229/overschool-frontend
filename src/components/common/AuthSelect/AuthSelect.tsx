import React, { FC, memo, useState } from 'react'
import { IconSvg } from '../IconSvg/IconSvg'
import { emailSvgIcon, phoneSvgIcon } from '../../../constants/iconSvgConstants'

import styles from './authSelect.module.scss'

type AuthSelectPropsT = {
  getInputVariant: (variant: string) => void
}

export const AuthSelect: FC<AuthSelectPropsT> = memo(({ getInputVariant }) => {
  const [variant, setVariant] = useState<string>('email')
  const [context, setContext] = useState<boolean>(false)

  const changeInputVariant = (variant: string): void => {
    getInputVariant(variant)
    setVariant(variant)
  }
  return (
    <div onClick={() => setContext(!context)} className={styles.container}>
      {variant === 'email' ? (
        <IconSvg
          width={20}
          height={16}
          fill="#6C6C6C"
          d={emailSvgIcon}
          viewBoxSize="0 0 20 16"
          className={styles.email}
        />
      ) : (
        <IconSvg
          width={14}
          height={22}
          fill="#6C6C6C"
          d={phoneSvgIcon.phone}
          d2={phoneSvgIcon.dot}
          viewBoxSize="0 0 14 22"
          className={styles.phone}
        />
      )}
      {context ? (
        <div className={styles.popup}>
          <div
            onClick={() => changeInputVariant('phone')}
            className={variant === 'phone' ? styles.checked : ''}
          >
            Номер телефона
          </div>
          <div
            onClick={() => changeInputVariant('email')}
            className={variant === 'email' ? styles.checked : ''}
          >
            E-mail
          </div>
        </div>
      ) : null}
    </div>
  )
})
