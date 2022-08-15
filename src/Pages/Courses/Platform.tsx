import React, { memo, useState } from 'react'
import { CoursePage } from 'Pages/Courses/Navigations/CoursesCreating/CoursePage'
import { AddCourseModal } from 'components/Modal'
import { Previous } from './Previous/Previous'
import noAvatar from '../../assets/img/noAvatar.svg'
import { useAppSelector } from '../../store/hooks'
import { Route, Routes } from 'react-router-dom'
import { Path } from 'enum/pathE'
import { RedactorCourse } from './Navigations/CoursesCreating/RedactorCourse/RedactorCourse'
import { Settings } from './Navigations/Settings/Settings'
import { RoleE } from 'enum/roleE'

import styles from './courses.module.scss'

export const Platform = memo(() => {
  const role = useAppSelector((state: any) => state.user.permission)
  const avatar = useAppSelector((state: any) => state.user.avatar)
  const [showModal, setShowModal] = useState<boolean>(false)

  const setModal = () => {
    setShowModal(!showModal)
  }

  return (
    <div className={styles.container}>
      {showModal ? <AddCourseModal setShowModal={setModal} /> : null}
      <div>
        {role !== 0 && (
          <Previous
            avatar={avatar || noAvatar}
            name={'Название'}
            about={'Онлайн-обучение'}
            description={'Краткое описание'}
          />
        )}
      </div>
      <Routes>
        {role === RoleE.SuperAdmin ? (
          <Route path={'/*'} element={<Settings />} />
        ) : (
          <Route path={'/*'} element={<CoursePage setShowModal={setModal} />} />
        )}
        <Route path={Path.CreateCourse} element={<RedactorCourse />} />
      </Routes>
    </div>
  )
})
