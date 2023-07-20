import { FC, useState, useCallback } from 'react'

import { StatisticHeader } from 'components/StatisticHeader/StatisticHeader'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { studentsScatterPath } from 'Pages/CoursesStats/config/svgIconPath'
import { StudentsPerGroup } from 'components/StudentsTable/StudentsPerGroup'

import styles from '../School/StudentsStats/studentsStats.module.scss'

export const Group: FC = () => {
  const [hideStats, setHideStats] = useState<boolean>(true)

  const handleHideStats = useCallback(() => {
    setHideStats(!hideStats)
  }, [hideStats])

  return (
    <div>
      <StatisticHeader handleHideStats={handleHideStats} hideStats={hideStats} />
      {hideStats && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ flexBasis: '32%' }} className={styles.statistics_new_student_wrapper_new_students}>
            <h4 className={styles.statistics_new_student_wrapper_new_students_title}>Новых учеников</h4>
            <p className={styles.statistics_new_student_wrapper_new_students_amount}>463</p>
            <div className={styles.statistics_new_student_wrapper_new_students_graph}>
              <IconSvg width={212} height={28} viewBoxSize={'0 0 212 28'} path={studentsScatterPath}>
                <defs>
                  <linearGradient id="paint0_linear_283_4115" x1="106" y1="7" x2="106" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#B6B6B6" />
                    <stop offset="1" stopColor="#B6B6B6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </IconSvg>
            </div>
            <div className={styles.statistics_new_student_wrapper_new_students_info_wrapper}>
              <p className={styles.statistics_new_student_wrapper_new_students_info_wrapper_info}>Предыдущий период (31 день)</p>
            </div>
            <div className={styles.statistics_new_student_wrapper_new_students_info_btn}> </div>
          </div>
          <div style={{ flexBasis: '32%' }} className={styles.statistics_new_student_wrapper_new_students}>
            <h4 className={styles.statistics_new_student_wrapper_new_students_title}>Активных учеников</h4>
            <p className={styles.statistics_new_student_wrapper_new_students_amount}>463</p>
            <div className={styles.statistics_new_student_wrapper_new_students_graph}>
              <IconSvg width={212} height={28} viewBoxSize={'0 0 212 28'} path={studentsScatterPath}>
                <defs>
                  <linearGradient id="paint0_linear_283_4115" x1="106" y1="7" x2="106" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#B6B6B6" />
                    <stop offset="1" stopColor="#B6B6B6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </IconSvg>
            </div>
            <div className={styles.statistics_new_student_wrapper_new_students_info_wrapper}>
              <p className={styles.statistics_new_student_wrapper_new_students_info_wrapper_info}>Предыдущий период (31 день)</p>
            </div>
            <div className={styles.statistics_new_student_wrapper_new_students_info_btn}> </div>
          </div>
          <div style={{ flexBasis: '32%' }} className={styles.statistics_new_student_wrapper_new_students}>
            <h4 className={styles.statistics_new_student_wrapper_new_students_title}>Прогресс прохождения курсов</h4>
            <p className={styles.statistics_new_student_wrapper_new_students_amount}>463</p>
            <div className={styles.statistics_new_student_wrapper_new_students_graph}>
              <IconSvg width={212} height={28} viewBoxSize={'0 0 212 28'} path={studentsScatterPath}>
                <defs>
                  <linearGradient id="paint0_linear_283_4115" x1="106" y1="7" x2="106" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#B6B6B6" />
                    <stop offset="1" stopColor="#B6B6B6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </IconSvg>
            </div>
            <div className={styles.statistics_new_student_wrapper_new_students_info_wrapper}>
              <p className={styles.statistics_new_student_wrapper_new_students_info_wrapper_info}>Предыдущий период (31 день)</p>
            </div>
            <div className={styles.statistics_new_student_wrapper_new_students_info_btn} />
          </div>
          <div style={{ flexBasis: '32%' }} className={styles.statistics_new_student_wrapper_new_students}>
            <h4 className={styles.statistics_new_student_wrapper_new_students_title}>Средний балл учеников</h4>
            <p className={styles.statistics_new_student_wrapper_new_students_amount}>463</p>
            <div className={styles.statistics_new_student_wrapper_new_students_graph}>
              <IconSvg width={212} height={28} viewBoxSize={'0 0 212 28'} path={studentsScatterPath}>
                <defs>
                  <linearGradient id="paint0_linear_283_4115" x1="106" y1="7" x2="106" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#B6B6B6" />
                    <stop offset="1" stopColor="#B6B6B6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </IconSvg>
            </div>
            <div className={styles.statistics_new_student_wrapper_new_students_info_wrapper}>
              <p className={styles.statistics_new_student_wrapper_new_students_info_wrapper_info}>Предыдущий период (31 день)</p>
            </div>
            <div className={styles.statistics_new_student_wrapper_new_students_info_btn}> </div>
          </div>
        </div>
      )}
      <StudentsPerGroup />
    </div>
  )
}
