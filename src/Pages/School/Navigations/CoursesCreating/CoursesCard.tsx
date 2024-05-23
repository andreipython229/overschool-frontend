import { FC, ReactNode, useEffect } from 'react'
import { CoursesDataT } from '../../../../types/CoursesT'

import styles from './coursePage.module.scss'
import { RoleE } from '../../../../enum/roleE'
import Public from '../../../../assets/img/createCourse/public.svg'
import notPublic from '../../../../assets/img/createCourse/notPublic.svg'
import { generatePath, Link } from 'react-router-dom'
import { Path, Student } from '../../../../enum/pathE'
import { Button } from '../../../../components/common/Button/Button'
import pie from '../../../../assets/img/studentPage/folder-todo.png'
import { useLazyFetchProgressQuery } from '../../../../api/userProgressService'
import { SimpleLoader } from '../../../../components/Loaders/SimpleLoader'
import ProgressBar from '@ramonak/react-progress-bar'
import { CreateCoursePath } from 'enum/pathE'
import { NavAccountBtn } from 'components/NavAccountBtn/NavAccountBtn'

type courseCard = {
  course: CoursesDataT
  renderProps?: (course: CoursesDataT) => ReactNode
  role: number
}

export const CoursesCard: FC<courseCard> = ({ course, role }) => {
  const schoolName = window.location.href.split('/')[4]
  const [fetchProgress, { data: userProgress, isLoading, isError }] = useLazyFetchProgressQuery()

  useEffect(() => {
    if (role === RoleE.Student) {
      fetchProgress({ course_id: String(course?.course_id), schoolName })
    }
  }, [course])

  if (isLoading || isError) {
    return <SimpleLoader style={{ width: '100px', height: '100px' }} />
  }

  return (
    <div id={`${course?.course_id}`} className={styles?.course_card}>
      <>
        {role === RoleE.Admin ? (
          <>
            <div className={styles.course_card_img}>
              {course.photo ? (
                <img className={styles.course_card_img} src={`${course.photo}`} alt="course_cover" />
              ) : (
                <div className={styles.no_image_found}>
                  <span>Нет изображения материала :(</span>
                </div>
              )}
            </div>
            <div className={styles.course_card_about}>
              <span className={styles.course_card_status_show}>
                {course?.public === 'О' ? (
                  <>
                    <img src={Public} alt="status course" />
                    <span className={styles.course_card_status_show_public}>Опубликован</span>
                  </>
                ) : (
                  <>
                    <img src={notPublic} alt="status course" />
                    <span className={styles.course_card_status_show_public}>Не опубликован</span>
                  </>
                )}
              </span>
              <h5>{course.name}</h5>
              <span className={styles.course_card_about_desc_admin}>{course?.description}</span>
              <Link
                to={generatePath(Path.CreateCourse + 'student/', {
                  course_id: `${course?.course_id}`,
                })}
              >
                <Button className={styles.btn_admin} text={'Ученики материала'} />
              </Link>
              <Link
                to={generatePath(Path.CreateCourse, {
                  course_id: `${course?.course_id}`,
                })}
              >
                <Button className={styles.btn_admin} text={'Редактировать'} />
              </Link>
            </div>
          </>
        ) : (
          userProgress && (
            <>
              <div className={styles.course_card_img}>
                <img className={styles.course_card_img} src={course?.photo} alt="" />
              </div>
              <div className={styles.course_card_progressBar}>
                <span className={styles.course_card_progressBar_line}>
                  <ProgressBar
                    completed={userProgress.courses[0]?.completed_percent}
                    bgColor="#ba75ff"
                    labelSize="10px"
                    borderRadius="0px"
                    height="100%"
                    customLabel=" "
                  />
                </span>
              </div>
              <div className={styles.course_card_about}>
                <Link
                  onClick={() => localStorage.setItem('course_id', '' + course?.course_id)}
                  to={
                    course?.remaining_period === 0
                      ? '#'
                      : generatePath(Student.Course, {
                          course_id: `${course?.course_id}`,
                        })
                  }
                >
                  <div className={styles.course_card_about_progressWrapper}>
                    <img src={pie} alt="pie" />
                    <span className={styles.course_card_about_progressWrapper_title}>{userProgress.courses[0].completed_percent}% пройдено</span>
                  </div>
                  <span className={styles.course_card_status_show}> </span>
                  <h5>{course.name}</h5>
                  <span className={styles.course_card_about_desc}>{course?.description}</span>
                  <div className={styles.course_card_duration}>
                    {course.limit && <p className={styles.course_card_duration_limit}>Срок доступа: {course.limit} дн.</p>}
                    {course?.limit &&
                      (course?.remaining_period ? (
                        <p className={styles.course_card_duration_remaining}>Срок доступа истекает через, дн.: {course?.remaining_period}</p>
                      ) : (
                        <p className={styles.course_card_duration_remaining_expired}>Срок доступа истек</p>
                      ))}
                  </div>

                  <Button className={styles.btn} text={'Ознакомиться с материалами'} disabled={course?.remaining_period === 0} />
                </Link>
              </div>
            </>
          )
        )}
      </>
    </div>
  )
}
