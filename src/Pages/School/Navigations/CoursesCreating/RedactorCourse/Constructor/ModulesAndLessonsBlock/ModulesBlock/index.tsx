import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { deleteIconPath } from '../../../../../../config/svgIconsPath'
import { useDeleteModulesMutation, usePatchModulesMutation } from 'api/modulesServices'
import { formDataConverter } from 'utils/formDataConverter'
import { showModal } from 'store/redux/modal/slice'
import { getSectionId } from 'store/redux/modules/slice'
import { useAppDispatch } from 'store/hooks'

import styles from '../../constructor.module.scss'
import stylesModules from '../ModulesBlock/modules_block.module.scss'

import Lesson from 'assets/img/createCourse/lesson.svg'
import { LessonsBlock } from '../LessonsBlock'

type ModulesBlockT = {
  moduleName: string
  id: number
  lessonsList: Array<object>
  setModalTypeClasses: () => void
  setLessonId: any
}

export const ModulesBlock: FC<ModulesBlockT> = ({ setLessonId, moduleName, lessonsList, id, setModalTypeClasses }) => {
  const dispatch = useAppDispatch()
  const [changeModuleName, setChangeModuleName] = useState<string>(moduleName)

  const [changeName] = usePatchModulesMutation()

  const [deleteModule] = useDeleteModulesMutation()

  const handleDeleteModule = () => {
    deleteModule(id)
  }

  const handleChangeModuleName = (event: ChangeEvent<HTMLInputElement>) => {
    setChangeModuleName(event.target.value)
  }
  const handleOpenModalLesson = () => {
    setModalTypeClasses()
    dispatch(showModal(true))
    dispatch(getSectionId(id))
  }

  useEffect(() => {
    const updateModule = {
      name: changeModuleName,
      section_id: id,
    }
    const formdata = formDataConverter(updateModule)
    if (formdata && id) {
      changeName({ formdata, id })
    }
  }, [changeModuleName])

  return (
    <>
      <div className={stylesModules.headerText}>
        <span className={styles.redactorCourse_leftSide_desc_title + ' ' + stylesModules.test}>{changeModuleName} </span>

        <input
          type="text"
          value={changeModuleName}
          onChange={handleChangeModuleName}
          className={styles.redactorCourse_leftSide_desc_title + ' ' + stylesModules.block}
        />
        <button className={stylesModules.btn_delete_module} onClick={handleDeleteModule}>
          <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deleteIconPath} />
        </button>
      </div>
      {lessonsList &&
        lessonsList.map(({ name, lesson_id }: any) => <LessonsBlock setLessonId={setLessonId} key={lesson_id} id={lesson_id} lessonsName={name} />)}
      <button className={styles.btn} onClick={handleOpenModalLesson}>
        + Занятие
      </button>
    </>
  )
}
