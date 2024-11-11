import { FC, ReactNode, useEffect, useState } from 'react'
import { CoursesDataT } from '../../../../types/CoursesT'

import styles from './coursePage.module.scss'
import { RoleE } from '../../../../enum/roleE'
import Public from '../../../../assets/img/createCourse/public.svg'
import notPublic from '../../../../assets/img/createCourse/notPublic.svg'
import { generatePath, Link } from 'react-router-dom'
import { Path, Student } from '../../../../enum/pathE'
import { Button } from '../../../../components/common/Button/Button'
import pie from '../../../../assets/img/studentPage/folder-todo.png'
import { ICoursesProgress, IUserProgress, useLazyFetchProgressQuery } from '../../../../api/userProgressService'
import { SimpleLoader } from '../../../../components/Loaders/SimpleLoader'
import ProgressBar from '@ramonak/react-progress-bar'
import { Portal } from '../../../../components/Modal/Portal'
import { LimitModal } from '../../../../components/Modal/LimitModal/LimitModal'
import { useBoolean } from '../../../../customHooks'
import { usePatchCoursesMutation } from '../../../../api/coursesServices'
import { formDataConverter } from '../../../../utils/formDataConverter'
import { CheckboxBall } from '../../../../components/common/CheckboxBall'
import { useFetchProgressQuery } from 'api/userProgressService'

import tests from 'assets/img/CourseCardsTS/tests.svg'
import video from 'assets/img/CourseCardsTS/video.svg'
import homeTask from 'assets/img/CourseCardsTS/home-tasks.svg'
import tests_admin from 'assets/img/CourseCardsTS/tests-admin.svg'
import video_admin from 'assets/img/CourseCardsTS/video-admin.svg'
import homeTask_admin from 'assets/img/CourseCardsTS/home-tasks-admin.svg'
import tests_dark from 'assets/img/CourseCardsTS/tests-dark.svg'
import video_dark from 'assets/img/CourseCardsTS/video-dark.svg'
import homeTask_dark from 'assets/img/CourseCardsTS/home-tasks-dark.svg'

import '../../Navigations/CoursesCreating/courses_new_card.scss'

type courseCard = {
  course: CoursesDataT
  renderProps?: (course: CoursesDataT) => ReactNode
  role: number
  userProgress?: ICoursesProgress
}

export const CoursesCard: FC<courseCard> = ({ course, role, userProgress }) => {
  const schoolName = window.location.href.split('/')[4]
  const [isOpenModal, { onToggle }] = useBoolean()
  const userId = localStorage.getItem('id')
  const [isPublished, setIsPublished] = useState(course.public === 'О')
  const [update, { isLoading: isLoad, isSuccess }] = usePatchCoursesMutation()

  const onStudentClick = () => {
    localStorage.setItem('course_id', '' + course?.course_id)
    if (course?.public !== 'О' || (course.limit && typeof course.remaining_period === 'number' && course.remaining_period === 0)) {
      onToggle()
    }
  }

  if (role === RoleE.Teacher && course.public !== 'О') {
    return <></>
  }

  const handleSaveChanges = async () => {
    const updateCurse = {
      public: isPublished ? 'Н' : 'О',
    }

    const formdata = formDataConverter(updateCurse)
    if (formdata && course) {
      const id = course?.course_id
      await update({ arg: { formdata, id }, schoolName })
        .unwrap()
        .then(data => {
          window.location.reload()
        })
    }
  }

  return (
    <>
      {role === RoleE.Admin ? (
        <>
          {/* {(((course.course_id === 247) && userId === '154') || ((course.course_id !== 247) && (course.is_copy === false))) ? ( */}
          {userId !== '154' || course.course_id === 247 ? (
            <div
              style={{
                background: course?.public === 'О' ? '#CFE2FF' : '#CDCDCD',
                boxShadow: course?.public === 'О' ? '2px 2px 7px 0px #357EEB73' : '2px 2px 7px 0px #CDCDCD8C',
              }}
              id={`${course?.course_id}`}
              className="CourseCardsTS__admin"
            >
              <>
                {role === RoleE.Admin || role === RoleE.Teacher ? (
                  <>
                    <div className="CourseCardsTS__admin-top">
                      <p className="CourseCardsTS__admin-student-count">{course?.public === 'О' && '152 ученика'}</p>

                      {role === RoleE.Admin && course.course_id !== 247 ? (
                        course.course_removed ? (
                          <div className="wraper">
                            <span style={{ color: course?.public === 'О' ? '#357EEB' : '#808080' }} className="CourseCardsTS__public">
                              Курс удален
                            </span>
                          </div>
                        ) : course?.public === 'О' ? (
                          <div className="wraper">
                            <span style={{ color: course?.public === 'О' ? '#357EEB' : '#808080' }} className="CourseCardsTS__public">
                              Опубликован
                            </span>
                            <CheckboxBall isChecked={isPublished} toggleChecked={handleSaveChanges} />
                          </div>
                        ) : (
                          <div className="wraper">
                            <span style={{ color: course?.public === 'О' ? '#357EEB' : '#808080' }} className="CourseCardsTS__public">
                              Не опубликован
                            </span>
                            <CheckboxBall isChecked={isPublished} toggleChecked={handleSaveChanges} />
                          </div>
                        )
                      ) : (
                        <div />
                      )}
                    </div>

                    <Link
                      // onClick={onStudentClick}
                      to={generatePath(Path.CreateCourse, {
                        course_id: `${course?.course_id}`,
                      })}
                    >
                      <div className="CourseCardsTS__admin-main ">
                        <div className="CourseCardsTS__admin-title ">{course.name}</div>

                        {course.photo ? (
                          <>
                            <img src={course.photo} alt="" className="CourseCardsTS__admin-main-img" />
                          </>
                        ) : (
                          <div className={styles.no_image_found}>
                            <span>Нет изображения материала :(</span>
                          </div>
                        )}
                        <div className="CourseCardsTS__admin-bg-filter"></div>
                      </div>
                    </Link>

                    <div className="CourseCardsTS__admin-property-wrapper">
                      <div className="CourseCardsTS__admin-property">
                        <img src={course?.public === 'О' ? video_admin : video_dark} className="CourseCardsTS__admin-property-img" alt="" />
                        <p className="CourseCardsTS__admin-property-name">20 видео</p>
                      </div>
                      <div className="CourseCardsTS__admin-property">
                        <img src={course?.public === 'О' ? homeTask_admin : homeTask_dark} className="CourseCardsTS__admin-property-img" alt="" />
                        <p className="CourseCardsTS__admin-property-name">11 Домашних заданий</p>
                      </div>
                      <div className="CourseCardsTS__admin-property">
                        <img src={course?.public === 'О' ? tests_admin : tests_dark} className="CourseCardsTS__admin-property-img" alt="" />
                        <p className="CourseCardsTS__admin-property-name">9 тестов</p>
                      </div>
                    </div>

                    <div className={styles.course_card_about}>
                      <Link
                        to={generatePath(Path.CreateCourse, {
                          course_id: `${course?.course_id}`,
                        })}
                        className="CourseCardsTS__admin-buttons"
                        style={{ gridTemplateColumns: course?.public === 'О' ? '1fr 1fr' : '1fr', gap: course?.public === 'О' ? '10px' : 0 }}
                      >
                        <Link
                          style={{
                            maxWidth: course?.public === 'О' ? '100%' : '0',
                            padding:
                              course?.public === 'О' && window.innerWidth > 500
                                ? '16px 40px'
                                : course?.public === 'О' && window.innerWidth <= 500
                                ? '10px'
                                : '0',
                          }}
                          className="CourseCardsTS__admin-button-students"
                          to={generatePath(Path.CreateCourse + 'student', {
                            course_id: `${course?.course_id}`,
                          })}
                        >
                          {course?.public === 'О' && 'Ученики курса'}
                        </Link>
                        <Link
                          className="CourseCardsTS__admin-button-edit"
                          to={generatePath(Path.CreateCourse, {
                            course_id: `${course?.course_id}`,
                          })}
                        >
                          Редактировать
                        </Link>
                      </Link>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            </div>
          ) : (
            <>
              <Link
                to={generatePath(Path.CourseMaterials, {
                  course_id: `${course.course_id}`,
                })}
              >
                <div id={`${course.course_id}`} className={styles.course_card}>
                  <>
                    {role === RoleE.Admin || role === RoleE.Teacher ? (
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
                            {/* {role === RoleE.Admin && (course.course_id !== 247) && (course.is_copy === false) ? ( */}
                            {role === RoleE.Admin && course.course_id !== 247 ? (
                              course?.public === 'О' ? (
                                <>
                                  <img src={Public} alt="status course" />
                                  <span className={styles.course_card_status_show_public}>Опубликован</span>
                                </>
                              ) : (
                                <>
                                  <img src={notPublic} alt="status course" />
                                  <span className={styles.course_card_status_show_public}>Не опубликован</span>
                                </>
                              )
                            ) : (
                              <div />
                            )}
                          </span>
                          <h5>{course.name}</h5>
                          <span className={styles.course_card_about_desc_admin}>{course?.description}</span>
                          {role === RoleE.Admin ? (
                            <>
                              {course.course_id === 247 && userId !== '154' ? (
                                <Link
                                  to={generatePath(Path.CourseMaterials, {
                                    course_id: `${course?.course_id}`,
                                  })}
                                >
                                  <Button className={styles.btn_admin} style={{ marginTop: '55px' }} text={'Ознакомиться'} />
                                </Link>
                              ) : (
                                <>
                                  <Link
                                    to={generatePath(Path.CreateCourse + 'student', {
                                      course_id: `${course?.course_id}`,
                                    })}
                                  >
                                    <Button className={styles.btn_admin} text={'Ученики курса'} />
                                  </Link>
                                  <Link
                                    to={generatePath(Path.CreateCourse, {
                                      course_id: `${course?.course_id}`,
                                    })}
                                  >
                                    <Button className={styles.btn_admin} text={'Редактировать'} />
                                  </Link>
                                </>
                              )}
                            </>
                          ) : (
                            <Link
                              to={generatePath(Path.CreateCourse, {
                                course_id: `${course?.course_id}`,
                              })}
                            >
                              <Button className={styles.btn_admin} text={'Материалы'} />
                            </Link>
                          )}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                </div>
              </Link>
            </>
          )}
        </>
      ) : (
        <Link
          style={{ width: '100%', height: '100%', maxWidth: '660px', minWidth: '320px' }}
          onClick={onStudentClick}
          to={
            course?.public !== 'О' || (course.limit && typeof course.remaining_period === 'number' && course.remaining_period === 0)
              ? '#'
              : generatePath(Path.School + Path.Courses + Student.Course, { school_name: schoolName, course_id: String(course.course_id) })
          }
        >
          <div
            id={`${course?.course_id}`}
            className="CourseCardsTS__student"
            style={{ background: `url(${course?.photo})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="CourseCardsTS__bg-filter"></div>

            {userProgress && (
              <div className="CourseCardsTS__title ">
                {course.name} <p className="CourseCardsTS__percents CourseCardsTS__persents-top">{~~userProgress.completed_percent}%</p>
              </div>
            )}

            <div className="CourseCardsTS__properties">
              {userProgress && (
                <>
                  <div className="CourseCardsTS__property-wrapper">
                    <div className="CourseCardsTS__property">
                      <img src={video} className="CourseCardsTS__property-img" alt="" />
                      <p className="CourseCardsTS__property-name">
                        {userProgress.lessons.completed_lessons}/{userProgress.lessons.all_lessons} видео
                      </p>
                    </div>
                    <div className="CourseCardsTS__line"></div>
                    <div className="CourseCardsTS__property">
                      <img src={homeTask} className="CourseCardsTS__property-img" alt="" />
                      <p className="CourseCardsTS__property-name">
                        {userProgress.homeworks.completed_lessons}/{userProgress.homeworks.all_lessons} Домашних заданий
                      </p>
                    </div>
                    <div className="CourseCardsTS__line"></div>
                    <div className="CourseCardsTS__property">
                      <img src={tests} className="CourseCardsTS__property-img" alt="" />
                      <p className="CourseCardsTS__property-name">
                        {userProgress.tests.completed_lessons}/{userProgress.tests.all_lessons} тестов
                      </p>
                    </div>
                  </div>

                  <div className="progress">
                    <div className="progress-value">{~~userProgress.completed_percent}%</div>
                    <div className="progress-bg">
                      <div className="progress-bar" style={{ width: `${~~userProgress.completed_percent}%` }}></div>
                    </div>
                  </div>

                  <div className={styles.course_card_about}>
                    <div className={styles.course_card_duration}>
                      {course?.limit &&
                        (course?.remaining_period ? (
                          <p className={styles.course_card_duration_remaining}>Срок доступа истекает через, дн.: {course?.remaining_period}</p>
                        ) : (
                          <p className={styles.course_card_duration_remaining_expired}>Срок доступа истек</p>
                        ))}
                    </div>
                  </div>

                  <div className="CourseCardsTS__bottom">
                    <a href="#" className="CourseCardsTS__button">
                      Продолжить обучаться
                    </a>
                    <p className="CourseCardsTS__percents CourseCardsTS__percents-bottom">{~~userProgress.completed_percent}%</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </Link>
      )}
      {isOpenModal ? (
        <Portal closeModal={onToggle}>
          <LimitModal message={'Доступ к курсу временно заблокирован. Обратитесь к администратору'} setShowLimitModal={onToggle} />
        </Portal>
      ) : null}
    </>
  )
}
