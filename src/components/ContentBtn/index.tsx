import { FC, memo } from 'react'
import { ContentBtnPropsT } from '../componentsTypes'

import styles from './contentBtn.module.scss'

export const ContentBtn: FC<ContentBtnPropsT> = memo(({ alt, src, text, func, disabled = false }) => {
  return (
    <button disabled={disabled} onClick={func} className={styles.lesson}>
      <img src={src} alt={alt} />
      <span>{text}</span>
    </button>
  )
})
