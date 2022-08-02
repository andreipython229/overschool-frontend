import React from 'react'
import { CheckSelect } from 'components/common/CheckSelect/CheckSelect'
import styles from '../../studentsLog.module.scss'
import { CheckSelectChildren } from 'components/common/CheckSelect/CheckSelectChildren/CheckSelectChildren'

export const AccessToClasses = () => {
  return (
    <div className={styles.groupSetting_access}>
      <div className={styles.groupSetting_access_about}>
        <span>Включено 236 из 236 занятий</span>
        <div className={styles.groupSetting_access_about_setClassesDate}>
          <span>Установить расписание</span>
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.32812 10.8906H10.8906V15.9688M1.90625 7.375H19.0938M14.4062 4.25V1.125M6.59375 4.25V1.125M3.46875 19.875H17.5312C18.3942 19.875 19.0938 19.1754 19.0938 18.3125V4.25C19.0938 3.38706 18.3942 2.6875 17.5312 2.6875H3.46875C2.60581 2.6875 1.90625 3.38705 1.90625 4.25V18.3125C1.90625 19.1754 2.6058 19.875 3.46875 19.875Z"
              stroke="#A097A9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div>
        <CheckSelect text={'Тестирование на уровень владения английским языком'}>
          <CheckSelectChildren text={'Урок 1.Название букв английского алфавит...'} />
        </CheckSelect>
        <CheckSelect text={'Фонетика'} />
      </div>
    </div>
  )
}
