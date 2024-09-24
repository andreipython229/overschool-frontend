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
import { useLazyFetchProgressQuery } from '../../../../api/userProgressService'
import { SimpleLoader } from '../../../../components/Loaders/SimpleLoader'
import ProgressBar from '@ramonak/react-progress-bar'
import { Portal } from "../../../../components/Modal/Portal";
import { LimitModal } from "../../../../components/Modal/LimitModal/LimitModal";
import { useBoolean } from "../../../../customHooks";

type courseCard = {
  course: CoursesDataT
  renderProps?: (course: CoursesDataT) => ReactNode
  role: number
}


import CardBack from 'assets/img/CourseCardsTS/course.png'


import tests_dark from 'assets/img/CourseCardsTS/tests-dark.svg'
import video_dark from 'assets/img/CourseCardsTS/video-dark.svg'
import homeTask_dark from 'assets/img/CourseCardsTS/home-tasks-dark.svg'

import '../../../../Pages/CourseCardsTS/CourseCardsTS.scss'
import tests from 'assets/img/CourseCardsTS/tests.svg'
import video from 'assets/img/CourseCardsTS/video.svg'
import homeTask from 'assets/img/CourseCardsTS/home-tasks.svg'
import tests_admin from 'assets/img/CourseCardsTS/tests-admin.svg'
import video_admin from 'assets/img/CourseCardsTS/video-admin.svg'
import homeTask_admin from 'assets/img/CourseCardsTS/home-tasks-admin.svg'
export const CoursesCard: FC<courseCard> = ({ course, role }) => {

  //ДО///////////////////////////////////////////////
  const schoolName = window.location.href.split('/')[4]
  const [fetchProgress, { data: userProgress, isLoading, isError }] = useLazyFetchProgressQuery()
  const [isOpenModal, { onToggle }] = useBoolean()
  const userId = localStorage.getItem('id');

  useEffect(() => {
    if (role === RoleE.Student) {
      fetchProgress({ course_id: String(course?.course_id), schoolName })
    }
  }, [course])

  const onStudentClick = () => {
    localStorage.setItem('course_id', '' + course?.course_id)
    localStorage.setItem('course_copy', '' + course?.is_copy)
    if (course?.public !== 'O') {
      onToggle()
    }
  }

  if (isLoading || isError) {
    return <SimpleLoader style={{ width: '100px', height: '100px' }} />
  }

  if (role === RoleE.Teacher && course.public !== 'О') {
    return null
  }

  ///////////////////////////////////////////////////////






  //МОЁ///////////////////////////////////////////////////////
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    const checkbox = document.getElementById('something') as HTMLInputElement | null
    if (checkbox) {
      const handleCheckboxChange = () => {
        setIsChecked(checkbox.checked)
      }
      checkbox.addEventListener('change', handleCheckboxChange)

      return () => {
        checkbox.removeEventListener('change', handleCheckboxChange)
      }
    }
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('.CourseCardsTS__admin-property-name')

    elements.forEach(element => {
      const htmlElement = element as HTMLElement
      htmlElement.style.color = isChecked ? '#000000' : '#332F36'
    })
  }, [isChecked])
  /////////////////////////////////////////
  return (
    <>


      {role === RoleE.Admin ? (
        <>
          {(((course.course_id === 247) && userId === '154') || ((course.course_id !== 247) && (course.is_copy === false))) ? (
            <Link
              onClick={onStudentClick}
              to={generatePath(Path.CreateCourse, {
                course_id: `${course?.course_id}`,
              })}
            >

              <div id={`${course?.course_id}`}
                style={{ background: isChecked ? '#CFE2FF' : '#CDCDCD', boxShadow: isChecked ? '2px 2px 7px 0px #357EEB73' : '2px 2px 7px 0px #CDCDCD8C' }}
                className="CourseCardsTS__admin"
              >

                {role === RoleE.Admin || role === RoleE.Teacher ? (

                  <>
                    <div className="CourseCardsTS__admin-top">
                      <p className="CourseCardsTS__admin-student-count">{isChecked && '152 ученика'}</p>

                      <label className="wraper" htmlFor="something">
                        <p style={{ color: isChecked ? '#357EEB' : '#808080' }} className="CourseCardsTS__public">
                          {isChecked ? 'Опубликован' : 'Не опубликован'}
                        </p>
                        <div onClick={(event) => event.stopPropagation()} style={{ background: isChecked ? 'white' : '#808080' }} className="switch-wrap">
                          <input type="checkbox" id="something" />
                          <div className="switch"></div>
                        </div>
                      </label>
                    </div>
                    <div


                      className="CourseCardsTS__admin-main "
                    >
                      <div className="CourseCardsTS__admin-title ">{course.name}</div>

                      {course.photo ? (
                        <>
                          <img src={course.photo} alt="" className='CourseCardsTS__admin-main-img' />



                        </>
                      ) : (
                        <div className={styles.no_image_found}>
                          <span>Нет изображения материала :(</span>
                        </div>
                      )}
                      {/* <div className="CourseCardsTS__admin-bg-filter"></div> */}

                    </div>
                    <div className="CourseCardsTS__admin-property-wrapper">
                      <div className="CourseCardsTS__admin-property">
                        <img src={isChecked ? video_admin : video_dark} className="CourseCardsTS__admin-property-img" alt="" />
                        <p className="CourseCardsTS__admin-property-name">152 видео</p>
                      </div>
                      <div className="CourseCardsTS__admin-property">
                        <img src={isChecked ? homeTask_admin : homeTask_dark} className="CourseCardsTS__admin-property-img" alt="" />
                        <p className="CourseCardsTS__admin-property-name">11 Домашних заданий</p>
                      </div>
                      <div className="CourseCardsTS__admin-property">
                        <img src={isChecked ? tests_admin : tests_dark} className="CourseCardsTS__admin-property-img" alt="" />
                        <p className="CourseCardsTS__admin-property-name">9 тестов</p>
                      </div>
                    </div>
                    <div className="CourseCardsTS__admin-buttons">
                      <a
                        href="#"
                        style={{ maxWidth: !isChecked ? '0' : '100%', padding: !isChecked ? '0' : ' 16px 40px' }}
                        className="CourseCardsTS__admin-button-students"
                      >
                        {isChecked && 'Ученики курса'}
                      </a>
                      <a href="#" className="CourseCardsTS__admin-button-edit">
                        Редактировать
                      </a>
                    </div>
                  </>
                ) : (<></>)}

              </div>

            </Link>
          ) : (<></>)}
        </>
      ) : (
        <div
          className="CourseCardsTS__student"
          style={{ background: `url(${CardBack})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="CourseCardsTS__bg-filter"></div>
          <div className="CourseCardsTS__title ">{course.name}</div>
          <div className="CourseCardsTS__properties">
            <div className="CourseCardsTS__property-wrapper">
              <div className="CourseCardsTS__property">
                <img src={video} className="CourseCardsTS__property-img" alt="" />
                <p className="CourseCardsTS__property-name">32/152 видео</p>
              </div>
              <div className="CourseCardsTS__line"></div>
              <div className="CourseCardsTS__property">
                <img src={homeTask} className="CourseCardsTS__property-img" alt="" />
                <p className="CourseCardsTS__property-name">4/11 Домашних заданий</p>
              </div>
              <div className="CourseCardsTS__line"></div>
              <div className="CourseCardsTS__property">
                <img src={tests} className="CourseCardsTS__property-img" alt="" />
                <p className="CourseCardsTS__property-name">4/9 тестов</p>
              </div>
            </div>
            <div className="progress">
              <progress max="100" value="36"></progress>
              <div className="progress-value"></div>
              <div className="progress-bg">
                <div className="progress-bar"></div>
              </div>
            </div>
            <div className="CourseCardsTS__bottom">
              <a href="#" className="CourseCardsTS__button">
                Продолжить обучаться
              </a>
              <p className="CourseCardsTS__percents">36%</p>
            </div>
          </div>
        </div>
      )

      }












      {role === RoleE.Admin ? (
        <>
          {(((course.course_id === 247) && userId === '154') || ((course.course_id !== 247) && (course.is_copy === false))) ? (
            <Link
              onClick={onStudentClick}
              to={generatePath(Path.CreateCourse, {
                course_id: `${course?.course_id}`,
              })}
            >
              <div id={`${course?.course_id}`} className={styles?.course_card}>
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
                          {role === RoleE.Admin && (course.course_id !== 247) ? (
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
                        <Link
                          onClick={onStudentClick}
                          to={generatePath(Path.CreateCourse + 'student', {
                            course_id: `${course?.course_id}`,
                          })}
                        >
                          <Button className={styles.btn_admin} text={'Ученики курса'} />
                        </Link>
                        <Link
                          onClick={onStudentClick}
                          to={generatePath(Path.CreateCourse, {
                            course_id: `${course?.course_id}`,
                          })}
                        >
                          <Button className={styles.btn_admin} text={'Редактировать'} />
                        </Link>

                      </div>
                    </>
                  ) : (<></>)}
                </>
              </div>
            </Link>
          ) : (
            <>
              <Link
                onClick={onStudentClick}
                to={generatePath(Path.CourseMaterials, {
                  course_id: `${course?.course_id}`,
                })}
              >
                <div id={`${course?.course_id}`} className={styles?.course_card}>
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
                            {role === RoleE.Admin && (course.course_id !== 247) && (course.is_copy === false) ? (
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
                              {(course.course_id === 247 && userId !== '154') ? (
                                <Link
                                  onClick={onStudentClick}
                                  to={generatePath(Path.CourseMaterials, {
                                    course_id: `${course?.course_id}`,
                                  })}
                                >
                                  <Button className={styles.btn_admin} style={{ marginTop: '55px' }} text={'Ознакомиться'} />
                                </Link>
                              ) : course.is_copy === true ? (
                                <div style={{ marginTop: '15px' }}>
                                  <Link
                                    onClick={onStudentClick}
                                    to={generatePath(Path.CreateCourse + 'student', {
                                      course_id: `${course?.course_id}`,
                                    })}
                                  >
                                    <Button className={styles.btn_admin} text={'Ученики курса'} />
                                  </Link>
                                  <Link
                                    onClick={onStudentClick}
                                    to={generatePath(Path.CourseMaterials, {
                                      course_id: `${course?.course_id}`,
                                    })}
                                  >
                                    <Button className={styles.btn_admin} text={'Материалы'} />
                                  </Link>
                                </ div>
                              ) : (
                                <Link
                                  onClick={onStudentClick}
                                  to={generatePath(Path.CourseMaterials, {
                                    course_id: `${course?.course_id}`,
                                  })}
                                >
                                  <Button className={styles.btn_admin} text={'Материалы'} />
                                </Link>
                              )}
                            </>
                          ) : (
                            <Link
                              onClick={onStudentClick}
                              to={generatePath(Path.CourseMaterials, {
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
        <div id={`${course?.course_id}`} className={styles?.course_card}>
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
                    {role === RoleE.Admin ? (
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
                      <Link
                        onClick={onStudentClick}
                        to={generatePath(Path.CreateCourse + 'student', {
                          course_id: `${course?.course_id}`,
                        })}
                      >
                        <Button className={styles.btn_admin} text={'Ученики курса'} />
                      </Link>
                      <Link
                        onClick={onStudentClick}
                        to={generatePath(Path.CreateCourse, {
                          course_id: `${course?.course_id}`,
                        })}
                      >
                        <Button className={styles.btn_admin} text={'Редактировать'} />
                      </Link>
                    </>
                  ) : (
                    <Link
                      onClick={onStudentClick}
                      to={generatePath(Path.CreateCourse, {
                        course_id: `${course?.course_id}`,
                      })}
                    >
                      <Button className={styles.btn_teacher} text={'Материалы'} />
                    </Link>
                  )}
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
                      onClick={onStudentClick}
                      to={
                        generatePath(Student.Course, {
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
                      <Button className={styles.btn_student} text={'Перейти к курсу'} disabled={course?.remaining_period === 0} />
                    </Link>
                  </div>
                  {isOpenModal ? (
                    <Portal closeModal={onToggle}>
                      <LimitModal message={'Доступ к курсу временно заблокирован. Обратитесь к администратору'} setShowLimitModal={onToggle} />
                    </Portal>
                  ) : null}
                </>
              )
            )}
          </>
        </div>
      )}
    </>
  )
}
