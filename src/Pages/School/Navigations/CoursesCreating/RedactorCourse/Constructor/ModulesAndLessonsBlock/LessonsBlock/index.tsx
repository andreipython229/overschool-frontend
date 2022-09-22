import React, { FC } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { deleteIconPath } from '../../../../../../config/svgIconsPath'
import { useDeleteLessonsMutation } from 'api/modulesServices'

import Lesson from 'assets/img/createCourse/lesson.svg'
import styles from '../../constructor.module.scss'
import stylesModules from '../ModulesBlock/modules_block.module.scss'

type LessonsBlockT = {
  lessonsName: string
  id: number
  setLessonId: any
}

export const LessonsBlock: FC<LessonsBlockT> = ({ setLessonId, lessonsName, id }) => {
  const [deleteLesson] = useDeleteLessonsMutation()

  const handleDeleteLesson = () => {
    deleteLesson(id)
  }
  const handleChangeLesson = () => {
    setLessonId(id.toString())
  }

  return (
    <li onClick={handleChangeLesson}  className={styles.redactorCourse_leftSide_desc_lessonWrapper + ' ' + stylesModules.btnWrapper}>
      <span className={styles.redactorCourse_leftSide_desc_lessonWrapper_lesson}>
        <img src={Lesson} alt="Lessons" />
        {lessonsName}
      </span>
      <button className={styles.redactorCourse_leftSide_desc_lessonWrapper_btn_deleteLesson + ' ' + stylesModules.btn} onClick={handleDeleteLesson}>
        <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deleteIconPath} />
      </button>
    </li>
  )
}
