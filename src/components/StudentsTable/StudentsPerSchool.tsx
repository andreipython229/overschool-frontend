import {FC} from 'react'

import { StudentsTableWrapper } from 'components/StudentsTableWrapper'
import { studentsTableInfoT } from 'types/courseStatT'
import { useFetchStudentsPerSchoolQuery } from 'api/courseStat'

export const StudentsPerSchool: FC = () => {
  const { data, isLoading } = useFetchStudentsPerSchoolQuery()

  return <StudentsTableWrapper students={data as studentsTableInfoT} isLoading={isLoading} />
}
