import { FC, memo } from 'react'
import { generatePath, Link } from 'react-router-dom'

import { Button } from 'components/common/Button/Button'
import { Path, Student } from 'enum/pathE'
import { useAppSelector } from 'store/hooks'
import { CoursesCard } from './CoursesCard'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Input } from 'components/common/Input/Input/Input'
import { RoleE } from 'enum/roleE'
import { searchIconPath } from 'config/commonSvgIconsPath'
import { selectUser } from 'selectors'
import { AddCourseModal } from 'components/Modal'
import { useFetchCoursesQuery } from 'api/coursesServices'
import { useBoolean } from 'customHooks/useBoolean'
import { Portal } from 'components/Modal/Portal'
import { useDebouncedFilter } from '../../../../customHooks'

import Public from 'assets/img/createCourse/public.svg'
import notPublic from 'assets/img/createCourse/notPublic.svg'
import pie from 'assets/img/studentPage/folder-todo.png'

import styles from 'Pages/School/Navigations/CoursesCreating/coursePage.module.scss'

export const CoursePage: FC = memo(() => {
  const { data: courses } = useFetchCoursesQuery()

  const { role } = useAppSelector(selectUser)

  const [isOpenAddCourse, { onToggle }] = useBoolean()

  const [nameCourses, foundCourses, filterData] = useDebouncedFilter(courses?.results as any, 'name' as keyof object)

  const dispatchHandlerModal = () => {
    onToggle()
  }

  return (
    <div className={styles.container}>
      <Input role="search-input" name="" type="search" value={nameCourses} onChange={filterData} placeholder="Поиск по курсам">
        <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={searchIconPath} />
      </Input>
      <div className={styles.course}>
        {courses?.results.length &&
          foundCourses?.map((course: any) => (
            <CoursesCard
              key={course?.course_id}
              course={course}
              renderProps={course => (
                <>
                  {role === RoleE.Admin ? (
                    <>
                      <div className={styles.course_card_img}>
                        <img className={styles.course_card_img} src={course?.photo_url} alt="" />
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
                        <span className={styles.course_card_about_desc}>{course?.description}</span>
                        <Link
                          to={generatePath(Path.CreateCourse, {
                            course_id: `${course?.course_id}`,
                          })}
                        >
                          <Button className={styles.btn} text={'Редактировать'} />
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.course_card_img}>
                        <img className={styles.course_card_img} src={window.appConfig.imagePath + course?.photo_url} alt="" />
                      </div>
                      <div className={styles.course_card_progressBar}>
                        <div className={styles.course_card_progressBar_line}> </div>
                      </div>
                      <div className={styles.course_card_about}>
                        <Link
                          to={generatePath(Student.Course, {
                            course_id: `${course?.course_id}`,
                          })}
                        >
                          <div className={styles.course_card_about_progressWrapper}>
                            <img src={window.appConfig.imagePath + pie} alt="pie" />
                            <span className={styles.course_card_about_progressWrapper_title}>13% пройдено</span>
                          </div>
                          <span className={styles.course_card_status_show}> </span>
                          <h5>{course.name}</h5>
                          <span className={styles.course_card_about_desc}>{course?.description}</span>

                          <Button className={styles.btn} text={'Продолжить обучение'} />
                        </Link>
                      </div>
                    </>
                  )}
                </>
              )}
            />
          ))}
        {role !== RoleE.Student && (
          <button type="button" onClick={dispatchHandlerModal} className={styles.course_card}>
            <span className={styles.course_addCourse}>
              <span>Создать курс</span>
            </span>
          </button>
        )}
      </div>
      {isOpenAddCourse ? (
        <Portal closeModal={onToggle}>
          <AddCourseModal courses={courses?.results} setShowModal={onToggle} />
        </Portal>
      ) : null}
    </div>
  )
})
