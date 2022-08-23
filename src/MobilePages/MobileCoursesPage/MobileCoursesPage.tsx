import React, { ChangeEvent, useState } from 'react'
import styles from './mobileCoursesPage.module.scss'
import { CourseSearchInput } from 'MobilePages/MobileCoursesPage/CourseSearchInput/CourseSearchInput'
import { MobileCourseBlock } from 'MobilePages/MobileCoursesPage/MobileCourseBlock/MobileCourseBlock'

export const MobileCoursesPage = () => {
  const [searchValue, setSearchValue] = useState<string>('')

  const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }
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
        <CourseSearchInput searchValue={searchValue} onChangeSearchValue={onChangeSearchValue} />
      </div>
      <span className={styles.title}>Мои курсы</span>
      <div className={styles.course}>
        <MobileCourseBlock
          name={'The Way Python'}
          progress={'13'}
          desc={
            ' Индивидуальное обучение по программе The Way Python! Ты станешь востребованным IT-разработчиком! У тебя 100% все получится! Здесь и сейчас!'
          }
        />
        {/*<MobileCourseBlock*/}
        {/*  name={'The Way Frontend'}*/}
        {/*  progress={'58'}*/}
        {/*  desc={*/}
        {/*    ' Индивидуальное обучение по программе The Way Frontend! Ты станешь востребованным IT-разработчиком! У тебя 100% все получится! Здесь и сейчас!'*/}
        {/*  }*/}
        {/*/>*/}
      </div>
    </div>
  )
}
