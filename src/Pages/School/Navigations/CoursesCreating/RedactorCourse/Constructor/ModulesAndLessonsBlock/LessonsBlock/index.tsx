import { FC } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { deleteIconPath } from '../../../../../../config/svgIconsPath'
import { useDeleteLessonsMutation } from 'api/modulesServices'
import { LessonsBlockT } from 'types/navigationTypes'
import { lessonIdAndTypeT } from 'components/Modal/ModalTypes'
import { lessonSvgMapper } from 'config'
import { SimpleLoader } from 'components/Loaders/SimpleLoader/index'

import styles from '../../constructor.module.scss'
import stylesModules from '../ModulesBlock/modules_block.module.scss'

export const LessonsBlock: FC<LessonsBlockT> = ({ setLessonIdAndType, type, lessonsName, id }) => {
  const [deleteLesson, { isLoading }] = useDeleteLessonsMutation()

  const handleDeleteLesson = async () => {
    await deleteLesson({ id, type })

    setLessonIdAndType({} as lessonIdAndTypeT)
  }
  const handleChangeLesson = () => {
    const idAndType = {
      id,
      type,
    }
    setLessonIdAndType(idAndType)
  }

  return (
    <li onClick={handleChangeLesson} className={styles.redactorCourse_leftSide_desc_lessonWrapper + ' ' + stylesModules.btnWrapper}>
      <span className={styles.redactorCourse_leftSide_desc_lessonWrapper_lesson}>
        <span>{lessonSvgMapper[type]}</span>
        {lessonsName}
        {isLoading && (
          <div style={{ marginLeft: '40px' }}>
            <SimpleLoader style={{ width: '20px', height: '20px' }} />
          </div>
        )}
      </span>
      <button className={styles.redactorCourse_leftSide_desc_lessonWrapper_btn_deleteLesson + ' ' + stylesModules.btn} onClick={handleDeleteLesson}>
        <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deleteIconPath} />
      </button>
    </li>
  )
}
