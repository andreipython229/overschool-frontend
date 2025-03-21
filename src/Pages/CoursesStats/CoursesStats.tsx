import { FC, useCallback, useState } from 'react'

import { SearchCoursesBlock } from './SearchCoursesBlock'
import { StudentsPerSchool } from 'components/StudentsTable/StudentsPerSchool'
import { useFetchStudentsGroupQuery } from 'api/studentsGroupService'
import { studentsGroupsT } from 'types/studentsGroup'
import { useFetchCoursesQuery } from '../../api/coursesServices'
import { CoursesDataT } from '../../types/CoursesT'

import { motion } from 'framer-motion'
import styles from '../School/StudentsStats/studentsStats.module.scss'
import { useAppSelector } from 'store/hooks'
import { schoolSelector } from 'selectors'

export const CoursesStats: FC = () => {
  const [hideStats, setHideStats] = useState<boolean>(true)
  const { schoolName } = useAppSelector(schoolSelector)
  const { data } = useFetchStudentsGroupQuery(schoolName)
  const { data: courses } = useFetchCoursesQuery({ schoolName, page: 1 })

  const handleHideStats = useCallback(() => {
    setHideStats(!hideStats)
  }, [hideStats])

  return (
    <motion.div
      initial={{
        x: -900,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        delay: 0.1,
        ease: 'easeInOut',
        duration: 0.5,
      }}
      layout
    >
      <SearchCoursesBlock courses={courses?.results as CoursesDataT[]} groups={data?.results as studentsGroupsT[]} />
      <StudentsPerSchool />
    </motion.div>
  )
}
