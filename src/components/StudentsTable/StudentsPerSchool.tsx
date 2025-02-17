import { FC, useEffect, useState, useMemo } from 'react'

import { StudentsTableWrapper } from 'components/StudentsTableWrapper'
import { studentsTableInfoT } from 'types/courseStatT'
import { useLazyFetchStudentsPerSchoolQuery } from 'api/schoolHeaderService'
import { AllStudentsBlock } from 'components/AllStudentsBlock'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { addFilters, removeFilter } from 'store/redux/filters/slice'
import { useFetchStudentsTablesHeaderQuery } from 'api/studentTableService'
import {useDebounceFunc, usePagination} from "../../customHooks";
import { Pagination } from "../Pagination/Pagination"
import styles from "../../Pages/HomeWork/home_work.module.scss";

export const StudentsPerSchool: FC = () => {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(state => state.filters['studentsPerSchool'])
  const schoolId = localStorage.getItem('school_id')
  const schoolName = window.location.href.split('/')[4] 
  const [fetchStudents, { data, isFetching }] = useLazyFetchStudentsPerSchoolQuery()
  const { data: tablesHeader, isFetching: isTablesHeaderFetching, isSuccess } = useFetchStudentsTablesHeaderQuery(schoolName)
  const [isGroupingStudents, setIsGroupingStudents] = useState<boolean>()

  const { page, onPageChange, paginationRange } = usePagination({ totalCount: data?.count as number })

  const [tableId, setTableId] = useState<number>()

  const debounce = useDebounceFunc(dispatch)

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
    if (tablesHeader && tablesHeader.length > 2) {
    const studentsTableInfo = tablesHeader[0].students_table_info || [];
      const checkedFields = studentsTableInfo.filter((field: any) => field.checked).map((field: any) => field.name);
      if (schoolId && checkedFields) {
        fetchStudents({ 
          filters, 
          page, 
          id: Number(schoolId),
          fields: checkedFields
        });
      }
    } else {
      console.log('tablesHeader is undefined or does not have enough elements');
    }
  }

  const handleUpdateGroupingStudents = (is_grouping_students: boolean) => {
    setIsGroupingStudents(is_grouping_students)
    handleAddSortToFilters('students__email', 'asc')
  }

  useEffect(() => {
    handleReloadTable()
  }, [filters])

  useEffect(() => {
    dispatch(addFilters({ key: 'studentsPerSchool', filters: {'hide_deleted': 'true' } }));
  }, [])

  useEffect(() => {
    if (isSuccess) {
      const id = tablesHeader.find(table => table.type === 'School')?.students_table_info_id
      setTableId(id)
    }
  }, [isTablesHeaderFetching])

  // Поиск по студентам школы
  const [searchTerm, setSearchTerm] = useState('');

  const updateStudents = (value: string) => {
      // setSearchTerm(value)
      debounce(addFilters({ key: 'studentsPerSchool', filters: {'search_value': value } }));
  }

  const handleAddSortToFilters = (sort_by_value: string, sort_order_value: string) => {
      dispatch(addFilters({key: 'studentsPerSchool', filters: {'sort_by': sort_by_value, 'sort_order': sort_order_value}}))
  }

  // Перезагрузка после смены страницы пагинатора
  useEffect(() => {
    if (tablesHeader && tablesHeader.length > 2) {
      const studentsTableInfo = tablesHeader[0].students_table_info || [];
      const checkedFields = studentsTableInfo.filter((field: any) => field.checked).map((field: any) => field.name);
      if (checkedFields) {
        fetchStudents({ 
          filters, 
          page, 
          id: Number(schoolId),
          fields: checkedFields
        });
      }
    } else {
      console.log('tablesHeader is undefined or does not have enough elements');
    }
  }, [page, isGroupingStudents, tablesHeader]);

  // Филтра для всех студентов
  const filteredStudents = useMemo(() => {
    if (!searchTerm) return data?.results ?? [];

    return (data?.results ?? []).filter(student => {
      return (
        student.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id ||
        student.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.course_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.group_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, data]);

  const allStudentsCount = isGroupingStudents
  ? (data && data.results && data.results.length > 0 ? data.results[0].unique_students_count : 0)
  : (data && data.count ? data.count : 0);

  return (
    <>
      <AllStudentsBlock
        invite={false}
        headerText={`Все ученики платформы`}
        addLastActiveFilter={handleAddLastActivityFilter}
        addMarkFilter={handleAddMarkFilter}
        handleAddAvgFilter={handleAddAvgFilter}
        removeLastActiveStartFilter={handleRemoveLastActivityStartFilter}
        removeLastActiveEndFilter={handleRemoveLastActivityEndFilter}
        handleReloadTable={handleReloadTable}
        isGrouping={handleUpdateGroupingStudents}
        filterKey={'studentsPerSchool'}
        startMark={filters?.mark_sum_min}
        endMark={filters?.mark_sum_max}
        startDate={filters?.last_active_min}
        endDate={filters?.last_active_max}
        startAvg={filters?.average_mark_min}
        endAvg={filters?.average_mark_max}
        filters={filters}
        updateStudents={updateStudents}
        all_students_count={allStudentsCount}
        tableId={tableId as number}
      />
      <StudentsTableWrapper
          handleReloadTable={handleReloadTable}
          students={filteredStudents as studentsTableInfoT}
          isLoading={isFetching || isTablesHeaderFetching}
          tableId={tableId as number}
          handleAddSortToFilters={handleAddSortToFilters}
          isGrouping={isGroupingStudents}
          tableType={'Школа'}
      />
      <Pagination
          className={styles.pagination}
          paginationRange={paginationRange}
          currentPage={page}
          onPageChange={onPageChange}
      />
    </>
  )
}
