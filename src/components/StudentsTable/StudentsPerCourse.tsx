import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useLazyFetchCourseStatQuery } from '../../api/courseStat'
import { StudentsTableWrapper } from 'components/StudentsTableWrapper'
import { studentsTableInfoT } from 'types/courseStatT'
import { AllStudentsBlock } from 'components/AllStudentsBlock'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { addFilters, removeFilter } from 'store/redux/filters/slice'

export const StudentsPerCourse: FC = () => {
  const { course_id } = useParams()

  const dispatch = useAppDispatch()
  const filters = useAppSelector(state => state.filters['studentsPerCourse'])

  const [fetchStudents, { data, isFetching }] = useLazyFetchCourseStatQuery()

  const handleAddLastActivityFilter = (data1: string, data2: string) => {
    dispatch(addFilters({ key: 'studentsPerCourse', filters: { last_active_min: data1, last_active_max: data2 } }))
  }

  const handleRemoveLastActivityStartFilter = () => {
    dispatch(removeFilter({ key: 'studentsPerCourse', filterName: 'last_activity_min' }))
  }

  const handleRemoveLastActivityEndFilter = () => {
    dispatch(removeFilter({ key: 'studentsPerCourse', filterName: 'last_activity_max' }))
  }

  const handleAddAvgFilter = (start_avg: string, end_avg: string) => {
    dispatch(addFilters({ key: 'studentsPerCourse', filters: { average_mark_min: start_avg, average_mark_max: end_avg } }))
  }

  const handleAddMarkFilter = (start_mark: string, end_mark: string) => {
    dispatch(addFilters({ key: 'studentsPerCourse', filters: { mark_sum_min: start_mark, mark_sum_max: end_mark } }))
  }

  useEffect(() => {
    fetchStudents({ id: course_id, filters })
  }, [filters])

  return (
    <>
      <AllStudentsBlock
        headerText={'Все ученики'}
        addLastActiveFilter={handleAddLastActivityFilter}
        addMarkFilter={handleAddMarkFilter}
        handleAddAvgFilter={handleAddAvgFilter}
        removeLastActiveStartFilter={handleRemoveLastActivityStartFilter}
        removeLastActiveEndFilter={handleRemoveLastActivityEndFilter}
        startMark={filters?.mark_sum_min}
        endMark={filters?.mark_sum_max}
        startDate={filters?.last_active_min}
        endDate={filters?.last_active_max}
        startAvg={filters?.average_mark_min}
        endAvg={filters?.average_mark_max}
        filters={filters}
      />
      <StudentsTableWrapper students={data as studentsTableInfoT} isLoading={isFetching} />
    </>
  )
}
