import { FC, memo, useState } from 'react'

import { IconSvg } from '../IconSvg/IconSvg'
import { LoginParamsT } from '../../../utils/validationLogin'
import { AuthSelectPropsT } from '../../../types/commonComponentsTypes'
import { emailIconPath, phoneIconPath } from './config/svgIconsPath'

import styles from './authSelect.module.scss'

export const AuthSelect: FC<AuthSelectPropsT> = memo(({ getInputVariant }) => {
  const [variant, setVariant] = useState<string>('email')
  const [context, setContext] = useState<boolean>(false)

  const changeInputVariant = (variant: keyof LoginParamsT): void => {
    getInputVariant(variant)
    setVariant(variant)
  }

  return (
    <div onClick={() => setContext(!context)} className={styles.container}>
      {variant === 'email' ? (
        <IconSvg width={20} height={16} viewBoxSize="0 0 20 16" className={styles.email} path={emailIconPath} />
      ) : (
        <IconSvg width={14} height={22} viewBoxSize="0 0 14 22" className={styles.phone} path={phoneIconPath} />
      )}
      {context ? (
        <div className={styles.popup}>
          <div onClick={() => changeInputVariant('phone')} className={variant === 'phone' ? styles.checked : ''}>
            Номер телефона
          </div>
          <div onClick={() => changeInputVariant('email')} className={variant === 'email' ? styles.checked : ''}>
            E-mail
          </div>
        </div>
      ) : null}
    </div>
  )
})
