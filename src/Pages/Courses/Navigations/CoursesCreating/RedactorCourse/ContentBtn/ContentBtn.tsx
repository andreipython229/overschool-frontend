import React, { FC } from 'react'
import styles from './contentBtn.module.scss'

type ContentBtnPropsT = {
  alt: string
  text: string
  src: string
}
export const ContentBtn: FC<ContentBtnPropsT> = ({ alt, src, text }) => {
  return (
    <div className={styles.lesson}>
      <img src={src} alt={alt} />
      <span>{text}</span>
    </div>
  )
}
