import { FC } from 'react'
import { generatePath, Link } from 'react-router-dom'

import { Button } from '../../../../components/common/Button/Button'
import { Path, Student } from '../../../../enum/pathE'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { CoursesCard } from './CoursesCard'
import { showModal } from '../../../../store/redux/modal/slice'
import { IconSvg } from '../../../../components/common/IconSvg/IconSvg'
import { Input } from '../../../../components/common/Input/Input/Input'
import { useFilterData } from '../../../../customHooks/useFilterData'
import { CoursesT } from '../../../../types/CoursesT'
import { searchIconPath } from 'config/commonSvgIconsPath'
import { selectUser } from 'selectors'

import Public from '../../../../assets/img/createCourse/public.svg'
import notPublic from '../../../../assets/img/createCourse/notPublic.svg'
import pie from '../../../../assets/img/studentPage/folder-todo.png'

import styles from 'Pages/School/Navigations/CoursesCreating/coursePage.module.scss'
import cardStyles from './coursePage.module.scss'
import { RoleE } from '../../../../enum/roleE'

type CoursePagePropsT = {
  setShowModal: () => void
  courses: CoursesT[]
}

export const CoursePage: FC<CoursePagePropsT> = ({ setShowModal, courses }) => {
  const dispatch = useAppDispatch()
  const { permission } = useAppSelector(selectUser)

  const [nameCourses, foundCourses, filterData] = useFilterData(courses, 'name')

  const dispatchHandlerModal = () => {
    setShowModal()
    dispatch(showModal(true))
  }

  return (
    <div className={styles.container}>
      <Input name="" type="search" value={nameCourses} onChange={filterData} placeholder="Поиск по курсам">
        <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={searchIconPath} />
      </Input>
      <div className={styles.course}>
        {courses?.length &&
          foundCourses?.map((course: any) => (
            <CoursesCard
              key={course.course_id}
              course={course}
              renderProps={course => (
                <>
                  {permission === RoleE.Admin ? (
                    <>
                      <div className={cardStyles.course_card_img}>
                        <img className={cardStyles.course_card_img} src={course.photo_url} alt="" />
                      </div>
                      <div className={cardStyles.course_card_about}>
                        <span className={cardStyles.course_card_status_show}>
                          {course.public === 'О' ? (
                            <>
                              <img src={Public} alt="status course" />
                              <span className={cardStyles.course_card_status_show_public}>Опубликован</span>
                            </>
                          ) : (
                            <>
                              <img src={notPublic} alt="status course" />
                              <span className={cardStyles.course_card_status_show_public}>Не опубликован</span>
                            </>
                          )}
                        </span>
                        <h5>{course.name}</h5>
                        <span className={cardStyles.course_card_about_desc}>{course.description}</span>
                        <Link
                          to={generatePath(Path.CreateCourse, {
                            course_id: course.course_id,
                          })}
                        >
                          <Button className={cardStyles.btn} text={'Редактировать'} />
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={cardStyles.course_card_img}>
                        <img className={cardStyles.course_card_img} src={course.photo_url} alt="" />
                      </div>
                      <div style={{ width: '100%', background: '#F3F4F6', height: '5px' }}>
                        <div style={{ width: '20%', background: '#BA75FF', height: '100%' }}> </div>
                      </div>
                      <div className={cardStyles.course_card_about}>
                        <img src={pie} alt="pie" />
                        <span style={{ color: '#BA75FF', fontSize: '11px' }}>13% пройдено</span>
                        <span className={cardStyles.course_card_status_show}> </span>
                        <h5>{course.name}</h5>
                        <span className={cardStyles.course_card_about_desc}>{course.description}</span>

                        <Link
                          to={generatePath(Student.Course, {
                            course_id: course.course_id,
                          })}
                        >
                          <Button style={{ background: '#F4E9FF', borderRadius: '5px' }} className={cardStyles.btn} text={'Продолжить обучение'} />
                        </Link>
                      </div>
                    </>
                  )}
                </>
              )}
            />
          ))}
        {permission !== RoleE.Student && (
          <div onClick={dispatchHandlerModal} className={styles.course_card}>
            <div className={styles.course_addCourse}>
              <span>Создать курс</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
