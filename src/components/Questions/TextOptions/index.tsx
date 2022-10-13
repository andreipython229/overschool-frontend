import { ChangeEvent, FC, memo, useEffect, useState } from 'react'
import { IconSvg } from 'components/common/IconSvg/IconSvg'

import styles from './textOptions.module.scss'

export const TextOptions = () => {

  return (
    <div className={styles.wrapper}>
        <div className={styles.wrapper_header}>
            <div className={styles.wrapper_header_iconWrapper}>
                <div className={styles.wrapper_header_iconWrapper_iconRow}>
                    <span/>
                </div>
                <div className={styles.wrapper_header_iconWrapper_iconRow}>
                    <span/>
                </div>
                <div className={styles.wrapper_header_iconWrapper_iconRow}>
                    <span/>
                </div>
            </div>
            <div></div>
        </div>
        <div className={styles.wrapper_questionBlock}>
            <h4 className={styles.wrapper_questionBlock_title}>Введите вопрос:</h4>
        </div>
        <div className={styles.wrapper_answerOptionsBlock}>
            <h4 className={styles.wrapper_answerOptionsBlock_title}>Добавьте варианты ответов:</h4>
        </div>
    </div>
  )
}
