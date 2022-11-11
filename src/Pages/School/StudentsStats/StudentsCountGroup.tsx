import { FC, memo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Path } from 'enum/pathE'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { settingsBtnIconPath, studentIconPath } from '../config/svgIconsPath'
import { SettingsGroupModal } from 'components/Modal/StudentLogs/SettingsGroupModal/SettingsGroupModal'
import { getNounDeclension } from 'utils/getNounDeclension'
import { useBoolean } from 'customHooks/useBoolean'
import { Portal } from 'components/Modal/Portal/index'

import styles from 'Pages/School/StudentsStats/studentsStats.module.scss'

type StudentsGroupPropsT = {
  title: string
  countStudent: number
  id: number
}

export const StudentGroup: FC<StudentsGroupPropsT> = memo(({ title, countStudent, id }) => {
  const [isModalOpen, { on: close, off: open }] = useBoolean()
  const navigate = useNavigate()

  return (
    <>
      {isModalOpen && (
        <Portal closeModal={close}>
          <SettingsGroupModal closeModal={close} name={title} groupId={id} />
        </Portal>
      )}
      <div className={styles.students_group_content_wrapper_info} onClick={() => navigate(`${Path.InitialPage}${Path.Courses}group/${id}`)}>
        <IconSvg
          width={18}
          height={18}
          viewBoxSize={'0 0 18 18'}
          path={settingsBtnIconPath}
          className={styles.students_group_content_wrapper_info_students_icon}
        />
        <div className={styles.students_group_content_wrapper_info_info_wrapper}>
          <span className={styles.students_group_content_wrapper_info_info_wrapper_name}>{title}</span>
          <div className={styles.students_group_content_wrapper_info_info_wrapper_amount_wrapper}>
            <IconSvg width={4} height={4} viewBoxSize={'0 0 4 4'}>
              <circle cx="2" cy="2" r="2" fill="#BA75FF" />
            </IconSvg>
            {countStudent} {getNounDeclension(countStudent, ['ученик', 'ученика', 'учеников'])}
          </div>
        </div>
        <div
          onClick={e => {
            e.stopPropagation()
            open()
          }}
          className={styles.students_group_content_wrapper_info_setings_btn}
        >
          <IconSvg width={24} height={24} viewBoxSize={'0 0 24 24'} path={studentIconPath} />
        </div>
      </div>
    </>
  )
})
