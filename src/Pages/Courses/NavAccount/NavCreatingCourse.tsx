import { memo } from 'react'
import { NavAccountBtn } from 'components/NavAccountBtn/NavAccountBtn'
import { CreateCoursePath } from 'enum/pathE'

import styles from './navCreatingCourse.module.scss'

export const NavCreatingCourse = memo(() => {
  return (
    <nav className={styles.creatingCourse}>
      <NavAccountBtn text={'Конструктор'} path={CreateCoursePath.Constructor} />
      <NavAccountBtn text={'Ученики курса'} path={CreateCoursePath.Student} />
      <NavAccountBtn text={'Настройки курса'} path={CreateCoursePath.Settings} />
    </nav>
  )
})
