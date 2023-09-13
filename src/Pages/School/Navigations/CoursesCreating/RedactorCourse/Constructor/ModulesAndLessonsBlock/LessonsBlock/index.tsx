import {FC, PointerEvent} from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { deleteIconPath } from '../../../../../../config/svgIconsPath'
import { useDeleteLessonsMutation } from 'api/modulesServices'
import { LessonsBlockT } from 'types/navigationTypes'
import { lessonIdAndTypeT } from 'components/Modal/ModalTypes'
import { lessonSvgMapper } from 'config'
import { SimpleLoader } from 'components/Loaders/SimpleLoader/index'

import styles from '../../constructor.module.scss'
import stylesModules from '../ModulesBlock/modules_block.module.scss'
import { Reorder, useDragControls } from 'framer-motion'
import {doBlockIconPath} from "../../../../../../../../components/Modal/SettingStudentTable/config/svgIconsPath";

export const LessonsBlock: FC<LessonsBlockT> = ({ setLessonIdAndType, type, lessonsName, id , lesson}) => {
  const [deleteLesson, { isLoading }] = useDeleteLessonsMutation()
  const controls = useDragControls()

  const handleDeleteLesson = async () => {
    await deleteLesson({ id, type })
    setLessonIdAndType({} as lessonIdAndTypeT)
  }

  const handleChangeLesson = () => {
    const idAndType = { id, type }
      // console.log(idAndType)
    setLessonIdAndType(idAndType)
  }

  const onPointerDown = (event: PointerEvent<SVGSVGElement | SVGPathElement>) => {
    controls.start(event)
  }

  return (
    <Reorder.Item
          dragControls={controls}
          dragListener={false}
          draggable={false}
          key={lesson.baselesson_ptr_id}
          value={lesson}
          onClick={handleChangeLesson}
          className={styles.redactorCourse_leftSide_desc_lessonWrapper + ' ' + stylesModules.btnWrapper}
          whileDrag={{
            scale: 1.1,
            boxShadow: 'rgba(0,0,0, 0.12) 0px 1px 3px, rgba(0,0,0, 0.24) 0px 1px 2px',
            borderRadius: '7px',
          }}>
        <span className={styles.redactorCourse_leftSide_desc_lessonWrapper_lesson}>
          <span className={styles.redactorCourse_leftSide_desc_lessonWrapper_btn_drag_and_drop + ' ' + stylesModules.btn}>
            <IconSvg
              styles={{ cursor: 'grab', width: '14px', height: '14px', position: 'absolute', top: '8px', left: '6px', zIndex: '10' }}
              width={12}
              height={18}
              viewBoxSize={'0 0 12 18'}
              onPointerDown={onPointerDown}
              path={doBlockIconPath}
            />
          </span>
          <span>{lessonSvgMapper[type]}</span>
          order = {lesson.order} {lesson.name} id = {lesson.baselesson_ptr_id}
          {isLoading && (
            <div style={{ marginLeft: '40px' }}>
              <SimpleLoader style={{ width: '20px', height: '20px' }} />
            </div>
          )}
        </span>
        <button className={styles.redactorCourse_leftSide_desc_lessonWrapper_btn_deleteLesson + ' ' + stylesModules.btn} onClick={handleDeleteLesson}>
          <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deleteIconPath} />
        </button>
    </ Reorder.Item>
  )
}
