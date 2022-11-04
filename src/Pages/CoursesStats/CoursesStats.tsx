import { useCallback, useState } from 'react'

import { StatisticHeader } from '../../components/StatisticHeader/StatisticHeader'
import { StudentInfoGraphic } from '../Courses/StudentsStats/StudentInfoGraphic'
import { SearchCoursesBlock } from './SearchCoursesBlock'
import { AllStudentsBlock } from 'components/AllStudentsBlock'
import { StudentsTableBlock } from 'components/StudentsTableBlock'
import { SettingStudentTable } from 'components/Modal/SettingStudentTable'
//import { settingsItemsList } from './config/settingsItemList'
import { IconSvg } from '../../components/common/IconSvg/IconSvg'
import { studentsScatterPath } from './config/svgIconPath'
import { useFetchStudentsGroupQuery } from 'api/studentsGroupService'
import { studentsGroupsT } from 'types/studentsGroup'
import { useFetchCoursesQuery } from '../../api/coursesServices'
import { CoursesDataT } from '../../types/CoursesT'
import { useBoolean } from '../../customHooks'
import { Portal } from '../../components/Modal/Portal'

import styles from '../Courses/StudentsStats/studentsStats.module.scss'

export const CoursesStats = () => {
  const [hideStats, setHideStats] = useState<boolean>(true)
  // const [settingList, setSettingsList] = useState<SettingItemT[]>(settingsItemsList)
  const [toggleSettingModal, { off: offToggleSettingModal, on: onToggleSettingModal }] = useBoolean()

  const { data } = useFetchStudentsGroupQuery()
  const { data: courses } = useFetchCoursesQuery()

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
                <p className={styles.statistics_new_student_wrapper_new_students_title}>Новых учеников</p>
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
            </>
          )}
        </div>
      </section>
      <SearchCoursesBlock courses={courses?.results as CoursesDataT[]} groups={data?.results as studentsGroupsT[]} />
      <AllStudentsBlock headerText={'Все ученики'} />
      <StudentsTableBlock setShowModal={offToggleSettingModal} />
      {toggleSettingModal && (
        <Portal closeModal={onToggleSettingModal}>
          <SettingStudentTable setShowModal={onToggleSettingModal} />
        </Portal>
      )}
    </div>
  )
}
