import { memo } from 'react'
import { NavAccountBtn } from 'components/NavAccountBtn/NavAccountBtn'
import { CreateCoursePath } from 'enum/pathE'
import { useAppSelector } from 'store/hooks'
import { Path } from '../../../enum/pathE'

import { selectUser } from 'selectors'
import { RoleE } from 'enum/roleE'

import styles from './navCreatingCourse.module.scss'

export const NavCreatingCourse = memo(() => {
  const { role: UserRole } = useAppSelector(selectUser)

  return (
    <nav className={styles.creatingCourse}>
      {UserRole === RoleE.Admin ? (
        <>
            <NavAccountBtn text={'Конструктор'} path={CreateCoursePath.Constructor} />
            <NavAccountBtn text={'Ученики курса'} path={CreateCoursePath.Student} />
            <NavAccountBtn text={'Настройки курса'} path={CreateCoursePath.Settings} />
            <NavAccountBtn text={'Страница курса'} path={CreateCoursePath.Page} />
            <NavAccountBtn text={'Комментарии'} path={CreateCoursePath.Comments} />
            <NavAccountBtn text={'Курсы'} path={CreateCoursePath.Courses} />
        </>
      ) : (
        <NavAccountBtn text={'Материалы курса'} path={CreateCoursePath.Materials} />
      )}
    </nav>
  )
})
