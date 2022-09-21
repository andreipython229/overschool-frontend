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
    <div onClick={handleChangeLesson} style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
      <span className={styles.redactorCourse_leftSide_desc_lesson}>
        <img src={Lesson} alt="Lessons" />
        {lessonsName}
      </span>
      <button className={stylesModules.btn_delete_module} onClick={handleDeleteLesson}>
        <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deleteIconPath} />
      </button>
    </div>
  )
}
