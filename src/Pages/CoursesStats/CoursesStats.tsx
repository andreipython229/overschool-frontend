import { useCallback, useState } from 'react'

import { StatisticHeader } from '../../components/StatisticHeader/StatisticHeader'
import { StudentInfoGraphic } from '../School/StudentsStats/StudentInfoGraphic'
import { SearchCoursesBlock } from './SearchCoursesBlock'
import { AllStudentsBlock } from 'components/AllStudentsBlock'
import { StudentsTableBlock } from 'components/StudentsTableBlock'
import { SettingStudentTable } from 'components/Modal/SettingStudentTable'
import { useFetchStudentsGroupQuery } from 'api/studentsGroupService'
import { studentsGroupsT } from 'types/studentsGroup'
import { useFetchCoursesQuery } from '../../api/coursesServices'
import { CoursesDataT } from '../../types/CoursesT'
import { useBoolean } from '../../customHooks'
import { Portal } from '../../components/Modal/Portal'

import styles from '../School/StudentsStats/studentsStats.module.scss'

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
