import { FC } from 'react'
import { CheckboxBall } from '../../../../../../components/common/CheckboxBall'
import { IconSvg } from '../../../../../../components/common/IconSvg/IconSvg'
import { useAppDispatch } from '../../../../../../store/hooks'
import { showModal } from 'store/redux/modal/slice'
import { AddPost } from 'components/AddPost'
import { settingsIconPath, deleteIconPath, paperClipIconPath } from '../../../../config/svgIconsPath'

import styles from './constructor.module.scss'

type ClassesSettingsPropsT = {
  showSettingsClassesModal: () => void
}

export const ClassesSettings: FC<ClassesSettingsPropsT> = ({ showSettingsClassesModal }) => {
  const dispatch = useAppDispatch()

  const showSettingsModal = () => {
    showSettingsClassesModal()
    dispatch(showModal(true))
  }

  return (
    <div className={styles.redactorCourse_rightSide}>
      <div className={styles.redactorCourse_rightSide_header}>
        <span className={styles.redactorCourse_rightSide_title}>Первый урок</span>
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
