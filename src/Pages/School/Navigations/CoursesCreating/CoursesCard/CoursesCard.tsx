import { FC, memo } from 'react'
import { generatePath, Link } from 'react-router-dom'
import { CoursesT } from '../../../../../types/CoursesT'
import { Button } from '../../../../../components/common/Button/Button'

import { Path } from '../../../../../enum/pathE'
import { useAppDispatch } from '../../../../../store/hooks'
import { addCourseId } from 'store/redux/course/slice'

import notPublic from '../../../../../assets/img/createCourse/notPublic.svg'
import Public from '../../../../../assets/img/createCourse/public.svg'

import styles from '../coursePage.module.scss'

export const CoursesCard: FC<CoursesT> = memo(({ course_id, published, name, description, photo_url }) => {
  const dispatch = useAppDispatch()

  const getCourseId = () => {
    dispatch(addCourseId(course_id))
  }

  return (
    <div id={course_id && course_id} className={styles.course_card}>
      <div className={styles.course_card_img}>
        <img className={styles.course_card_img} src={photo_url} alt="" />
      </div>
      <div className={styles.course_card_about}>
        <span className={styles.course_card_status_show}>
          {published ? (
            <>
              <img src={Public} alt="status course" />
              <span className={styles.course_card_status_show_public}>Опубликован</span>
            </>
          ) : (
            <>
              <img src={notPublic} alt="status course" />
              <span className={styles.course_card_status_show_public}>Не публикован</span>
            </>
          )}
        </span>
        <h5>{name}</h5>
        <span className={styles.course_card_about_desc}>{description}</span>
        <Link
          to={generatePath(Path.CreateCourse, {
            course_id: course_id,
          })}
        >
          <Button onClick={getCourseId} className={styles.btn} text={'Редактировать'} />
        </Link>
      </div>
    </div>
  )
})
