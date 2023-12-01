import { FC, useEffect, useState, useMemo } from 'react'

import { StudentsTableWrapper } from 'components/StudentsTableWrapper'
import { studentsTableInfoT } from 'types/courseStatT'
import { useLazyFetchStudentsPerSchoolQuery } from 'api/schoolHeaderService'
import { AllStudentsBlock } from 'components/AllStudentsBlock'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { addFilters, removeFilter } from 'store/redux/filters/slice'
import { useFetchStudentsTablesHeaderQuery } from 'api/studentTableService'

export const StudentsPerSchool: FC = () => {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(state => state.filters['studentsPerSchool'])
  const schoolId = localStorage.getItem('school_id')
  const [fetchStudents, { data, isFetching }] = useLazyFetchStudentsPerSchoolQuery()
  const { data: tablesHeader, isFetching: isTablesHeaderFetching, isSuccess } = useFetchStudentsTablesHeaderQuery()

  const [tableId, setTableId] = useState<number>()

  const handleAddLastActivityFilter = (data1: string, data2: string) => {
    dispatch(addFilters({ key: 'studentsPerSchool', filters: { last_active_min: data1, last_active_max: data2 } }))
  }

  const handleRemoveLastActivityStartFilter = () => {
    dispatch(removeFilter({ key: 'studentsPerSchool', filterName: 'last_activity_min' }))
  }

  const handleRemoveLastActivityEndFilter = () => {
    dispatch(removeFilter({ key: 'studentsPerSchool', filterName: 'last_activity_max' }))
  }

  const handleAddAvgFilter = (start_avg: string, end_avg: string) => {
    dispatch(addFilters({ key: 'studentsPerSchool', filters: { average_mark_min: start_avg, average_mark_max: end_avg } }))
  }

  const handleAddMarkFilter = (start_mark: string, end_mark: string) => {
    dispatch(addFilters({ key: 'studentsPerSchool', filters: { mark_sum_min: start_mark, mark_sum_max: end_mark } }))
  }

  const handleReloadTable = () => {
    schoolId && fetchStudents({ id: Number(schoolId), filters })
  }

  useEffect(() => {
    handleReloadTable()
  }, [filters])

  useEffect(() => {
    if (isSuccess) {
      const id = tablesHeader.find(table => table.type === 'School')?.students_table_info_id
      setTableId(id)
    }
  }, [isTablesHeaderFetching])

  // Поиск по студентам школы
  const [searchTerm, setSearchTerm] = useState('');

  const updateStudents = (value: string) => {
      setSearchTerm(value)
  }

  // Филтра для всех студентов
  const filteredStudents = useMemo(() => {
    if (!searchTerm) return data ?? [];

    return (data ?? []).filter(student => {
      return (
        student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.group_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, data]);

  return (
    <>
      <AllStudentsBlock
        invite={false}
        headerText={'Все ученики школы'}
        addLastActiveFilter={handleAddLastActivityFilter}
        addMarkFilter={handleAddMarkFilter}
        handleAddAvgFilter={handleAddAvgFilter}
        removeLastActiveStartFilter={handleRemoveLastActivityStartFilter}
        removeLastActiveEndFilter={handleRemoveLastActivityEndFilter}
        handleReloadTable={handleReloadTable}
        filterKey={'studentsPerSchool'}
        startMark={filters?.mark_sum_min}
        endMark={filters?.mark_sum_max}
        startDate={filters?.last_active_min}
        endDate={filters?.last_active_max}
        startAvg={filters?.average_mark_min}
        endAvg={filters?.average_mark_max}
        filters={filters}
        updateStudents={updateStudents}
      />
      <StudentsTableWrapper handleReloadTable={handleReloadTable} students={filteredStudents as studentsTableInfoT} isLoading={isFetching || isTablesHeaderFetching} tableId={tableId as number} />
    </>
  )
}
