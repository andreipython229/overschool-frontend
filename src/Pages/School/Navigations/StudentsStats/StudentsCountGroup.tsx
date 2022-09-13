import { FC } from 'react'

import { IconSvg } from '../../../../components/common/IconSvg/IconSvg'
import { settingsBtnIconPath, studentIconPath } from '../../config/svgIconsPath'

import styles from 'Pages/School/Navigations/StudentsStats/studentsStats.module.scss'

type StudentsGroupPropsT = {
  title: string
  countStudent: string
}

export const StudentGroup: FC<StudentsGroupPropsT> = ({ title, countStudent }) => {
  return (
    <div className={styles.students_group_content_wrapper_info}>
      <IconSvg width={18} height={18} viewBoxSize={'0 0 18 18'} path={settingsBtnIconPath} />
      <div className={styles.students_group_content_wrapper_info_info_wrapper}>
        <span className={styles.students_group_content_wrapper_info_info_wrapper_name}>{title}</span>
        <div className={styles.students_group_content_wrapper_info_info_wrapper_amount_wrapper}>
          <span>
            <IconSvg width={4} height={4} viewBoxSize={'0 0 4 4'}>
              <circle cx="2" cy="2" r="2" fill="#BA75FF" />
            </IconSvg>
            {countStudent}
          </span>
        </div>
      </div>
      <div className={styles.students_group_content_wrapper_info_setings_btn}>
        <IconSvg width={24} height={24} viewBoxSize={'0 0 24 24'} path={studentIconPath} />
      </div>
    </div>
  )
}
