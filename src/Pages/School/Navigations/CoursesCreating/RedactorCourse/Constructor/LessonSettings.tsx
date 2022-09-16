import { FC, useEffect, useState } from 'react'

import { CheckboxBall } from 'components/common/CheckboxBall'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { useAppDispatch } from 'store/hooks'
import { showModal } from 'store/redux/modal/slice'
import { AddPost } from 'components/AddPost'
import { settingsIconPath, deleteIconPath, paperClipIconPath } from '../../../../config/svgIconsPath'

import styles from './constructor.module.scss'
import { useFetchLessonQuery } from '../../../../../../api/LessonsServices'

type ClassesSettingsPropsT = {
  showSettingsClassesModal: () => void
  modulesList: any
  lessonId: any
}
interface ILesson {
  audio: null | File
  author_id: number | string
  code: null | string
  created_at: string | Date
  description: string
  file: null | File
  lesson_id: number | string
  name: string
  order: null | number
  published: boolean
  section: number | string
  updated_at: string
  video: string
}

export const LessonSettings: FC<ClassesSettingsPropsT> = ({ lessonId, showSettingsClassesModal, modulesList }) => {
  const dispatch = useAppDispatch()
  const [lesson, setLesson] = useState<ILesson>({} as ILesson)

  useEffect(() => {
    if (data) {
      setLesson(data)
    }
  }, [lessonId])

  console.log(lesson)
  const showSettingsModal = () => {
    showSettingsClassesModal()
    dispatch(showModal(true))
  }

  const { data } = useFetchLessonQuery(lessonId ? lessonId : modulesList[0]?.lessons[0]?.lesson_id)

  return (
    <div className={styles.redactorCourse_rightSide}>
      <div className={styles.redactorCourse_rightSide_header}>
        <span className={styles.redactorCourse_rightSide_title}>{data ? lesson?.name : modulesList && modulesList[0]?.lessons[0]?.name}</span>
        <div className={styles.redactorCourse_rightSide_header_btnBlock}>
          <button onClick={showSettingsModal} className={styles.redactorCourse_rightSide_header_btnBlock_setting}>
            <IconSvg width={16} height={16} viewBoxSize="0 0 16 16" path={settingsIconPath} />
            Настройки
          </button>
          <button className={styles.redactorCourse_rightSide_header_btnBlock_delete}>
            <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deleteIconPath} />
          </button>
        </div>
      </div>
      <div className={styles.redactorCourse_rightSide_functional}>
        <div className={styles.redactorCourse_rightSide_functional_content}>
          <span className={styles.redactorCourse_rightSide_title}>Содержание занятия</span>
          <div>
            <span className={styles.redactorCourse_rightSide_functional_content_preview}>Предпросмотр</span>
            <CheckboxBall />
          </div>
        </div>

        <AddPost />

        <div>
          <span className={styles.redactorCourse_rightSide_title}>Прикреплённые файлы</span>
          <button
            style={{ width: '180px', padding: '11px 0 11px 16px', marginTop: '16px' }}
            className={styles.redactorCourse_rightSide_header_btnBlock_setting}
          >
            <IconSvg width={22} height={18} viewBoxSize="0 0 22 18" path={paperClipIconPath} />
            Прикрепить файлы
          </button>
          <span className={styles.redactorCourse_rightSide_desc}>Любые файлы размером не более 2 гигабайта</span>
        </div>
      </div>
    </div>
  )
}
