import { FC, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useLazyFetchCourseStatQuery } from '../../api/courseStat'
import { StudentsTableWrapper } from 'components/StudentsTableWrapper'
import { studentsTableInfoT } from 'types/courseStatT'
import { AllStudentsBlock } from 'components/AllStudentsBlock'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { addFilters, removeFilter } from 'store/redux/filters/slice'
import { useFetchStudentsTablesHeaderQuery } from 'api/studentTableService'

export const StudentsPerCourse: FC = () => {
  const { course_id } = useParams()
  const schoolName = window.location.href.split('/')[4]

  const dispatch = useAppDispatch()
  const filters = useAppSelector(state => state.filters['studentsPerCourse'])

  const { data: tablesHeader, isFetching: isTablesHeaderFetching, isSuccess } = useFetchStudentsTablesHeaderQuery(schoolName)

  const [tableId, setTableId] = useState<number>()

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

  const handleReloadTable = () => {
    fetchStudents({ id: String(course_id), filters, schoolName })
  }

  useEffect(() => {
    handleReloadTable()
  }, [filters])

  useEffect(() => {
    if (isSuccess) {
      const id = tablesHeader.find(table => table.type === 'Course')?.students_table_info_id
      setTableId(id)
    }
  }, [isTablesHeaderFetching])

  // Поиск по студентам курса
  const [searchTerm, setSearchTerm] = useState('')

  const updateStudents = (value: string) => {
    setSearchTerm(value)
  }

  // Фильтра для студентов курса
  const filteredStudents = useMemo(() => {
    if (!searchTerm) return data ?? []

    return (data ?? []).filter(student => {
      return (
        student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.group_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  }, [searchTerm, data])

  return (
    <>
      <AllStudentsBlock
        invite={true}
        headerText={'Все ученики курса'}
        addLastActiveFilter={handleAddLastActivityFilter}
        addMarkFilter={handleAddMarkFilter}
        handleAddAvgFilter={handleAddAvgFilter}
        removeLastActiveStartFilter={handleRemoveLastActivityStartFilter}
        removeLastActiveEndFilter={handleRemoveLastActivityEndFilter}
        handleReloadTable={handleReloadTable}
        filterKey={'studentsPerCourse'}
        startMark={filters?.mark_sum_min}
        endMark={filters?.mark_sum_max}
        startDate={filters?.last_active_min}
        endDate={filters?.last_active_max}
        startAvg={filters?.average_mark_min}
        endAvg={filters?.average_mark_max}
        filters={filters}
        updateStudents={updateStudents}
      />
      <StudentsTableWrapper
        handleReloadTable={handleReloadTable}
        students={filteredStudents as studentsTableInfoT}
        isLoading={isFetching || isTablesHeaderFetching}
        tableId={tableId as number}
      />
    </>
  )
}
