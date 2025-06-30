import { FC, memo, useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'

import { Path } from 'enum/pathE'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { settingsBtnIconPath, studentIconPath } from '../config/svgIconsPath'
import { SettingsGroupModal } from 'components/Modal/StudentLogs/SettingsGroupModal/SettingsGroupModal'
import { getNounDeclension } from 'utils/getNounDeclension'
import { useBoolean } from 'customHooks/useBoolean'
import { Portal } from 'components/Modal/Portal/index'
import { useAppSelector } from 'store/hooks'
import { RoleE } from 'enum/roleE'

import styles from './studentsStats.module.scss'
import { schoolSelector } from 'selectors'

export type StudentsGroupPropsT = {
  title: string
  countStudent: number
  id: number
  type?: string
  courseId: number
  click?: (id: number) => void
  active?: boolean
}

export const StudentGroup: FC<StudentsGroupPropsT> = memo(({ title, countStudent, id, type, courseId }) => {
  const [isModalOpen, { on: close, off: open }] = useBoolean()
  const navigate = useNavigate()
  const { schoolName } = useAppSelector(schoolSelector)

  const { role } = useAppSelector(state => state.user)

  return (
    <>
      {isModalOpen && (
        <Portal closeModal={close}>
          <SettingsGroupModal closeModal={close} name={title} groupId={id} courseId={courseId} />
        </Portal>
      )}
      <div
        className={styles.students_group_content_wrapper_info}
        onClick={() =>
          navigate(
            generatePath(Path.School + (role === RoleE.Teacher ? '' : Path.Courses) + `/group/${id}`, {
              school_name: schoolName,
            }),
          )
        }
      >
        <IconSvg
          width={30}
          height={30}
          viewBoxSize={'0 0 18 18'}
          path={settingsBtnIconPath}
          className={styles.students_group_content_wrapper_info_students_icon}
        />
        <div className={styles.students_group_content_wrapper_info_info_wrapper}>
          <span className={styles.students_group_content_wrapper_info_info_wrapper_name}>{title}</span>
          <div className={styles.students_group_content_wrapper_info_info_wrapper_amount_wrapper}>
            <IconSvg width={12} height={12} viewBoxSize={'-1.5 -1.5 7 7'}>
              <circle cx="2" cy="2" r="2" fill="#BA75FF" />
            </IconSvg>
            {countStudent} {getNounDeclension(countStudent, ['ученик', 'ученика', 'учеников'])}
          </div>
          {type === 'WITHOUT_TEACHER' && <span className={styles.students_group_content_wrapper_info_info_wrapper_auto}>автопроверка д/з</span>}
        </div>
        {role === RoleE.Admin && (
          <div
            onClick={e => {
              e.stopPropagation()
              open()
            }}
            className={styles.students_group_content_wrapper_info_setings_btn}
          >
            <IconSvg width={24} height={24} viewBoxSize={'0 0 24 24'} path={studentIconPath} />
          </div>
        )}
      </div>
    </>
  )
})
