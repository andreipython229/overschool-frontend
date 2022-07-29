import React, { FC, useState } from 'react';
import styles from 'Pages/Courses/Navigations/CoursesCreating/RedactorCourse/Constructor/constructor.module.scss';
import Lesson from 'assets/img/createCourse/lesson.svg';
import { Button } from 'components/common/Button/Button';

type LessonAddBlockPropsT = {
  setModalTypeClasses: () => void;
  toggleModalModule: () => void;
};

export const LessonAddBlock: FC<LessonAddBlockPropsT> = ({
  setModalTypeClasses,
  toggleModalModule,
}) => {
  return (
    <div className={styles.redactorCourse_leftSide}>
      <h5 className={styles.redactorCourse_leftSide_title}>Структура курса</h5>
      <div className={styles.redactorCourse_leftSide_desc}>
        <span className={styles.redactorCourse_leftSide_desc_title}>Первый модуль</span>
        <span className={styles.redactorCourse_leftSide_desc_lesson}>
          <img src={Lesson} alt="Lessons" />
          Первый урок
        </span>
        <button className={styles.btn} onClick={setModalTypeClasses}>
          + Занятие
        </button>

        <div className={styles.redactorCourse_leftSide_classes}>
          <div className={styles.redactorCourse_leftSide_classes_settings}>
            <div className={styles.redactorCourse_leftSide_classes_settings_drag}>
              <svg
                width="13"
                height="9"
                viewBox="0 0 13 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.833008 0.958333C0.833008 0.567132 1.15014 0.25 1.54134 0.25H11.458C11.8492 0.25 12.1663 0.567132 12.1663 0.958333C12.1663 1.34953 11.8492 1.66667 11.458 1.66667H1.54134C1.15014 1.66667 0.833008 1.34953 0.833008 0.958333ZM0.833008 4.5C0.833008 4.1088 1.15014 3.79167 1.54134 3.79167H11.458C11.8492 3.79167 12.1663 4.1088 12.1663 4.5C12.1663 4.8912 11.8492 5.20833 11.458 5.20833H1.54134C1.15014 5.20833 0.833008 4.8912 0.833008 4.5ZM0.833008 8.04167C0.833008 7.65046 1.15014 7.33333 1.54134 7.33333H11.458C11.8492 7.33333 12.1663 7.65046 12.1663 8.04167C12.1663 8.43287 11.8492 8.75 11.458 8.75H1.54134C1.15014 8.75 0.833008 8.43287 0.833008 8.04167Z"
                  fill="#C1C1C1"
                />
              </svg>
              Тест
            </div>
            <div className={styles.redactorCourse_leftSide_classes_settings_panel}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.5408 0.62397C9.81742 0.347349 10.2659 0.347349 10.5425 0.62397L13.3759 3.4573C13.6525 3.73392 13.6525 4.18242 13.3759 4.45904L4.16753 13.6674C4.0347 13.8002 3.85453 13.8748 3.66667 13.8748H0.833333C0.442132 13.8748 0.125 13.5577 0.125 13.1665V10.3332C0.125 10.1453 0.199628 9.96514 0.332466 9.8323L7.41565 2.74912L9.5408 0.62397ZM7.91667 4.25157L1.54167 10.6266V12.4582H3.37326L9.74826 6.08317L7.91667 4.25157ZM10.75 5.08144L11.8733 3.95817L10.0417 2.12657L8.9184 3.24984L10.75 5.08144Z"
                  fill="#C1C1C1"
                />
              </svg>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.95866 1.83317C3.95866 1.05077 4.59292 0.416504 5.37533 0.416504H9.62533C10.4077 0.416504 11.042 1.05077 11.042 1.83317V3.24984H12.4513C12.4557 3.2498 12.4601 3.2498 12.4645 3.24984H13.8753C14.2665 3.24984 14.5837 3.56697 14.5837 3.95817C14.5837 4.34937 14.2665 4.6665 13.8753 4.6665H13.1182L12.5038 13.2674C12.4509 14.0088 11.834 14.5832 11.0908 14.5832H3.90987C3.16663 14.5832 2.54976 14.0088 2.4968 13.2674L1.88245 4.6665H1.12533C0.734124 4.6665 0.416992 4.34937 0.416992 3.95817C0.416992 3.56697 0.734124 3.24984 1.12533 3.24984H2.53614C2.54054 3.2498 2.54493 3.2498 2.5493 3.24984H3.95866V1.83317ZM5.37533 3.24984H9.62533V1.83317H5.37533V3.24984ZM3.30273 4.6665L3.90987 13.1665H11.0908L11.6979 4.6665H3.30273ZM6.08366 6.08317C6.47486 6.08317 6.79199 6.4003 6.79199 6.7915V11.0415C6.79199 11.4327 6.47486 11.7498 6.08366 11.7498C5.69246 11.7498 5.37533 11.4327 5.37533 11.0415V6.7915C5.37533 6.4003 5.69246 6.08317 6.08366 6.08317ZM8.91699 6.08317C9.3082 6.08317 9.62533 6.4003 9.62533 6.7915V11.0415C9.62533 11.4327 9.3082 11.7498 8.91699 11.7498C8.52579 11.7498 8.20866 11.4327 8.20866 11.0415V6.7915C8.20866 6.4003 8.52579 6.08317 8.91699 6.08317Z"
                  fill="#C1C1C1"
                />
              </svg>
            </div>
          </div>
          <button className={styles.btn}>+ Занятие</button>
        </div>
        <div className={styles.hl} />
        <Button
          onClick={toggleModalModule}
          style={{ width: '236px' }}
          text={'+ Модуль'}
          variant={'primary'}
        />
      </div>
    </div>
  );
};
