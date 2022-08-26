import React, { MouseEvent, FC } from 'react'
import styles from './contentBtn.module.scss'

type ContentBtnPropsT = {
  alt: string
  text: string
  src: string
  func?: (event: MouseEvent) => void
}
export const ContentBtn: FC<ContentBtnPropsT> = ({ alt, src, text, func }) => {
  return (
    <div onClick={func} className={styles.lesson}>
      <img src={src} alt={alt} />
      <span>{text}</span>
    </div>
  )
}
