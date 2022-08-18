import React, { FC, memo } from 'react'
import styles from 'Pages/Courses/Navigations/StudentsStats/studentsStats.module.scss'
type StudentPropsT = {
  avatar?: string
  name: string
  email: string
  balls?: string
  progress: string
  date: string
  commentary?: string
}
export const Student: FC<StudentPropsT> = memo(
  ({ avatar, name, email, balls, progress, date, commentary }) => {
    return (
      <div className={styles.student_info_table_contents_wrapper_content}>
        <input type="checkbox" />
        <div className={styles.student_info_table_contents_wrapper_content_student}>
          <div className={styles.student_info_table_contents_wrapper_content_student_avatar}>
            <img src={avatar} alt="" />
          </div>
          <p className={styles.student_info_table_contents_wrapper_content_student_name}>{name}</p>
        </div>
        <div className={styles.student_info_table_contents_wrapper_content_student_email}>
          {email}
        </div>
        <div className={styles.student_info_table_contents_wrapper_content_student_score}>
          <svg
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.74452 1.80407C7.84505 1.58614 8.15478 1.58614 8.25531 1.80407L9.9971 5.58028C10.0381 5.6691 10.1222 5.73026 10.2194 5.74177L14.349 6.23141C14.5873 6.25967 14.6831 6.55424 14.5068 6.71719L11.4537 9.54065C11.3819 9.60706 11.3497 9.70601 11.3688 9.80195L12.1793 13.8808C12.226 14.1162 11.9755 14.2982 11.766 14.181L8.13729 12.1498C8.05194 12.102 7.94789 12.102 7.86254 12.1498L4.2338 14.181C4.02438 14.2982 3.77379 14.1162 3.82057 13.8808L4.63102 9.80195C4.65009 9.70601 4.61793 9.60706 4.54612 9.54065L1.49298 6.71719C1.31678 6.55424 1.41249 6.25967 1.65082 6.23141L5.78045 5.74177C5.87758 5.73026 5.96176 5.6691 6.00273 5.58028L7.74452 1.80407Z"
              fill="#FFDFB0"
              stroke="#FFC671"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {balls}
        </div>
        <div className={styles.student_info_table_contents_wrapper_content_student_progress}>
          <svg
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="3" cy="3" r="3" fill="#C7BCE9" />
          </svg>
          {progress}
        </div>
        <div className={styles.student_info_table_contents_wrapper_content_student_activity}>
          {date}
        </div>
        <div className={styles.student_info_table_contents_wrapper_content_student_activity}>
          {commentary}
        </div>
      </div>
    )
  },
)
