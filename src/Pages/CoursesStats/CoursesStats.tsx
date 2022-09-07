import  { useCallback, useState } from 'react'

import { StatisticHeader } from '../../components/StatisticHeader/StatisticHeader'
import { StudentInfoGraphic } from '../School/Navigations/StudentsStats/components/StudentInfoGraphic'
import { SearchCoursesBlock } from './SearchCoursesBlock'
import { AllStudentsBlock } from '../../components/AllStudentsBlock'
import { StudentsTableBlock } from '../../components/StudentsTableBlock'
import { SettingStudentTable } from '../../components/Modal/SettingStudentTable'

import styles from '../School/Navigations/StudentsStats/studentsStats.module.scss'

const settingsItemsList = [
  { id: 1, order: 1, name: 'Имя', checked: true },
  { id: 2, order: 2, name: 'Email', checked: true },
  { id: 3, order: 3, name: 'Суммарный балл', checked: true },
  { id: 4, order: 4, name: 'Курс', checked: true },
  { id: 5, order: 5, name: 'Последняя активность', checked: true },
  { id: 6, order: 6, name: 'Прогресс', checked: true },
  { id: 7, order: 7, name: 'Комментарий', checked: true },
  { id: 8, order: 8, name: 'Группа', checked: false },
  { id: 9, order: 9, name: 'Средний балл', checked: false },
  { id: 10, order: 10, name: 'Дата обновления', checked: false },
  { id: 11, order: 11, name: 'Дата заверения', checked: false },
]
export type SettingItemT = {
  id: number
  order: number
  name: string
  checked: boolean
}

export const CoursesStats = () => {
  const [hideStats, setHideStats] = useState<boolean>(true)
  const [settingList, setSettingsList] = useState(settingsItemsList)
  const [toggleSettingModal, setToggleSettingModal] = useState<boolean>(false)

  const handleHideStats = useCallback(() => {
    setHideStats(!hideStats)
  }, [hideStats])

  return (
    <div>
      <section className={styles.statistics}>
        <StatisticHeader handleHideStats={handleHideStats} hideStats={hideStats} />
        <div className={styles.statistics_new_student_wrapper}>
          {hideStats && (
            <>
              <StudentInfoGraphic />
              <div className={styles.statistics_new_student_wrapper_new_students}>
                <h4 className={styles.statistics_new_student_wrapper_new_students_title}>Новых учеников</h4>
                <p className={styles.statistics_new_student_wrapper_new_students_amount}>463</p>
                <div className={styles.statistics_new_student_wrapper_new_students_graph}>
                  <svg width="212" height="28" viewBox="0 0 212 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1.5 14H15.5L21.5 7.5L30.5 14L50 15L64.5 6L72 15H114L120 1.5L129 9L134.5 10L141 14L148 1.5L155 6L165 3.5L169 0L171.5 3.5H176L182.5 12H190.5L197 15H204.5L212 7.5V28H0L1.5 14Z"
                      fill="url(#paint0_linear_283_4115)"
                    />
                    <defs>
                      <linearGradient id="paint0_linear_283_4115" x1="106" y1="7" x2="106" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#B6B6B6" />
                        <stop offset="1" stopColor="#B6B6B6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className={styles.statistics_new_student_wrapper_new_students_info_wrapper}>
                  <p className={styles.statistics_new_student_wrapper_new_students_info_wrapper_info}>Предыдущий период (31 день)</p>
                </div>
                <div className={styles.statistics_new_student_wrapper_new_students_info_btn}> </div>
              </div>
            </>
          )}
        </div>
      </section>
      <SearchCoursesBlock />
      <AllStudentsBlock headerText={'Все ученики школы'} />
      <StudentsTableBlock settingList={settingList} setToggleSettingModal={setToggleSettingModal} />
      {toggleSettingModal && <SettingStudentTable setShowModal={setToggleSettingModal} settingList={settingList} setSettingsList={setSettingsList} />}
    </div>
  )
}
