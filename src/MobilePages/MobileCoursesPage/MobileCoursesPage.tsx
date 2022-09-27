import React, { ChangeEvent, FC, memo, useEffect, useState } from 'react'
import { CourseSearchInput } from 'MobilePages/MobileCoursesPage/CourseSearchInput/CourseSearchInput'
import { MobileCourseBlock } from 'MobilePages/MobileCoursesPage/MobileCourseBlock/MobileCourseBlock'
import { useFetchCoursesQuery } from '../../api/coursesServices'
import { CoursesT } from '../../types/CoursesT'

import styles from './mobileCoursesPage.module.scss'

export const MobileCoursesPage: FC = memo(() => {
  const [searchValue, setSearchValue] = useState<string>('')

  const { data: coursesList } = useFetchCoursesQuery()
  console.log(coursesList)
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
        {coursesList &&
          coursesList?.map((course: CoursesT) => (
            <MobileCourseBlock id={course.course_id} key={course.course_id} name={course.name} img={course.photo_url} progress={'58'} desc={course.description} />
          ))}
      </div>
    </div>
  )
})
