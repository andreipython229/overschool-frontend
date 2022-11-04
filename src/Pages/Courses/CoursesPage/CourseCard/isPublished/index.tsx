import React, { FC } from 'react'

import Public from 'assets/img/createCourse/public.svg'
import notPublic from 'assets/img/createCourse/notPublic.svg'

import styles from '../../../Navigations/CoursesCreating/coursePage.module.scss'

type IsPublishedT = {
  published: string
}

export const IsPublished: FC<IsPublishedT> = ({ published }) => {
  return (
    <>
      {published === 'О' ? (
        <>
          <img width={'20'} height={'20'} src={Public} alt="status course" />
          <span className={styles.course_card_status_show_public}>Опубликован</span>
        </>
      ) : (
        <>
          <img width={'20'} height={'20'} src={notPublic} alt="status course" />
          <span className={styles.course_card_status_show_public}>Не опубликован</span>
        </>
      )}
    </>
  )
}
