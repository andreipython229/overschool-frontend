import React, { FC, useState, useEffect, ChangeEvent } from 'react'
import styles from './styles/headerViewBlock.module.scss'
import { Button } from 'components/common/Button/Button'
import { useAppSelector } from 'store/hooks'
import { HeaderBlockT } from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/CoursePage/types/blocksControllerT'

export const HeaderViewBlock: FC<HeaderBlockT> = ({ openModal }) => {
  const landing = useAppSelector(state => state.landing.blocks)
  return (
    <div className={styles.previous}>
      <img className={styles.background_image_course} src={landing.header.photoBackground} alt={landing.header.name} />

      <div className={styles.previous_bcgrShadow}></div>
      <div className={styles.previous_onlineCourses}>
        <div className={styles.previous_onlineCourses_name}>{landing.header.name}</div>
      </div>
      <div className={styles.previous_title_name}>
        <div className={styles.previous_title_name_description}>{landing.header.description}</div>
      </div>
      <div className={styles.previous_buttonAccept}>
        <Button variant="newPrimary" onClick={openModal} text="Оставить заявку" />
      </div>
    </div>
  )
}
