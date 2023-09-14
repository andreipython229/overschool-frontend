import {ChangeEvent, FC, memo, PointerEvent, useEffect, useState} from 'react'

import { Button } from 'components/common/Button/Button'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { deleteIconPath } from '../../../../../../config/svgIconsPath'
import {
  useDeleteModulesMutation,
  usePatchLessonsMutation,
  usePatchModulesMutation,
  useUpdateLessonsOrdersMutation
} from 'api/modulesServices'
import { formDataConverter } from 'utils/formDataConverter'
import { LessonsBlock } from '../LessonsBlock'
import { ModulesBlockT } from '../../../../../../../../types/navigationTypes'
import { lessonT } from 'types/sectionT'
import { useDebounceFunc } from 'customHooks/useDebounceFunc'
import { getSectionId } from 'store/redux/modules/slice'
import { useAppDispatch } from 'store/hooks'
import { SimpleLoader } from 'components/Loaders/SimpleLoader/index'

import styles from '../../constructor.module.scss'
import stylesModules from '../ModulesBlock/modules_block.module.scss'
import { Reorder } from 'framer-motion'
import styles1 from "../../../../../../../../components/Modal/Modal.module.scss";

export const ModulesBlock: FC<ModulesBlockT> = memo(({ setType, setLessonIdAndType, moduleName, lessonsList, id }) => {
  const dispatch = useAppDispatch()

  // ********* DRAG AND DROP **************************************************************
  const [lessons , setLessons] = useState(lessonsList)
  const [updateLessonsOrders] = useUpdateLessonsOrdersMutation()
  const debouncedOrders = useDebounceFunc(updateLessonsOrders, 2000)
  const [newLessonsOrders, setNewLessonsOrders] = useState<lessonT[]>([])

  const [changeModuleName, setChangeModuleName] = useState<string>(moduleName)

  const [changeName] = usePatchModulesMutation()
  const [deleteModule, { isLoading: deleteModuleLoading }] = useDeleteModulesMutation()

  const handleDeleteModule = async () => {
    await deleteModule(id)
  }

  const handleChangeModuleName = (event: ChangeEvent<HTMLInputElement>) => {
    setChangeModuleName(event.target.value)
  }
  const debounced = useDebounceFunc(changeName, 2000)
  const [visibleAddBtn, setVisibleAddBtn] = useState(false);
  const handleOpenModalLesson = () => {
    dispatch(getSectionId(id))
    setType('lessonsModal' as keyof object)
  }

  useEffect(() => {
    if (lessons.length > 0) setVisibleAddBtn(true)
    if (moduleName !== changeModuleName) {
      const updateModule = {
        name: changeModuleName,
        section_id: id,
      }
      const formdata = formDataConverter(updateModule)
      if (formdata && id) {
        debounced({ formdata, id })
      }
    }
  }, [changeModuleName])


  const handleOrderUpdate = (lessonsWithNewOrders: lessonT[]) => {
      setLessons(lessonsWithNewOrders)
      setNewLessonsOrders(lessonsWithNewOrders)
  }

  useEffect(() => {
      const updatedOrderLesson = newLessonsOrders.map(({ baselesson_ptr_id, order}, index) => ({
        baselesson_ptr_id,
        order: index + 1,
      }));
      // console.log(updatedOrderLesson)
      const formdata = formDataConverter(updatedOrderLesson)
      if (formdata && updatedOrderLesson.length > 0) {
        debouncedOrders({formdata})
      }
  }, [newLessonsOrders])

  return (
    <>
      <ul className={styles.redactorCourse_leftSide_desc_headerText}>
        <span className={styles.redactorCourse_leftSide_desc_headerText_title + ' ' + stylesModules.test}>{changeModuleName}</span>
        <span className={styles.redactorCourse_leftSide_desc_headerText_inputWrapper + ' ' + stylesModules.block}>
          <input
            type="text"
            value={changeModuleName || ''}
            onChange={handleChangeModuleName}
            className={styles.redactorCourse_leftSide_desc_headerText_inputWrapper_input}
          />
          <button className={styles.redactorCourse_leftSide_desc_headerText_inputWrapper_btn_delete} onClick={handleDeleteModule}>
            <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deleteIconPath} />
          </button>
          {deleteModuleLoading && <SimpleLoader style={{ width: '20px', height: '20px' }} />}
        </span>

        <Reorder.Group className={styles1.settings_list} as="ul" onReorder={handleOrderUpdate} values={lessons}>
          {lessons &&
            lessons.map((lesson) => (
              <LessonsBlock type={lesson.type} setLessonIdAndType={setLessonIdAndType} key={lesson.baselesson_ptr_id} id={lesson.id} lessonsName={lesson.name} lesson={lesson}/>
                // lesson.id + lesson.name
            ))}
        </Reorder.Group>

        <Button className={styles.btn} text="+ Занятие" variant="secondary" onClick={handleOpenModalLesson} />
        </ul>
    </>
  )
})
