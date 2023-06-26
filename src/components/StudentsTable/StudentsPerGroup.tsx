import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { useFetchStudentsPerGroupQuery } from '../../api/courseStat'
import { StudentsTableWrapper } from 'components/StudentsTableWrapper'
import { studentsTableInfoT } from 'types/courseStatT'

export const StudentsPerGroup: FC = () => {
  const { group_id } = useParams()

  const { data, isLoading } = useFetchStudentsPerGroupQuery(group_id as string)

  return <StudentsTableWrapper students={data as studentsTableInfoT} isLoading={isLoading} />
}
