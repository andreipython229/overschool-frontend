import { ChangeEvent, FC, memo, PointerEvent, useEffect, useState } from 'react'

import { Button } from 'components/common/Button/Button'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { deleteIconPath } from '../../../../../../config/svgIconsPath'
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
import { Reorder, useDragControls } from 'framer-motion'
import styles1 from '../../../../../../../../components/Modal/Modal.module.scss'
import { useBoolean } from 'customHooks'
import { Portal } from 'components/Modal/Portal'
import { WarningModal } from 'components/Modal/Warning'
import { doBlockIconPath } from 'components/Modal/SettingStudentTable/config/svgIconsPath'
import { ArrowDownward, ArrowDropDown, ArrowUpward } from '@mui/icons-material'

const show = {
  opacity: 1,
  display: 'block',
}

const hide = {
  opacity: 0,
  transitionEnd: {
    display: 'none',
  },
}

export const ModulesBlock: FC<ModulesBlockT> = memo(
  ({ setType, setLessonIdAndType, moduleName, lessonsList, id, setSelectedLessonId, selectedLessonId, section }) => {
    const dispatch: any = useAppDispatch()
    const [showLessons, { onToggle: toggleLessons }] = useBoolean(true)
    const schoolName = window.location.href.split('/')[4]
    const [showModal, { on: close, off: open, onToggle: setShow }] = useBoolean()
    const controls = useDragControls()

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
        // transition={{ duration: 0 }}
        key={section.section + section.order}
        value={section}
        whileDrag={{
          // transition: { duration: 0.3 },
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
          <span className={styles.redactorCourse_leftSide_desc_headerText_title + ' ' + stylesModules.test}>
            <span className={styles.redactorCourse_leftSide_desc_lessonWrapper_btn_drag_and_drop_module + ' ' + stylesModules.btn}>
              <IconSvg
                styles={{ cursor: 'grab', width: '14px', height: '14px', position: 'absolute', top: '8px', left: '6px', zIndex: '30' }}
                width={12}
                height={18}
                viewBoxSize={'0 0 12 18'}
                onPointerDown={onPointerDown}
                path={doBlockIconPath}
              />
            </span>
            <input
              type="text"
              value={changeModuleName || ''}
              onChange={handleChangeModuleName}
              className={styles.redactorCourse_leftSide_desc_headerText_inputWrapper_input}
            />
            <button className={styles.redactorCourse_leftSide_desc_headerText_inputWrapper_btn_delete} onClick={open}>
              <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deleteIconPath} />
            </button>
            {deleteModuleLoading && <SimpleLoader style={{ width: '20px', height: '20px' }} />}
          </span>

          <span
            onClick={() => toggleLessons()}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              fontSize: '12px',
              cursor: 'pointer',
              paddingBottom: '1rem',
            }}
            className={styles.showBtn}
          >
            {showLessons ? `Скрыть материалы модуля` : `Показать материалы`} {showLessons ? <ArrowUpward /> : <ArrowDownward />}
          </span>
          <Reorder.Group
            className={styles1.settings_list}
            transition={{ duration: 0.4 }}
            animate={showLessons ? show : hide}
            as="ul"
            onReorder={handleOrderUpdate}
            values={lessons}
          >
            {lessons &&
              lessons.map(lesson => (
                <LessonsBlock
                  type={lesson.type}
                  setLessonIdAndType={setLessonIdAndType}
                  setFocusOnLesson={() => handleSetFirstLesson()}
                  key={lesson.baselesson_ptr_id}
                  id={lesson.id}
                  lessonsName={lesson.name}
                  lesson={lesson}
                  selected={selectedLessonId === lesson.baselesson_ptr_id}
                  onPush={() => handleLessonClick(lesson.baselesson_ptr_id)}
                />
              ))}
          </Reorder.Group>
          <Button className={styles.btn} text="+ занятие" variant="secondary" onClick={handleOpenModalLesson} />
        </ul>
      </Reorder.Item>
    )
  },
)
