import { FC, memo } from 'react'
import { generatePath, Link } from 'react-router-dom'

import { Button } from 'components/common/Button/Button'
import { Path, Student } from 'enum/pathE'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { CoursesCard } from './CoursesCard'
import { showModal } from 'store/redux/modal/slice'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Input } from 'components/common/Input/Input/Input'
import { useFilterData } from 'customHooks/useFilterData'
import { RoleE } from 'enum/roleE'
import { searchIconPath } from 'config/commonSvgIconsPath'
import { selectUser } from 'selectors'
import { AddCourseModal } from 'components/Modal'
import { useFetchCoursesQuery } from 'api/coursesServices'
import { useBoolean } from 'customHooks/useBoolean'

import Public from 'assets/img/createCourse/public.svg'
import notPublic from 'assets/img/createCourse/notPublic.svg'
import pie from 'assets/img/studentPage/folder-todo.png'

import styles from 'Pages/School/Navigations/CoursesCreating/coursePage.module.scss'
import cardStyles from './coursePage.module.scss'

export const CoursePage: FC = memo(() => {
  const dispatch = useAppDispatch()

  const { data: courses } = useFetchCoursesQuery()

  const { permission } = useAppSelector(selectUser)

  const [isOpenAddCourse, { onToggle }] = useBoolean()

  const [nameCourses, foundCourses, filterData] = useFilterData(courses as any, 'name')

  const dispatchHandlerModal = () => {
    onToggle && onToggle()

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
              key={course?.course_id}
              course={course}
              renderProps={course => (
                <>
                  {permission === RoleE.Admin ? (
                    <>
                      <div className={cardStyles.course_card_img}>
                        <img className={cardStyles.course_card_img} src={course?.photo_url} alt="" />
                      </div>
                      <div className={cardStyles.course_card_about}>
                        <span className={cardStyles.course_card_status_show}>
                          {course?.public === 'О' ? (
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
                        <span className={cardStyles.course_card_about_desc}>{course?.description}</span>
                        <Link
                          to={generatePath(Path.CreateCourse, {
                            course_id: course?.course_id,
                          })}
                        >
                          <Button className={cardStyles.btn} text={'Редактировать'} />
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={cardStyles.course_card_img}>
                        <img className={cardStyles.course_card_img} src={course?.photo_url} alt="" />
                      </div>
                      <div className={cardStyles.course_card_progressBar}>
                        <div className={cardStyles.course_card_progressBar_line}> </div>
                      </div>
                      <div className={cardStyles.course_card_about}>
                        <div className={cardStyles.course_card_about_progressWrapper}>
                          <img src={pie} alt="pie" />
                          <span className={cardStyles.course_card_about_progressWrapper_title}>13% пройдено</span>
                        </div>
                        <span className={cardStyles.course_card_status_show}> </span>
                        <h5>{course.name}</h5>
                        <span className={cardStyles.course_card_about_desc}>{course?.description}</span>

                        <Link
                          to={generatePath(Student.Course, {
                            course_id: course?.course_id,
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
      {isOpenAddCourse && <AddCourseModal setShowModal={onToggle} />}
    </div>
  )
})
