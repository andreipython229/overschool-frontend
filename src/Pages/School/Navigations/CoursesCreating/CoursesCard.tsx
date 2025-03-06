import { FC, ReactNode, useState } from 'react'
import { CoursesDataT } from '../../../../types/CoursesT'
import styles from './coursePage.module.scss'
import { RoleE } from '../../../../enum/roleE'
import Public from '../../../../assets/img/createCourse/public.svg'
import notPublic from '../../../../assets/img/createCourse/notPublic.svg'
import { generatePath, Link } from 'react-router-dom'
import { Path, Student } from '../../../../enum/pathE'
import { Button } from '../../../../components/common/Button/Button'
import { ICoursesProgress } from '../../../../api/userProgressService'
import { Portal } from '../../../../components/Modal/Portal'
import { LimitModal } from '../../../../components/Modal/LimitModal/LimitModal'
import { useBoolean } from '../../../../customHooks'
import { usePatchCoursesMutation } from '../../../../api/coursesServices'
import { formDataConverter } from '../../../../utils/formDataConverter'
import { CheckboxBall } from '../../../../components/common/CheckboxBall'
import tests from 'assets/img/CourseCardsTS/tests.svg'
import video from 'assets/img/CourseCardsTS/video.svg'
import homeTask from 'assets/img/CourseCardsTS/home-tasks.svg'
import tests_admin from 'assets/img/CourseCardsTS/tests-admin.svg'
import video_admin from 'assets/img/CourseCardsTS/video-admin.svg'
import homeTask_admin from 'assets/img/CourseCardsTS/home-tasks-admin.svg'
import tests_dark from 'assets/img/CourseCardsTS/tests-dark.svg'
import video_dark from 'assets/img/CourseCardsTS/video-dark.svg'
import homeTask_dark from 'assets/img/CourseCardsTS/home-tasks-dark.svg'

import stylesCard from './courseCard.module.scss'
import { getNounDeclension } from 'utils/getNounDeclension'
import { Tooltip } from '@mui/material'

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
        <div
          style={{
            background: course?.public === 'О' ? '#CFE2FF' : '#CDCDCD',
            boxShadow: course?.public === 'О' ? '2px 2px 7px 0px #357EEB73' : '2px 2px 7px 0px #CDCDCD8C',
          }}
          id={`${course?.course_id}`}
          className={stylesCard.CourseCardsTS__admin}
        >
          <>
            {role === RoleE.Admin || role === RoleE.Teacher ? (
              <>
                <div className={stylesCard.CourseCardsTS__admin_top}>
                  <p className={stylesCard.CourseCardsTS__admin_studentCount}>
                    {course?.public === 'О' &&
                      `${course.students_count} ${getNounDeclension(course.students_count || 0, ['ученик', 'ученика', 'учеников'])}`}
                  </p>

                  {role === RoleE.Admin && course.course_id !== 247 ? (
                    course.course_removed ? (
                      <div className={stylesCard.wraper}>
                        <span style={{ color: course?.public === 'О' ? '#357EEB' : '#808080' }} className={stylesCard.CourseCardsTS__public}>
                          Курс удален
                        </span>
                      </div>
                    ) : course?.public === 'О' ? (
                      <div className={stylesCard.wraper}>
                        <span style={{ color: course?.public === 'О' ? '#357EEB' : '#808080' }} className={stylesCard.CourseCardsTS__public}>
                          Опубликован
                        </span>
                        <CheckboxBall isChecked={isPublished} toggleChecked={handleSaveChanges} />
                      </div>
                    ) : (
                      <div className={stylesCard.wraper}>
                        <span style={{ color: course?.public === 'О' ? '#357EEB' : '#808080' }} className={stylesCard.CourseCardsTS__public}>
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
                  <div className={stylesCard.CourseCardsTS__admin_main}>
                    <div className={stylesCard.CourseCardsTS__admin_title}>{course.name}</div>

                    {course.photo ? (
                      <>
                        <img src={course.photo} alt="" className={stylesCard.CourseCardsTS__admin_main_img} />
                      </>
                    ) : (
                      <div className={styles.no_image_found}>
                        <span>Нет изображения материала :(</span>
                      </div>
                    )}
                    <div className={stylesCard.CourseCardsTS__admin_bg_filter}></div>
                  </div>
                </Link>

                <div className={stylesCard.CourseCardsTS__admin_property_wrapper}>
                  <div className={stylesCard.CourseCardsTS__admin_property}>
                    <img src={course?.public === 'О' ? video_admin : video_dark} className={stylesCard.CourseCardsTS__admin_property_img} alt="" />
                    <p className={stylesCard.CourseCardsTS__admin_property_name}>{course.video_count || 0} Видео</p>
                  </div>
                  <div className={stylesCard.CourseCardsTS__admin_property}>
                    <img
                      src={course?.public === 'О' ? homeTask_admin : homeTask_dark}
                      className={stylesCard.CourseCardsTS__admin_property_img}
                      alt=""
                    />
                    <p className={stylesCard.CourseCardsTS__admin_property_name}>{`${course.homework_count || 0} ${getNounDeclension(
                      course.homework_count || 0,
                      ['Домашнее задание', 'Домашних задания', 'Домашних заданий'],
                    )}`}</p>
                  </div>
                  <div className={stylesCard.CourseCardsTS__admin_property}>
                    <img src={course?.public === 'О' ? tests_admin : tests_dark} className={stylesCard.CourseCardsTS__admin_property_img} alt="" />
                    <p className={stylesCard.CourseCardsTS__admin_property_name}>{`${course.test_count || 0} ${getNounDeclension(
                      course.test_count || 0,
                      ['Тест', 'Теста', 'Тестов'],
                    )}`}</p>
                  </div>
                </div>

                <div className={stylesCard.CourseCardsTS__bottom}>
                  <Link
                    to={generatePath(Path.CreateCourse, {
                      course_id: `${course?.course_id}`,
                    })}
                    className={stylesCard.CourseCardsTS__admin_buttons}
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
                      className={stylesCard.CourseCardsTS__admin_button_students}
                      to={generatePath(Path.CreateCourse + 'student', {
                        course_id: `${course?.course_id}`,
                      })}
                    >
                      {course?.public === 'О' && 'Ученики курса'}
                    </Link>
                    <Link
                      className={stylesCard.CourseCardsTS__admin_button_edit}
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
        <Link
          style={{ width: '100%', height: '100%', maxWidth: '660px', minWidth: '288px' }}
          onClick={onStudentClick}
          to={
            course?.public !== 'О' || (course.limit && typeof course.remaining_period === 'number' && course.remaining_period === 0)
              ? '#'
              : generatePath(Path.School + Path.Courses + Student.Course, { school_name: schoolName, course_id: String(course.course_id) })
          }
        >
          <div
            id={`${course?.course_id}`}
            className={stylesCard.CourseCardsTS__student}
            style={{ background: `url(${course?.photo})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className={stylesCard.CourseCardsTS__bg_filter}></div>

            {userProgress && <div className={stylesCard.CourseCardsTS__title}>{course.name}</div>}

            <div className={stylesCard.CourseCardsTS__properties}>
              {userProgress && (
                <>
                  <div className={stylesCard.CourseCardsTS__property_wrapper}>
                    <Tooltip title="Видео-уроки">
                      <div className={stylesCard.CourseCardsTS__property}>
                        <img src={video} className={stylesCard.CourseCardsTS__property_img} alt="" />

                        <p className={stylesCard.CourseCardsTS__property_name}>
                          {userProgress.lessons.completed_lessons}/{userProgress.lessons.all_lessons} {window.innerWidth > 1580 && 'видео'}
                        </p>
                      </div>
                    </Tooltip>
                    <div className={stylesCard.CourseCardsTS__line}></div>
                    <Tooltip title="Домашние задания">
                      <div className={stylesCard.CourseCardsTS__property}>
                        <img src={homeTask} className={stylesCard.CourseCardsTS__property_img} alt="" />
                        <p className={stylesCard.CourseCardsTS__property_name}>
                          {userProgress.homeworks.completed_lessons}/{userProgress.homeworks.all_lessons}{' '}
                          {window.innerWidth > 1580 && 'Домашних заданий'}
                        </p>
                      </div>
                    </Tooltip>
                    <div className={stylesCard.CourseCardsTS__line}></div>
                    <Tooltip title="Тесты">
                      <div className={stylesCard.CourseCardsTS__property}>
                        <img src={tests} className={stylesCard.CourseCardsTS__property_img} alt="" />
                        <p className={stylesCard.CourseCardsTS__property_name}>
                          {userProgress.tests.completed_lessons}/{userProgress.tests.all_lessons} {window.innerWidth > 1580 && 'тестов'}
                        </p>
                      </div>
                    </Tooltip>
                  </div>

                  <div className={stylesCard.progress}>
                    <div className={stylesCard.progress_value}>{~~userProgress.completed_percent}%</div>
                    <div className={stylesCard.progress_bg}>
                      <div className={stylesCard.progress_bar} style={{ width: `${~~userProgress.completed_percent}%` }}></div>
                    </div>
                  </div>

                  <div className={styles.course_card_about}>
                    <div className={styles.course_card_duration}>
                      {course?.limit &&
                        (course?.remaining_period ? (
                          <p className={styles.course_card_duration_remaining}>
                            Доступ к курсу истекает через <span>{course?.remaining_period}</span> дней
                          </p>
                        ) : (
                          <p className={styles.course_card_duration_remaining_expired}>Срок доступа к курсу истёк</p>
                        ))}
                    </div>
                  </div>

                  <div className={stylesCard.CourseCardsTS__bottom}>
                    <a href="#" className={stylesCard.CourseCardsTS__button}>
                      Продолжить обучаться
                    </a>
                    <p className={stylesCard.CourseCardsTS__percents}>{~~userProgress.completed_percent}%</p>
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
