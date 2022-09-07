import { Student } from '../../School/Navigations/StudentsStats/components/StudentInfoTable/Student'
import { IconSvg } from '../../../components/common/IconSvg/IconSvg'
import { studentNameArrSvg, studentEmailArrUpSvg, studentEmailArrDownSvg, studentSettingsSvg } from '../config/svgIcons'

import styles from '../../School/Navigations/StudentsStats/studentsStats.module.scss'

export const CoursesStudentsBlock = () => {
  return (
    <section className={styles.student_info_table}>
      <div className={styles.student_info_table_header}>
        <input className={styles.student_info_table_header_checkbox} type="checkbox" name="name" />
        <div className={styles.student_info_table_header_name_wrapper}>
          Имя ученика
          <IconSvg width={10} height={13} viewBoxSize={'0 0 10 13'} d={studentNameArrSvg} fill="#BA75FF" />
        </div>
        <div className={styles.student_info_table_header_email_wrapper}>
          Email
          <div className={styles.student_info_table_header_email_wrapper_btn_wrapper}>
            <IconSvg width={8} height={5} viewBoxSize={'0 0 8 5'} d={studentEmailArrUpSvg} fill="#D1D5DB" />
            <IconSvg width={8} height={5} viewBoxSize={'0 0 8 5'} d={studentEmailArrDownSvg} fill="#D1D5DB" />
          </div>
        </div>
        <div className={styles.student_info_table_header_score}>Сумм.балл</div>
        <div className={styles.student_info_table_header_progress}>Прогресс</div>
        <div className={styles.student_info_table_header_activity}>Активность</div>
        <div className={styles.student_info_table_header_comment}>Комментарий</div>
        <div className={styles.student_info_table_header_settings_btn}>
          <IconSvg width={15} height={15} viewBoxSize={'0 0 15 15'} d={studentSettingsSvg} fill="#6B7280" />
        </div>
      </div>
      <div className={styles.student_info_table_contents_wrapper}>
        <Student name={'Без имени'} date={new Date().toTimeString().split('G')[0]} progress={'0%'} email={'pochta@mail.ru'} balls={'0'} />
        <Student name={'Без имени'} date={new Date().toTimeString().split('G')[0]} progress={'0%'} email={'pochta@mail.ru'} balls={'0'} />
        <Student
          name={'Без имени'}
          date={new Date().toTimeString().split('G')[0]}
          progress={'0%'}
          email={'pochta@mail.ru'}
          balls={'0'}
          commentary={'Hello'}
        />
        <Student name={'Без имени'} date={new Date().toTimeString().split('G')[0]} progress={'0%'} email={'pochta@mail.ru'} balls={'0'} />
      </div>
    </section>
  )
}
