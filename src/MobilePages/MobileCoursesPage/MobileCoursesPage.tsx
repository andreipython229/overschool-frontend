import React from 'react'
import styles from './mobileCoursesPage.module.scss'

export const MobileCoursesPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_container}>
          <img src="" alt="" />
          <div className={styles.header_container_title}>
            <span>Онлайн-обучение</span>
            <span>Название</span>
            <span>Краткое описание</span>
          </div>
        </div>
      </div>
      <div className={styles.search}>
        <input type="text" placeholder={'Поиск по курсам и категориям'} />
      </div>
    </div>
  )
}
