import { ChangeEvent, FC, memo, PointerEvent, useEffect, useState } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { ArrowDownGreyIconPath, ArrowDownIconPath, ArrowRightIconPath, deleteIconPath, DoBlockHoverIconPath, DoBlockIconPath } from '../../../../../../config/svgIconsPath'
import { useDeleteModulesMutation, usePatchModulesMutation, useUpdateLessonsOrdersMutation } from 'api/modulesServices'
import { formDataConverter } from 'utils/formDataConverter'
import { LessonsBlock } from '../LessonsBlock'
import { ModulesBlockT } from '../../../../../../../../types/navigationTypes'
import { lessonT } from 'types/sectionT'
import { useDebounceFunc } from 'customHooks/useDebounceFunc'
import { getSectionId } from 'store/redux/modules/slice'
import { useAppDispatch } from 'store/hooks'
import { SimpleLoader } from 'components/Loaders/SimpleLoader/index'

import styles from '../../constructor.module.scss'
import stylesModules from './modules_block.module.scss'
import { MotionConfig, Reorder, useDragControls, motion } from 'framer-motion'
import styles1 from '../../../../../../../../components/Modal/Modal.module.scss'
import { useBoolean } from 'customHooks'
import { Portal } from 'components/Modal/Portal'
import { WarningModal } from 'components/Modal/Warning'
import { deleteHoverIconPath, eyeCloseIconPath, eyeOpenIconPath } from '../LessonsBlock/config'
import { animateVisibility, show, hide } from '../LessonsBlock/constants/animationConstants'

export const ModulesBlock: FC<ModulesBlockT> = memo(
  ({ setType, setLessonIdAndType, moduleName, lessonsList, id, setSelectedLessonId, selectedLessonId, section, onOpenModalModule }) => {
    const dispatch: any = useAppDispatch()
    const [showLessons, { onToggle: toggleLessons }] = useBoolean(true)
    const schoolName = window.location.href.split('/')[4]
    const [showModal, { on: close, off: open, onToggle: setShow }] = useBoolean()
    const controls = useDragControls()
    const [isOpenEye, setIsOpenEye] = useState<boolean>(false)

    const handleLessonClick = (lessonId: number) => {
      setSelectedLessonId(lessonId)
    }

    // ********* DRAG AND DROP **************************************************************
    const [lessons, setLessons] = useState(lessonsList)
    const [updateLessonsOrders] = useUpdateLessonsOrdersMutation()
    const debouncedOrders = useDebounceFunc(updateLessonsOrders, 2000)
    const [newLessonsOrders, setNewLessonsOrders] = useState<lessonT[]>([])

    const [changeModuleName, setChangeModuleName] = useState<string>(moduleName)

    const [changeName] = usePatchModulesMutation()
    const [deleteModule, { isLoading: deleteModuleLoading }] = useDeleteModulesMutation()

    const handleDeleteModule = async () => {
      close()
      await deleteModule({ id, schoolName })
    }

    const handleEyeLesson = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setIsOpenEye(!isOpenEye)
    }

    const handleChangeModuleName = (event: ChangeEvent<HTMLInputElement>) => {
      setChangeModuleName(event.target.value)
    }
    const debounced = useDebounceFunc(changeName, 2000)
    const [visibleAddBtn, setVisibleAddBtn] = useState(false)

    const handleOpenModalLesson = () => {
      dispatch(getSectionId(id))
      setType('lessonsModal' as keyof object)
    }

    const handleSetFirstLesson = () => {
      handleLessonClick(lessonsList[0].baselesson_ptr_id)
    }

    useEffect(() => {
      setLessons(lessonsList)
    }, [lessonsList])

    useEffect(() => {
      if (lessons.length > 0) setVisibleAddBtn(true)
      if (moduleName !== changeModuleName) {
        const updateModule = {
          name: changeModuleName,
          section_id: id,
        }
        const formdata = formDataConverter(updateModule)
        if (formdata && id) {
          debounced({ arg: { formdata, id }, schoolName })
        }
      }
    }, [changeModuleName])

    const handleOrderUpdate = (lessonsWithNewOrders: lessonT[]) => {
      setLessons(lessonsWithNewOrders)
      setNewLessonsOrders(lessonsWithNewOrders)
    }

    useEffect(() => {
      const updatedOrderLesson = newLessonsOrders.map(({ baselesson_ptr_id, order }, index) => ({
        baselesson_ptr_id,
        order: index + 1,
      }))
      const formData = { data: updatedOrderLesson }
      if (formData.data.length > 0 && updatedOrderLesson.length > 0) {
        debouncedOrders({ arg: formData, schoolName })
      }
    }, [newLessonsOrders])

    const onPointerDown = (event: PointerEvent<SVGSVGElement | SVGPathElement>) => {
      controls.start(event)
    }

    return (
      <Reorder.Item
        dragControls={controls}
        dragListener={false}
        draggable={false}
        key={section.section + section.order}
        value={section}
        whileHover={{
          transition: { duration: 0.4, ease: 'easeOut' },
        }}
        whileDrag={{
          boxShadow: 'rgba(0,0,0, 0.12) 0px 1px 3px, rgba(0,0,0, 0.24) 0px 1px 2px',
          transformOrigin: 'center center',
          borderRadius: '7px',
        }}
      >
        {showModal && (
          <Portal closeModal={close}>
            <WarningModal
              setShowModal={setShow}
              task={handleDeleteModule}
              textModal={`Вы действительно хотите удалить модуль ${changeModuleName}?`}
            />
          </Portal>
        )}
        <ul className={styles.redactorCourse_leftSide_desc_headerText}>
          <motion.div initial="initial" animate="initial" whileHover="animate" className={`${styles.heightTransition} ${stylesModules.btnWrapper}`}>
            <span className={isOpenEye ? `${styles.redactorCourse_leftSide_desc_headerText_title} ${styles.openEye}` : (!showLessons ? (
              styles.redactorCourse_leftSide_desc_headerText_title + ' ' + stylesModules.test) : (
              `${styles.redactorCourse_leftSide_desc_headerText_title} ${styles.showLessons}`))}>
              <div className={styles.redactorCourse_leftSide_desc_wrapper}>
                <span className={styles.redactorCourse_leftSide_desc_lessonWrapper_btn_drag_and_drop_module + ' ' + stylesModules.btn}>
                  <IconSvg
                    className={isOpenEye ? styles.doBlockIcon : (!showLessons ? styles.doBlockIcon : `${styles.doBlockIcon} ${styles.unvisible} ${stylesModules.btn}`)}
                    width={24}
                    height={24}
                    viewBoxSize={'0 0 24 24'}
                    onPointerDown={onPointerDown}
                    path={isOpenEye ? DoBlockIconPath : (!showLessons ? DoBlockIconPath : DoBlockHoverIconPath)}
                  />
                </span>
                <span onClick={() => toggleLessons()}>
                  <IconSvg
                    styles={{ cursor: 'pointer', margin: '4px 10px 0 0'}}
                    width={14}
                    height={14}
                    viewBoxSize={'0 0 14 14'}
                    path={isOpenEye ? ArrowDownGreyIconPath : (showLessons ? ArrowDownIconPath : ArrowRightIconPath)}
                  />
                </span>
                <input
                  type="text"
                  value={changeModuleName || ''}
                  onChange={handleChangeModuleName}
                  className={isOpenEye ? `${styles.redactorCourse_leftSide_desc_headerText_inputWrapper_input} ${styles.openEye}` : (!showLessons ? `${styles.redactorCourse_leftSide_desc_headerText_inputWrapper_input}` : `${styles.redactorCourse_leftSide_desc_headerText_inputWrapper_input} ${styles.showLessonsInput}`)}
                />
              </div>
              <div className={styles.lesson_buttons}>
                <button
                  className={styles.redactorCourse_leftSide_desc_headerText_inputWrapper_btn_delete + ' ' + stylesModules.btn}
                  onClick={handleEyeLesson}
                >
                  <IconSvg className={isOpenEye ? styles.strokeColorGrey : (!showLessons ? '' : styles.strokeColorWhite)} width={24} height={24} viewBoxSize="0 0 24 24" path={!isOpenEye ? eyeCloseIconPath : eyeOpenIconPath} />
                </button>
                <button
                  className={styles.redactorCourse_leftSide_desc_headerText_inputWrapper_btn_delete + ' ' + stylesModules.btn}
                  onClick={open}
                >
                  <IconSvg className={isOpenEye ? styles.fillColorGrey : (!showLessons ? '' : styles.fillColorWhite)} width={20} height={20} viewBoxSize="0 0 20 20" path={deleteHoverIconPath} />
                </button>
              </div>
              {deleteModuleLoading && <SimpleLoader style={{ width: '20px', height: '20px' }} />}
            </span>
            <motion.button
                className={styles.btn}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                variants={animateVisibility}
                onClick={(!showLessons || isOpenEye) ? onOpenModalModule : handleOpenModalLesson}
                >
                {(!showLessons || isOpenEye) ? '+ Добавить новый модуль' : '+ Добавить новый урок'}
            </motion.button>
          </motion.div>

          <Reorder.Group
            className={styles1.settings_list}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            animate={(showLessons || isOpenEye) ? show : hide}
            as="ul"
            onReorder={handleOrderUpdate}
            values={lessons}
          >
            {lessons &&
              lessons.map(lesson => (
                <LessonsBlock
                  openedEye={isOpenEye}
                  type={lesson.type}
                  setLessonIdAndType={setLessonIdAndType}
                  setFocusOnLesson={() => handleSetFirstLesson()}
                  key={lesson.baselesson_ptr_id}
                  id={lesson.id}
                  lessonsName={lesson.name}
                  lesson={lesson}
                  selected={selectedLessonId === lesson.baselesson_ptr_id}
                  onPush={() => handleLessonClick(lesson.baselesson_ptr_id)}
                  onOpenModalLesson={handleOpenModalLesson}
                />
              ))}
          </Reorder.Group>
        </ul>
      </Reorder.Item>
    )
  },
)
