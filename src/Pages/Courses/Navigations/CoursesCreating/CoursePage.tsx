import React, { FC, memo } from 'react'

import { CoursesCard } from './CoursesCard/CoursesCard'
import { CoursesT } from '../../../../store/redux/courses/slice'

// import DontShow from 'assets/img/createCourse/notPublic.svg'
// import Hide from 'assets/img/createCourse/dontShow.svg'

import styles from 'Pages/Courses/Navigations/CoursesCreating/coursePage.module.scss'

type CoursePagePropsT = {
  courses: any
  setShowModal: () => void
}

export const CoursePage: FC<CoursePagePropsT> = memo(({ setShowModal, courses }) => {
  // const avatar = useAppSelector((state): any => state.user?.avatar)

  return (
    <div className={styles.container}>
      <div>
        <input className={styles.input} type="text" placeholder={'Поиск по курсам и категориям'} />
      </div>

      <div className={styles.course}>
        {courses &&
          courses.map((course: CoursesT) => (
            <CoursesCard
              key={course.course_id}
              course_id={course.course_id}
              created_at={course.created_at}
              updated_at={course.updated_at}
              published={course.published}
              order={course.order}
              name={course.name}
              format={course.format}
              duration_days={course.duration_days}
              price={course.price}
              description={course.description}
              photo={course.photo}
              photo_url={course.photo_url}
              author_id={course.author_id}
            />
          ))}

        <div onClick={setShowModal} className={styles.course_card}>
          <div className={styles.course_addCourse}>
            <span>Создать курс</span>
          </div>
        </div>
      </div>
    </div>
  )
})
