import { memo } from 'react'
import { NavAccountBtn } from 'components/NavAccountBtn/NavAccountBtn'
import { CreateCoursePath } from 'enum/pathE'
import { useAppSelector } from 'store/hooks'
import { Path } from '../../../enum/pathE'
import { selectUser, schoolSelector } from 'selectors'
import { RoleE } from 'enum/roleE'
import { generatePath, useNavigate } from 'react-router-dom'
import styles from './navCreatingCourse.module.scss'

export const NavCreatingCourse = memo(() => {
  const course_id = window.location.href.split('/')[7]
  const course_copy = localStorage.getItem('course_copy') === 'true'
  const { role: UserRole, userId } = useAppSelector(selectUser)
  const navigate = useNavigate()
  const { schoolName } = useAppSelector(schoolSelector)
  const backCourses = () => {
    const pathLink = generatePath(`${Path.School}${Path.Courses}`, {
      school_name: schoolName,
    })

    navigate(pathLink)
  }

  return (
    <nav className={styles.creatingCourse}>
      {UserRole === RoleE.Admin ? (
        <>
          {course_id !== '247' ? (
            !course_copy ? (
              <>
                <NavAccountBtn text={'Конструктор'} path={CreateCoursePath.Constructor} />
                <NavAccountBtn text={'Ученики курса'} path={CreateCoursePath.Student} />
                <NavAccountBtn text={'Настройки курса'} path={CreateCoursePath.Settings} />
                <NavAccountBtn text={'Страница курса'} path={CreateCoursePath.Page} />
                <NavAccountBtn text={'Комментарии'} path={CreateCoursePath.Comments} />
                <NavAccountBtn text={'Сертификаты'} path={CreateCoursePath.Certificates} />
                <button className={styles.creatingCourse_backButton} onClick={backCourses}>
                  Курсы
                </button>
              </>
            ) : (
              <>
                <NavAccountBtn text={'Материалы курса'} path={CreateCoursePath.Materials} />
                <NavAccountBtn text={'Ученики курса'} path={CreateCoursePath.Student} />
                <NavAccountBtn text={'Комментарии'} path={CreateCoursePath.Comments} />
                <button className={styles.creatingCourse_backButton} onClick={backCourses}>
                  Курсы
                </button>
              </>
            )
          ) : (
            <>
              {userId === 154 ? (
                <>
                  <NavAccountBtn text={'Конструктор'} path={CreateCoursePath.Constructor} />
                  <NavAccountBtn text={'Ученики курса'} path={CreateCoursePath.Student} />
                  <NavAccountBtn text={'Настройки курса'} path={CreateCoursePath.Settings} />
                  <NavAccountBtn text={'Страница курса'} path={CreateCoursePath.Page} />
                  <NavAccountBtn text={'Комментарии'} path={CreateCoursePath.Comments} />
                  <NavAccountBtn text={'Сертификаты'} path={CreateCoursePath.Certificates} />
                  <button className={styles.creatingCourse_backButton} onClick={backCourses}>
                    Курсы
                  </button>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      ) : (
        <NavAccountBtn text={'Материалы курса'} path={CreateCoursePath.Materials} />
      )}
    </nav>
  )
})
