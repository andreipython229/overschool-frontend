import React, { FC } from 'react'
import { Button } from 'components/common/Button/Button'
import { lessonsBlockSvgIcon } from '../../../../../../../constants/iconSvgConstants'
import { IconSvg } from '../../../../../../../components/common/IconSvg/IconSvg'
import { useAppDispatch } from '../../../../../../../store/hooks'
import { showModal } from 'store/redux/modal/slice'

import styles from 'Pages/Courses/Navigations/CoursesCreating/RedactorCourse/Constructor/constructor.module.scss'
import Lesson from 'assets/img/createCourse/lesson.svg'

type LessonAddBlockPropsT = {
  setModalTypeClasses: () => void
  toggleModalModule: () => void
}

export const LessonAddBlock: FC<LessonAddBlockPropsT> = ({
  setModalTypeClasses,
  toggleModalModule,
}) => {
  const dispatch = useAppDispatch()

  const handleOpenModal = () => {
    toggleModalModule()
    dispatch(showModal(true))
  }

  return (
    <div className={styles.redactorCourse_leftSide}>
      <h5 className={styles.redactorCourse_leftSide_title}>Структура курса</h5>
      <div className={styles.redactorCourse_leftSide_desc}>
        <span className={styles.redactorCourse_leftSide_desc_title}>Первый модуль</span>
        <span className={styles.redactorCourse_leftSide_desc_lesson}>
          <img src={Lesson} alt="Lessons" />
          Первый урок
        </span>
        <button className={styles.btn} onClick={setModalTypeClasses}>
          + Занятие
        </button>

        <div className={styles.redactorCourse_leftSide_classes}>
          <div className={styles.redactorCourse_leftSide_classes_settings}>
            <div className={styles.redactorCourse_leftSide_classes_settings_drag}>
              <IconSvg
                width={13}
                height={9}
                viewBoxSize="0 0 13 9"
                fill="#C1C1C1"
                d={lessonsBlockSvgIcon.textBurger}
              />
              Тест
            </div>
            <div className={styles.redactorCourse_leftSide_classes_settings_panel}>
              <IconSvg
                width={14}
                height={14}
                viewBoxSize="0 0 14 14"
                fill="#C1C1C1"
                d={lessonsBlockSvgIcon.pencil}
              />
              <IconSvg
                width={15}
                height={15}
                viewBoxSize="0 0 15 15"
                fill="#C1C1C1"
                d={lessonsBlockSvgIcon.trashcan}
              />
            </div>
          </div>
          <button className={styles.btn}>+ Занятие</button>
        </div>
        <div className={styles.hl} />
        <Button
          onClick={handleOpenModal}
          style={{ width: '236px' }}
          text={'+ Модуль'}
          variant={'primary'}
        />
      </div>
    </div>
  )
}
