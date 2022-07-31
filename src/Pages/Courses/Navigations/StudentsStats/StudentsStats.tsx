import React, { ChangeEvent, useState } from 'react';
import { Previous } from 'Pages/Courses/Previous/Previous';
import styles from './studentsStats.module.scss';
import { StatisticHeader } from 'Pages/Courses/Navigations/StudentsStats/common/StatisticHeader';
import { StudentInfoGraphic } from 'Pages/Courses/Navigations/StudentsStats/common/StudentInfoGraphic';
import { StudentGroup } from 'Pages/Courses/Navigations/StudentsStats/common/StudentsGroup';
import { StudentInfoTable } from 'Pages/Courses/Navigations/StudentsStats/common/StudentInfoTable/StudentsInfoTable';
import { AddStudentModal } from 'components/Modal/StudentLogs/AddStudentModal/AddStudentModal';
import { CreateGroupModal } from 'components/Modal/StudentLogs/CreateGroupModal/CreateGroupModal';

export const StudentsStats = () => {
  const [studentModal, setStudentModal] = useState<boolean>(false);
  const [addGroupModal, setAddGroupModal] = useState<boolean>(false);
  const [studentEmail, setStudentEmail] = useState<string>('');
  const [nameGroup, setNameGroup] = useState<string>('');

  const onChangeStudentEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setStudentEmail(e.currentTarget.value);
  };

  const showStudentModal = () => {
    setStudentModal(!studentModal);
  };

  const showGroupModal = () => {
    setAddGroupModal(!addGroupModal);
  };

  const addNameGroup = (e: ChangeEvent<HTMLInputElement>) => {
    setNameGroup(e.currentTarget.value);
  };
  return (
    <div>
      {studentModal && (
        <AddStudentModal
          closeModal={showStudentModal}
          studentEmail={studentEmail}
          onChangeEmail={onChangeStudentEmail}
        />
      )}
      {addGroupModal && (
        <CreateGroupModal
          closeModal={showGroupModal}
          nameGroup={nameGroup}
          addNameGroup={addNameGroup}
        />
      )}
      <Previous avatar={''} name={'No name'} />
      <section className={styles.statistics}>
        <StatisticHeader />
        <div className={styles.statistics_new_student_wrapper}>
          <StudentInfoGraphic />
          <div className={styles.statistics_new_student_wrapper_new_students}>
            <h4 className={styles.statistics_new_student_wrapper_new_students_title}>
              Новых учеников
            </h4>
            <p className={styles.statistics_new_student_wrapper_new_students_amount}>463</p>
            <div className={styles.statistics_new_student_wrapper_new_students_graph}>
              <svg
                width="212"
                height="28"
                viewBox="0 0 212 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 14H15.5L21.5 7.5L30.5 14L50 15L64.5 6L72 15H114L120 1.5L129 9L134.5 10L141 14L148 1.5L155 6L165 3.5L169 0L171.5 3.5H176L182.5 12H190.5L197 15H204.5L212 7.5V28H0L1.5 14Z"
                  fill="url(#paint0_linear_283_4115)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_283_4115"
                    x1="106"
                    y1="7"
                    x2="106"
                    y2="28"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#B6B6B6" />
                    <stop offset="1" stopColor="#B6B6B6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className={styles.statistics_new_student_wrapper_new_students_info_wrapper}>
              <p className={styles.statistics_new_student_wrapper_new_students_info_wrapper_info}>
                Предыдущий период (31 день)
              </p>
            </div>
            <div className={styles.statistics_new_student_wrapper_new_students_info_btn}>i</div>
          </div>
        </div>
      </section>
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
          <StudentGroup title={'Сотрудники'} countStudent={'2 ученика'} />
          <StudentGroup title={'Группа Валерия Б..'} countStudent={'51 ученик'} />
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
      <section className={styles.all_students}>
        <h4 className={styles.all_students_title}>Все ученики курса</h4>
        <div className={styles.all_students_control_panel}>
          <div className={styles.all_students_control_panel_filter_btn}>
            <svg
              width="15"
              height="17"
              viewBox="0 0 15 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.41795 9.99808C9.30844 10.1623 9.25 10.3554 9.25 10.5528V14.882C9.25 15.2607 9.036 15.607 8.69721 15.7764L7.19721 16.5264C6.53231 16.8588 5.75 16.3753 5.75 15.632V10.5528C5.75 10.3554 5.69156 10.1623 5.58205 9.99808L0.66795 2.62692C0.558438 2.46266 0.5 2.26965 0.5 2.07222V1.625C0.5 1.07272 0.947715 0.625 1.5 0.625H13.5C14.0523 0.625 14.5 1.07272 14.5 1.625V2.07222C14.5 2.26965 14.4416 2.46266 14.3321 2.62692L9.41795 9.99808ZM4.47202 2.375C3.67332 2.375 3.19693 3.26515 3.63997 3.9297L6.66795 8.47167C7.06377 9.06541 7.93623 9.06541 8.33205 8.47167L11.36 3.9297C11.8031 3.26515 11.3267 2.375 10.528 2.375H4.47202Z"
                fill="#D1D5DB"
              />
            </svg>
            Добавить фильтры
          </div>
          <input
            type="text"
            className={styles.all_students_control_panel_search_panel}
            placeholder="Поиск по ученикам"
          />
          <div className={styles.all_students_control_panel_search_btn}>
            <svg
              width="13"
              height="18"
              viewBox="0 0 13 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.95801 13.3076C5.95801 13.8599 6.40572 14.3076 6.95801 14.3076C7.51029 14.3076 7.95801 13.8599 7.95801 13.3076H5.95801ZM7.95801 1.22168C7.95801 0.669395 7.51029 0.22168 6.95801 0.22168C6.40572 0.22168 5.95801 0.669395 5.95801 1.22168L7.95801 1.22168ZM6.95801 14.0186L6.2509 14.7257C6.64143 15.1162 7.27459 15.1162 7.66511 14.7257L6.95801 14.0186ZM2.68855 8.33489C2.29803 7.94436 1.66486 7.94436 1.27434 8.33489C0.883814 8.72541 0.883814 9.35857 1.27434 9.7491L2.68855 8.33489ZM12.6417 9.7491C13.0322 9.35857 13.0322 8.72541 12.6417 8.33489C12.2512 7.94436 11.618 7.94436 11.2275 8.33489L12.6417 9.7491ZM1.98145 15.8623C1.42916 15.8623 0.981445 16.31 0.981445 16.8623C0.981445 17.4146 1.42916 17.8623 1.98145 17.8623V15.8623ZM11.9346 17.8623C12.4869 17.8623 12.9346 17.4146 12.9346 16.8623C12.9346 16.31 12.4869 15.8623 11.9346 15.8623V17.8623ZM7.95801 13.3076L7.95801 1.22168L5.95801 1.22168L5.95801 13.3076H7.95801ZM7.66511 13.3114L2.68855 8.33489L1.27434 9.7491L6.2509 14.7257L7.66511 13.3114ZM7.66511 14.7257L12.6417 9.7491L11.2275 8.33489L6.2509 13.3114L7.66511 14.7257ZM1.98145 17.8623H11.9346V15.8623H1.98145V17.8623Z"
                fill="#BA75FF"
              />
            </svg>
          </div>
          <div
            onClick={showStudentModal}
            className={styles.all_students_control_panel_add_students_btn}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.5 2C4.84315 2 3.5 3.34315 3.5 5C3.5 6.65685 4.84315 8 6.5 8C8.15685 8 9.5 6.65685 9.5 5C9.5 3.34315 8.15685 2 6.5 2ZM2 5C2 2.51472 4.01472 0.5 6.5 0.5C8.98528 0.5 11 2.51472 11 5C11 7.48528 8.98528 9.5 6.5 9.5C4.01472 9.5 2 7.48528 2 5ZM13.25 7.25C13.6642 7.25 14 7.58579 14 8V8.75H14.75C15.1642 8.75 15.5 9.08579 15.5 9.5C15.5 9.91421 15.1642 10.25 14.75 10.25H14V11C14 11.4142 13.6642 11.75 13.25 11.75C12.8358 11.75 12.5 11.4142 12.5 11V10.25H11.75C11.3358 10.25 11 9.91421 11 9.5C11 9.08579 11.3358 8.75 11.75 8.75H12.5V8C12.5 7.58579 12.8358 7.25 13.25 7.25ZM3.875 12.5C2.93041 12.5 2 13.4102 2 14.75C2 15.1642 1.66421 15.5 1.25 15.5C0.835786 15.5 0.5 15.1642 0.5 14.75C0.5 12.7761 1.9201 11 3.875 11H9.125C11.0799 11 12.5 12.7761 12.5 14.75C12.5 15.1642 12.1642 15.5 11.75 15.5C11.3358 15.5 11 15.1642 11 14.75C11 13.4102 10.0696 12.5 9.125 12.5H3.875Z"
                fill="#C0B3F9"
              />
            </svg>
            Добавить учеников
          </div>
        </div>
      </section>
      <StudentInfoTable />
    </div>
  );
};
