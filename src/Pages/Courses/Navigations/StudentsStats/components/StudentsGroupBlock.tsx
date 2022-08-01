import React, { FC } from 'react'
import styles from 'Pages/Courses/Navigations/StudentsStats/studentsStats.module.scss'
import { StudentGroup } from 'Pages/Courses/Navigations/StudentsStats/components/StudentsCountGroup'

type StudentsGroupBlockPropsT = {
  showGroupModal: () => void
}

export const StudentsGroupBlock: FC<StudentsGroupBlockPropsT> = ({ showGroupModal }) => {
  return (
    <section className={styles.students_group}>
      <div className={styles.students_group_header}>
        <h4 className={styles.students_group_header_title}>Группы учеников</h4>
        <div onClick={showGroupModal} className={styles.students_group_header_add_group_btn}>
          <svg
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 7C19.5523 7 20 7.44771 20 8V9H21C21.5523 9 22 9.44771 22 10C22 10.5523 21.5523 11 21 11H20V12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12V11H17C16.4477 11 16 10.5523 16 10C16 9.44771 16.4477 9 17 9H18V8C18 7.44771 18.4477 7 19 7Z"
              fill="#BA75FF"
            />
            <path
              d="M7.5 3C5.84315 3 4.5 4.34315 4.5 6C4.5 7.65685 5.84315 9 7.5 9C9.15685 9 10.5 7.65685 10.5 6C10.5 4.34315 9.15685 3 7.5 3ZM3 6C3 3.51472 5.01472 1.5 7.5 1.5C9.98528 1.5 12 3.51472 12 6C12 8.48528 9.98528 10.5 7.5 10.5C5.01472 10.5 3 8.48528 3 6ZM12.6213 2.81802C12.9142 2.52513 13.3891 2.52513 13.682 2.81802C15.4393 4.57538 15.4393 7.42462 13.682 9.18198C13.3891 9.47487 12.9142 9.47487 12.6213 9.18198C12.3284 8.88909 12.3284 8.41421 12.6213 8.12132C13.7929 6.94975 13.7929 5.05025 12.6213 3.87868C12.3284 3.58579 12.3284 3.11091 12.6213 2.81802ZM13.1474 12.5681C13.2479 12.1663 13.6551 11.9219 14.0569 12.0224C15.0528 12.2714 15.6832 12.9082 16.0458 13.6333C16.3967 14.335 16.5 15.1178 16.5 15.75C16.5 16.1642 16.1642 16.5 15.75 16.5C15.3358 16.5 15 16.1642 15 15.75C15 15.2572 14.9158 14.7275 14.7042 14.3042C14.5043 13.9043 14.1972 13.6036 13.6931 13.4776C13.2913 13.3771 13.0469 12.9699 13.1474 12.5681ZM4.875 13.5C3.93041 13.5 3 14.4102 3 15.75C3 16.1642 2.66421 16.5 2.25 16.5C1.83579 16.5 1.5 16.1642 1.5 15.75C1.5 13.7761 2.9201 12 4.875 12H10.125C12.0799 12 13.5 13.7761 13.5 15.75C13.5 16.1642 13.1642 16.5 12.75 16.5C12.3358 16.5 12 16.1642 12 15.75C12 14.4102 11.0696 13.5 10.125 13.5H4.875Z"
              fill="#BA75FF"
            />
          </svg>
          Создать новую группу
        </div>
      </div>
      <div className={styles.students_group_content_wrapper}>
        <StudentGroup title="Сотрудники" countStudent="2 ученика" />
        <StudentGroup title="Группа Валерия Б.." countStudent="51 ученик" />
        <div className={styles.students_group_content_wrapper_show_all_groups_btn}>
          <svg
            className={styles.students_group_content_wrapper_show_all_groups_btn_icon}
            width="15"
            height="9"
            viewBox="0 0 15 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.25 1.15625L7.5 7.40625L13.75 1.15625"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Показать все группы</span>
        </div>
      </div>
    </section>
  )
}
