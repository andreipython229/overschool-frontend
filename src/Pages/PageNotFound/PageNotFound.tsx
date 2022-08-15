import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Path } from '../../enum/pathE'

import styles from './pageNotFound.module.scss'

export const PageNotFound = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(Path.InitialPage)
  }
  return (
    <div className={styles.main}>
      <div className={styles.main_container}>
        <p> Извините, но страница не существует или не найдена.</p>
        <button className={styles.main_link} onClick={goBack}>
          Back to start
        </button>
      </div>
    </div>
  )
}
