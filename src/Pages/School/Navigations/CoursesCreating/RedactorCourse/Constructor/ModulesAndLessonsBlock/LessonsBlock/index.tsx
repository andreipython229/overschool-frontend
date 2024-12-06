import { FC, Fragment, PointerEvent, memo, useEffect, useState } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { useDeleteLessonsMutation } from 'api/modulesServices'
import { LessonsBlockT } from 'types/navigationTypes'
import { lessonIdAndTypeT } from 'components/Modal/ModalTypes'
import { lessonSvgMapper } from 'config'
import { SimpleLoader } from 'components/Loaders/SimpleLoader/index'

import styles from '../../constructor.module.scss'
import stylesModules from '../ModulesBlock/modules_block.module.scss'
import { Reorder, useDragControls, motion, useAnimation } from 'framer-motion'
import { deleteHoverIconPath, deleteOpenEyeIconPath, eyeCloseIconPath, eyeOpenIconPath } from './config'
import { DoBlockIconPath } from 'Pages/School/config/svgIconsPath'
import { animateVisibility } from './constants/animationConstants'
import { useBoolean } from 'customHooks'
import { WarningModal } from 'components/Modal/Warning'
import { Portal } from 'components/Modal/Portal'

export const LessonsBlock: FC<LessonsBlockT> = memo(({ setLessonIdAndType, setFocusOnLesson, type, lessonsName, id, lesson, selected, onPush, onOpenModalLesson, openedEye }) => {
  const [deleteLesson, { isLoading }] = useDeleteLessonsMutation()
  const [showModal, { on: close, off: open, onToggle: setShow }] = useBoolean()
  const controls = useDragControls()
  const schoolName = window.location.href.split('/')[4]
  const [isOpenEye, setIsOpenEye] = useState<boolean>(false)

  useEffect(() => {
    if (openedEye === true) {
      setIsOpenEye(true)
    } else {
      setIsOpenEye(false)
    }
  }, [openedEye])

  const handleDeleteLesson = async () => {
    await deleteLesson({ id, type, schoolName })
    setLessonIdAndType({} as lessonIdAndTypeT)

    if (setFocusOnLesson) {
      setFocusOnLesson();
    }
  }

  const onPointerDown = (event: PointerEvent<SVGSVGElement | SVGPathElement>) => {
    controls.start(event)
  }

  const handleEyeLesson = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!openedEye) setIsOpenEye(!isOpenEye)
  }

  const handleChangeLesson = () => {
    const idAndType = { id, type }
    setLessonIdAndType(idAndType)
    onPush()
  }

  return (
    <motion.div animate="initial" whileHover="animate" className={`${styles.heightTransition} ${stylesModules.btnWrapper}`}>
      <Reorder.Item
        dragControls={controls}
        dragListener={false}
        draggable={false}
        key={lesson.baselesson_ptr_id}
        value={lesson}
        onClick={!isOpenEye ? handleChangeLesson : undefined}
        className={!isOpenEye ? (
          `${styles.redactorCourse_leftSide_desc_lessonWrapper} ${selected ? styles.selectedLesson : ''}`) : (
          `${styles.redactorCourse_leftSide_desc_lessonWrapper} ${selected ? styles.selectedLesson : ''} ${styles.openEye}`
        )}
        whileDrag={{
        boxShadow: 'rgba(0,0,0, 0.12) 0px 1px 3px, rgba(0,0,0, 0.24) 0px 1px 2px',
        borderRadius: '7px',
        }}
      >
        {showModal && (
          <Portal closeModal={close}>
            <WarningModal
              setShowModal={setShow}
              task={handleDeleteLesson}
              textModal={`Удалить ${lesson.name}?`}
            />
          </Portal>
        )}
        <span className={!isOpenEye ? (`${styles.redactorCourse_leftSide_desc_lessonWrapper_lesson} ${selected ? styles.selectedLesson : ''}`) : (
          `${styles.redactorCourse_leftSide_desc_lessonWrapper_lesson} ${selected ? styles.selectedLesson : ''} ${styles.openEye}`)}>
          <span className={styles.redactorCourse_leftSide_desc_lessonWrapper_btn_drag_and_drop_module + ' ' + stylesModules.btn}>
            <IconSvg
              className={isOpenEye ? styles.doBlockIcon : `${selected ? `${styles.doBlockIcon} ${styles.fillColorWhite}` : styles.doBlockIcon}`}
              width={24}
              height={24}
              viewBoxSize={'0 0 24 24'}
              onPointerDown={onPointerDown}
              path={DoBlockIconPath}
            />
          </span>
          <span className={isOpenEye ? `${styles.lessonTypeIcon} ${styles.fillColorGrey}` : `${selected ? `${styles.lessonTypeIcon} ${styles.fillColorWhite}` : styles.lessonTypeIcon}`}>{lessonSvgMapper[type]}</span>
          <span>{lesson.name}</span>
          {isLoading && (
            <div style={{ marginLeft: '40px' }}>
              <SimpleLoader style={{ width: '20px', height: '20px' }} />
            </div>
          )}
        </span>
        {selected ? (
          <div className={styles.lesson_buttons}>
            <button
              className={`${styles.redactorCourse_leftSide_desc_lessonWrapper_btn_deleteLesson} ${styles.lesson_buttons_visible}`}
              onClick={handleEyeLesson}
            >
              <IconSvg className={!isOpenEye ? styles.strokeColorWhite : ''} width={24} height={24} viewBoxSize="0 0 24 24" path={!isOpenEye ? eyeCloseIconPath : eyeOpenIconPath} />
            </button>
            <button
              className={`${styles.redactorCourse_leftSide_desc_lessonWrapper_btn_deleteLesson} ${styles.lesson_buttons_visible}`}
              onClick={open}
            >
              <IconSvg className={!isOpenEye ? styles.fillColorWhite : ''} width={20} height={20} viewBoxSize="0 0 20 20" path={!isOpenEye ? deleteHoverIconPath : deleteOpenEyeIconPath} />
            </button>
          </div>
        ) : (
          <div className={styles.lesson_buttons}>
            <button
              className={!isOpenEye ? (styles.redactorCourse_leftSide_desc_lessonWrapper_btn_deleteLesson + ' ' + stylesModules.btn) : `${styles.redactorCourse_leftSide_desc_lessonWrapper_btn_deleteLesson} ${styles.lesson_buttons_visible}`}
              onClick={handleEyeLesson}
            >
              <IconSvg width={24} height={24} viewBoxSize="0 0 24 24" path={!isOpenEye ? eyeCloseIconPath : eyeOpenIconPath} />
            </button>
            <button
              className={!isOpenEye ? (styles.redactorCourse_leftSide_desc_lessonWrapper_btn_deleteLesson + ' ' + stylesModules.btn) : `${styles.redactorCourse_leftSide_desc_lessonWrapper_btn_deleteLesson} ${styles.lesson_buttons_visible}`}
              onClick={open}
            >
              <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={!isOpenEye ? deleteHoverIconPath : deleteOpenEyeIconPath} />
            </button>
          </div>
        )}
      </Reorder.Item>
      {!isOpenEye ? (
        <motion.button
          className={styles.btn}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          variants={animateVisibility}
          onClick={onOpenModalLesson}
        >
        {'+ Добавить новый урок'}
        </motion.button>
      ) : null}
    </motion.div>
  )
})
