import React, { FC, memo } from 'react'
import styles from 'Pages/Courses/Navigations/StudentsStats/studentsStats.module.scss'

export const StatisticHeader: FC = memo(() => {
  return (
    <div className={styles.statistics_header}>
      <svg
        className={styles.statistics_header_icon}
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.625 2.625H18.375C18.6071 2.625 18.8296 2.71719 18.9937 2.88128C19.1578 3.04538 19.25 3.26794 19.25 3.5V17.5C19.25 17.7321 19.1578 17.9546 18.9937 18.1187C18.8296 18.2828 18.6071 18.375 18.375 18.375H2.625C2.39294 18.375 2.17038 18.2828 2.00628 18.1187C1.84219 17.9546 1.75 17.7321 1.75 17.5V3.5C1.75 3.26794 1.84219 3.04538 2.00628 2.88128C2.17038 2.71719 2.39294 2.625 2.625 2.625ZM3.5 4.375V16.625H17.5V4.375H3.5ZM6.125 11.375H7.875V14.875H6.125V11.375ZM9.625 6.125H11.375V14.875H9.625V6.125ZM13.125 8.75H14.875V14.875H13.125V8.75Z"
          fill="#BA75FF"
        />
      </svg>

      <div className={styles.statistics_header_info_wrapper}>
        <span>Статистика по выбранным ученикам</span>
        <span>
          Выберите нужных учеников в списке или посмотрите статистику по всем участникам сегмента
        </span>
      </div>
      <div className={styles.statistics_header_btn_collapse}>Свернуть</div>
    </div>
  )
})
