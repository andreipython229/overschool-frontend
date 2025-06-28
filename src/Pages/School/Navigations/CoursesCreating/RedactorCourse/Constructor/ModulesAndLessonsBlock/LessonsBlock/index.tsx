import { FC, PointerEvent, memo, useEffect, useState } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { useDeleteLessonsMutation, usePatchLessonsMutation } from 'api/modulesServices'
import { LessonsBlockT } from 'types/navigationTypes'
import { lessonIdAndTypeT } from 'components/Modal/ModalTypes'
import { lessonSvgMapper } from '@/config'

import styles from '../../constructor.module.scss'
import stylesModules from '../ModulesBlock/modules_block.module.scss'
import { Reorder, useDragControls, motion, isDragActive, useMotionValue } from 'framer-motion'
import { deleteHoverIconPath, deleteOpenEyeIconPath, eyeCloseIconPath, eyeOpenIconPath } from './config'
import { DoBlockIconPath } from 'Pages/School/config/svgIconsPath'
import { animateVisibility } from './constants/animationConstants'
import { useBoolean } from 'customHooks'
import { WarningModal } from 'components/Modal/Warning'
import { Portal } from 'components/Modal/Portal'
import { useAppSelector } from 'store/hooks'
import { schoolSelector } from 'selectors'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'
import { useRaisedShadow } from './config/raisedShadow'

export const LessonsBlock: FC<LessonsBlockT> = memo(
  ({ setLessonIdAndType, setFocusOnLesson, type, id, lesson, selected, onPush, onOpenModalLesson, sectionId, setInsertAfterOrder }) => {
    const [deleteLesson, { isLoading }] = useDeleteLessonsMutation()
    const y = useMotionValue(0)
    const boxShadow = useRaisedShadow(y)
    const [showModal, { on: close, off: open, onToggle: setShow }] = useBoolean()
    const { schoolName } = useAppSelector(schoolSelector)
    const [isOpenEye, setIsOpenEye] = useState<boolean>(false)
    const [changePublish] = usePatchLessonsMutation()
    const controls = useDragControls()

    useEffect(() => {
      if (lesson) {
        setIsOpenEye(!lesson.active)
      }
    }, [lesson])

    const handleDeleteLesson = async () => {
      await deleteLesson({ id, type, schoolName })
      setLessonIdAndType({} as lessonIdAndTypeT)

      if (setFocusOnLesson) {
        setFocusOnLesson()
      }
    }

    const onPointerDown = (event: PointerEvent<SVGSVGElement | SVGPathElement>) => {
      controls.start(event)
      // handleChangeLesson()
    }

    const handleEyeLesson = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      const form = new FormData()
      form.append('active', String(isOpenEye))
      form.append('section', String(sectionId))
      changePublish({ schoolName: schoolName, arg: { id: lesson.id, type: lesson.type, formdata: form } })
        .unwrap()
        .then(() => setIsOpenEye(!isOpenEye))
    }

    const handleChangeLesson = () => {
      const idAndType = { id, type }
      setLessonIdAndType(idAndType)
      onPush()
    }

    return (
      <Reorder.Item
        dragListener={false}
        dragControls={controls}
        key={lesson.baselesson_ptr_id}
        id={lesson.name}
        value={lesson}
        draggable={false}
        style={{ boxShadow, y, marginBottom: '10px' }}
        whileDrag={{ scale: 1 }}
        className={` ${styles.heightTransition} ${stylesModules.btnWrapper}`}
        initial="initial"
        animate="initial"
        whileHover="animate"
      >
        <motion.div
          // animate="initial"
          // whileHover="animate"
          onClick={handleChangeLesson}
          className={
            !isOpenEye
              ? `${styles.redactorCourse_leftSide_desc_lessonWrapper} ${selected ? styles.selectedLesson : ''}`
              : `${styles.redactorCourse_leftSide_desc_lessonWrapper} ${selected ? styles.selectedLesson : ''} ${
                  styles.openEye
                }`
          }
        >
          {showModal && (
            <Portal closeModal={close}>
              <WarningModal setShowModal={setShow} task={handleDeleteLesson} textModal={`Удалить ${lesson.name}?`} />
            </Portal>
          )}
          <span
            className={
              !isOpenEye
                ? `${styles.redactorCourse_leftSide_desc_lessonWrapper_lesson} ${selected ? styles.selectedLesson : ''}`
                : `${styles.redactorCourse_leftSide_desc_lessonWrapper_lesson} ${selected ? styles.selectedLesson : ''} ${styles.openEye}`
            }
          >
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
            <span
              className={
                isOpenEye
                  ? `${styles.lessonTypeIcon} ${styles.fillColorGrey}`
                  : `${selected ? `${styles.lessonTypeIcon} ${styles.fillColorWhite}` : styles.lessonTypeIcon}`
              }
            >
              {lessonSvgMapper[type]}
            </span>
            <span
              style={
                window.innerWidth >= 1920
                  ? { textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '250px' }
                  : { textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '150px' }
              }
            >
              {lesson.name}
            </span>
            {isLoading && <LoaderLayout />}
          </span>
          {selected ? (
            <div className={styles.lesson_buttons}>
              <button
                className={`${styles.redactorCourse_leftSide_desc_lessonWrapper_btn_deleteLesson} ${styles.lesson_buttons_visible}`}
                onClick={handleEyeLesson}
              >
                <IconSvg
                  className={!isOpenEye ? styles.strokeColorWhite : ''}
                  width={24}
                  height={24}
                  viewBoxSize="0 0 24 24"
                  path={!isOpenEye ? eyeCloseIconPath : eyeOpenIconPath}
                />
              </button>
              <button
                className={`${styles.redactorCourse_leftSide_desc_lessonWrapper_btn_deleteLesson} ${styles.lesson_buttons_visible}`}
                onClick={open}
              >
                <IconSvg
                  className={!isOpenEye ? styles.fillColorWhite : ''}
                  width={20}
                  height={20}
                  viewBoxSize="0 0 20 20"
                  path={!isOpenEye ? deleteHoverIconPath : deleteOpenEyeIconPath}
                />
              </button>
            </div>
          ) : (
            <div className={styles.lesson_buttons}>
              <button
                className={
                  !isOpenEye
                    ? styles.redactorCourse_leftSide_desc_lessonWrapper_btn_deleteLesson + ' ' + stylesModules.btn
                    : `${styles.redactorCourse_leftSide_desc_lessonWrapper_btn_deleteLesson} ${styles.lesson_buttons_visible}`
                }
                onClick={handleEyeLesson}
              >
                <IconSvg width={24} height={24} viewBoxSize="0 0 24 24" path={!isOpenEye ? eyeCloseIconPath : eyeOpenIconPath} />
              </button>
              <button
                className={
                  !isOpenEye
                    ? styles.redactorCourse_leftSide_desc_lessonWrapper_btn_deleteLesson + ' ' + stylesModules.btn
                    : `${styles.redactorCourse_leftSide_desc_lessonWrapper_btn_deleteLesson} ${styles.lesson_buttons_visible}`
                }
                onClick={open}
              >
                <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={!isOpenEye ? deleteHoverIconPath : deleteOpenEyeIconPath} />
              </button>
            </div>
          )}
        </motion.div>
        {!isDragActive() ? (
          <motion.button
            className={styles.btn}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            variants={animateVisibility}
            onClick={() => {
              setInsertAfterOrder(lesson.order)
              onOpenModalLesson?.()
            }}
          >
            {'+ Добавить новый урок'}
          </motion.button>
        ) : null}
      </Reorder.Item>
    )
  },
)
