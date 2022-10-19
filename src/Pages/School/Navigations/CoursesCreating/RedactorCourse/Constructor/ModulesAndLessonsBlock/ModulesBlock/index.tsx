import { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { deleteIconPath } from '../../../../../../config/svgIconsPath'
import { useDeleteModulesMutation, usePatchModulesMutation } from 'api/modulesServices'
import { formDataConverter } from 'utils/formDataConverter'
import { LessonsBlock } from '../LessonsBlock'
import { ModulesBlockT } from '../../../../../../../../types/navigationTypes'
import { lessonT } from 'types/sectionT'
import { useDebounceFunc } from 'customHooks/useDebounceFunc'
import { getSectionId } from 'store/redux/modules/slice'
import { useAppDispatch } from 'store/hooks'

import styles from '../../constructor.module.scss'
import stylesModules from '../ModulesBlock/modules_block.module.scss'

export const ModulesBlock: FC<ModulesBlockT> = memo(({ setType, setLessonIdAndType, moduleName, lessonsList, id }) => {
  const dispatch = useAppDispatch()

  const [changeModuleName, setChangeModuleName] = useState<string>(moduleName)

  const [changeName] = usePatchModulesMutation()
  const [deleteModule] = useDeleteModulesMutation()

  const handleDeleteModule = async () => {
    await deleteModule(id)
  }

  const handleChangeModuleName = (event: ChangeEvent<HTMLInputElement>) => {
    setChangeModuleName(event.target.value)
  }

  const debounced = useDebounceFunc(changeName, 2000)

  const handleOpenModalLesson = () => {
    dispatch(getSectionId(id))
    setType('lessonsModal' as keyof object)
  }

  useEffect(() => {
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
        </span>

        {lessonsList &&
          lessonsList.map(({ name, id, type }: lessonT) => (
            <LessonsBlock type={type} setLessonIdAndType={setLessonIdAndType} key={id + type} id={id} lessonsName={name} />
          ))}
        <button className={styles.btn} onClick={handleOpenModalLesson}>
          + Занятие
        </button>
      </ul>
    </>
  )
})
