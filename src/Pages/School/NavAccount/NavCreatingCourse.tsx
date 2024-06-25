import { memo } from 'react'
import { NavAccountBtn } from 'components/NavAccountBtn/NavAccountBtn'
import { CreateCoursePath } from 'enum/pathE'
import { useAppSelector } from 'store/hooks'
import { Path } from '../../../enum/pathE'

import { selectUser, schoolNameSelector } from 'selectors'
import { RoleE } from 'enum/roleE'
import { generatePath, useNavigate } from 'react-router-dom'


import styles from './navCreatingCourse.module.scss'

export const NavCreatingCourse = memo(() => {
  const { role: UserRole } = useAppSelector(selectUser)
  const navigate = useNavigate()
  const schoolName = useAppSelector(schoolNameSelector)
  const backCourses = () => {
    const pathLink =

        generatePath(`${Path.School}${Path.Courses}`, {
            school_name: schoolName,
          })
    
    navigate(pathLink)
  }

  return (
    <nav className={styles.creatingCourse}>
      {UserRole === RoleE.Admin ? (
        <>
            <NavAccountBtn text={'Конструктор'} path={CreateCoursePath.Constructor} />
            <NavAccountBtn text={'Ученики курса'} path={CreateCoursePath.Student} />
            <NavAccountBtn text={'Настройки курса'} path={CreateCoursePath.Settings} />
            <NavAccountBtn text={'Страница курса'} path={CreateCoursePath.Page} />
            <NavAccountBtn text={'Комментарии'} path={CreateCoursePath.Comments} />
            <button className={styles.creatingCourse_backButton} onClick={backCourses}>
              Курсы
            </button>
        </>
      ) : (
        <NavAccountBtn text={'Материалы курса'} path={CreateCoursePath.Materials} />
      )}
    </nav>
  )
})
