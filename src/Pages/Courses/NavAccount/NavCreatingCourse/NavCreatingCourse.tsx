import React from 'react'
import { NavAccountBtn } from '../NavAccountBtn/NavAccountBtn'
import { CreateCoursePath, Path } from '../../../../enum/pathE'

import styles from './navCreatingCourse.module.scss'

export const NavCreatingCourse = () => {
  return (
    <div className={styles.creatingCourse}>
      <NavAccountBtn text={'Конструктор'} path={CreateCoursePath.Constructor} />
      <NavAccountBtn text={'Ученики курса'} path={CreateCoursePath.Student} />
      <NavAccountBtn text={'Настройки курса'} path={CreateCoursePath.Settings} />
    </div>
  )
}
