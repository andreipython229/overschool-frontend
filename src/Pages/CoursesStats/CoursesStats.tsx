import { useCallback, useState } from 'react'

import { SearchCoursesBlock } from './SearchCoursesBlock'
import { StudentsPerSchool } from 'components/StudentsTable/StudentsPerSchool'
import { useFetchStudentsGroupQuery } from 'api/studentsGroupService'
import { studentsGroupsT } from 'types/studentsGroup'
import { useFetchCoursesQuery } from '../../api/coursesServices'
import { CoursesDataT } from '../../types/CoursesT'

import styles from '../School/StudentsStats/studentsStats.module.scss'


export const CoursesStats = () => {
  const [hideStats, setHideStats] = useState<boolean>(true)
  const schoolName = window.location.href.split('/')[4]

  const { data } = useFetchStudentsGroupQuery(schoolName)
  const { data: courses } = useFetchCoursesQuery(schoolName)

  const handleHideStats = useCallback(() => {
    setHideStats(!hideStats)
  }, [hideStats])

  return (
    <div>
      <SearchCoursesBlock courses={courses?.results as CoursesDataT[]} groups={data?.results as studentsGroupsT[]} />
      <StudentsPerSchool />
    </div>
  )
}
