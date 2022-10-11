import { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import { CheckboxBall } from 'components/common/CheckboxBall'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { AddPost } from 'components/AddPost'
import { settingsIconPath, deleteIconPath, paperClipIconPath } from '../../../../config/svgIconsPath'
import { useDeleteLessonsMutation, useFetchLessonQuery, usePatchLessonsMutation } from 'api/modulesServices'
import { ClassesSettingsPropsT } from '../../../navigationTypes'
import { ILesson } from '../../../../../../types/sectionT'
import { patchData } from 'utils/patchData'
import { useBoolean } from 'customHooks/useBoolean'

import styles from './constructor.module.scss'

export const LessonSettings: FC<ClassesSettingsPropsT> = memo(({ lessonIdAndType, setType }) => {
  const [isToggle, { onToggle }] = useBoolean()

  const { data } = useFetchLessonQuery({ id: +lessonIdAndType.id, type: lessonIdAndType.type })

  const [addFile] = usePatchLessonsMutation()
  const [deleteLesson] = useDeleteLessonsMutation()

  const [lesson, setLesson] = useState<ILesson>(data)

  useEffect(() => {
    setLesson(data)
  }, [data])

  const showSettingsModal = () => {
    setType('setting' as keyof object)
  }

  const handleDeleteLesson = async () => {
    if ('id' in lessonIdAndType) {
      await deleteLesson({ id: lessonIdAndType.id, type: lessonIdAndType.type })
    }
  }

  const handleUploadFile = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      const files = event.target.files

      patchData(lesson, `${lessonIdAndType.type}_id`, 'file', files[0], addFile, lessonIdAndType.type)
    }
  }

  return (
    <div className={styles.redactorCourse_rightSide}>
      <div className={styles.redactorCourse_rightSide_header}>
        <span className={styles.redactorCourse_rightSide_title}>{lesson && 'name' in lesson && lesson.name}</span>
        <div className={styles.redactorCourse_rightSide_header_btnBlock}>
          <button onClick={showSettingsModal} className={styles.redactorCourse_rightSide_header_btnBlock_setting}>
            <IconSvg width={16} height={16} viewBoxSize="0 0 16 16" path={settingsIconPath} />
            Настройки
          </button>
          <button className={styles.redactorCourse_rightSide_header_btnBlock_delete}>
            <IconSvg functionOnClick={handleDeleteLesson} width={19} height={19} viewBoxSize="0 0 19 19" path={deleteIconPath} />
          </button>
        </div>
      </div>
      <div className={styles.redactorCourse_rightSide_functional}>
        <div className={styles.redactorCourse_rightSide_functional_content}>
          <span className={styles.redactorCourse_rightSide_title}>Содержание занятия</span>
          <div>
            <span className={styles.redactorCourse_rightSide_functional_content_preview}>Предпросмотр</span>
            <CheckboxBall isChecked={isToggle} toggleChecked={onToggle} />
          </div>
        </div>

        <AddPost lessonIdAndType={lessonIdAndType} lesson={lesson} isPreview={isToggle} />

        <form acceptCharset="utf-8" className={styles.redactorCourse_rightSide_functional_form}>
          <span className={styles.redactorCourse_rightSide_functional_form_title}>Прикреплённые файлы</span>
          <label className={styles.redactorCourse_rightSide_functional_form_addFiles}>
            <IconSvg width={22} height={18} viewBoxSize="0 0 20 18" path={paperClipIconPath} />
            <input onChange={handleUploadFile} type="file" />
            Прикрепить файлы
          </label>
          <span className={styles.redactorCourse_rightSide_desc}>Любые файлы размером не более 2 мегабайт</span>
        </form>
      </div>
    </div>
  )
})
