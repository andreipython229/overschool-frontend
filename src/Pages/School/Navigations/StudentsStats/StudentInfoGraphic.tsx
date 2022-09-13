import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { studentInfoScatterIconPath } from '../../config/svgIconsPath'

import styles from 'Pages/School/Navigations/StudentsStats/studentsStats.module.scss'

export const StudentInfoGraphic = () => {
  return (
    <div className={styles.statistics_new_student_wrapper_new_students}>
      <h4 className={styles.statistics_new_student_wrapper_new_students_title}>Новых учеников</h4>
      <p className={styles.statistics_new_student_wrapper_new_students_amount}>1309</p>
      <div className={styles.statistics_new_student_wrapper_new_students_graph}>
        <IconSvg width={212} height={28} viewBoxSize={'0 0 212 28'} path={studentInfoScatterIconPath}>
          <defs>
            <linearGradient id="paint0_linear_283_4112" x1="106" y1="8.5" x2="106" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0.239358" stopColor="#67E1CD" />
              <stop offset="1" stopColor="#67E1CD" stopOpacity="0" />
            </linearGradient>
          </defs>
        </IconSvg>
      </div>
      <div className={styles.statistics_new_student_wrapper_new_students_info_wrapper}>
        <p className={styles.statistics_new_student_wrapper_new_students_info_wrapper_info}>
          <span className={styles.statistics_new_student_wrapper_new_students_info_wrapper_info_amount_time}>+845</span>
          за последний 31 день
        </p>
      </div>
      <div className={styles.statistics_new_student_wrapper_new_students_info_btn}>i</div>
    </div>
  )
}
