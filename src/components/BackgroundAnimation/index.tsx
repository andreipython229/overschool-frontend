import React from 'react'
import styles from './bgAnimation.module.scss'

export const BackgroundAnimation: React.FC = () => {
  return (
    <>
      <div className={styles.bg}>
        <div className={styles.bg_wrap1} style={{ filter: 'blur(50px)' }}></div>
      </div>
      <div className={styles.bg}>
        <div className={styles.bg_wrap2} style={{ filter: 'blur(50px)' }}></div>
      </div>
      <div className={styles.bg}>
        <div className={styles.bg_wrap3} style={{ filter: 'blur(50px)' }}></div>
      </div>
      <div className={styles.bg}>
        <div className={styles.bg_wrap4} style={{ filter: 'blur(50px)' }}></div>
      </div>
    </>
  )
}
