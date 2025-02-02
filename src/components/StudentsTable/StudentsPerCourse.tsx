import { FC, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useLazyFetchCourseStatQuery } from '../../api/courseStat'
import { StudentsTableWrapper } from 'components/StudentsTableWrapper'
import { studentsTableInfoT } from 'types/courseStatT'
import { AllStudentsBlock } from 'components/AllStudentsBlock'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { addFilters, removeFilter } from 'store/redux/filters/slice'
import { useFetchStudentsTablesHeaderQuery } from 'api/studentTableService'
import styles from "../../Pages/HomeWork/home_work.module.scss";
import { Pagination } from "../Pagination/Pagination";
import {useDebounceFunc, usePagination} from "../../customHooks";
import {StudentsPerCourseT, StudentsStatsT} from "../../types/pageTypes";

export const StudentsPerCourse: FC<StudentsPerCourseT> = ({courseID}) => {
  const { course_id: course_ID } = useParams()
  const course_id = course_ID ? course_ID : courseID
  const schoolName = window.location.href.split('/')[4]

  const dispatch = useAppDispatch()
  const debounce = useDebounceFunc(dispatch)

  const filters = useAppSelector(state => state.filters['studentsPerCourse'])

  const { data: tablesHeader, isFetching: isTablesHeaderFetching, isSuccess } = useFetchStudentsTablesHeaderQuery(schoolName)

  const [tableId, setTableId] = useState<number>()

  const [fetchStudents, { data, isFetching }] = useLazyFetchCourseStatQuery()
  const { page, onPageChange, paginationRange } = usePagination({ totalCount: data?.count as number })
  const [isGroupingStudents, setIsGroupingStudents] = useState(true)

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
    if (tablesHeader && tablesHeader.length > 2) {
      const studentsTableInfo = tablesHeader[2].students_table_info || [];
      const checkedFields = studentsTableInfo.filter((field: any) => field.checked).map((field: any) => field.name);
      if (checkedFields) {
        fetchStudents({ 
          filters, 
          page, 
          id: String(course_id),
          schoolName,
          fields: checkedFields
        });
      }
    } else {
      console.log('tablesHeader is undefined or does not have enough elements');
    }
  }

  useEffect(() => {
    handleReloadTable()
    console.log(data)
    console.log(schoolName)
  }, [filters, course_id])

  useEffect(() => {
    if (isSuccess) {
      // console.log(tablesHeader)
      const id = tablesHeader.find(table => table.type === 'Course')?.students_table_info_id
      setTableId(id)
    }
  }, [isTablesHeaderFetching])

  // Поиск по студентам курса
  const [searchTerm, setSearchTerm] = useState('')

  const updateStudents = (value: string) => {
    setSearchTerm(value)
    debounce(addFilters({ key: 'studentsPerCourse', filters: {'search_value': value } }));
  }

  const handleAddSortToFilters = (sort_by_value: string, sort_order_value: string) => {
      dispatch(addFilters({key: 'studentsPerCourse', filters: {'sort_by': sort_by_value, 'sort_order': sort_order_value}}))
  }

  // Фильтра для студентов курса
  const filteredStudents = useMemo(() => {
    if (!searchTerm) return data?.results ?? []

    return (data?.results ?? []).filter(student => {
      return (
        student.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.group_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  }, [searchTerm, data])

  const handleUpdateGroupingStudents = () => {
    setIsGroupingStudents(!isGroupingStudents)
  }

  // Перезагрузка после смены страницы пагинатора
  useEffect(() => {
    if (tablesHeader && tablesHeader.length > 2) {
      const studentsTableInfo = tablesHeader[2].students_table_info || [];
      const checkedFields = studentsTableInfo.filter((field: any) => field.checked).map((field: any) => field.name);
      if (checkedFields) {
        fetchStudents({ 
          filters, 
          page, 
          id: String(course_id),
          schoolName,
          fields: checkedFields
        });
      }
    } else {
      console.log('tablesHeader is undefined or does not have enough elements');
    }
  }, [page, isGroupingStudents, tablesHeader]);

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
        isGrouping={handleUpdateGroupingStudents}
        filterKey={'studentsPerCourse'}
        startMark={filters?.mark_sum_min}
        endMark={filters?.mark_sum_max}
        startDate={filters?.last_active_min}
        endDate={filters?.last_active_max}
        startAvg={filters?.average_mark_min}
        endAvg={filters?.average_mark_max}
        filters={filters}
        updateStudents={updateStudents}
        all_students_count={data?.count as number}
        tableId={tableId as number}
      />
      <StudentsTableWrapper
        handleReloadTable={handleReloadTable}
        students={filteredStudents as studentsTableInfoT}
        isLoading={isFetching || isTablesHeaderFetching}
        tableId={tableId as number}
        handleAddSortToFilters={handleAddSortToFilters}
        isGrouping={isGroupingStudents}
        tableType={'Курс'}
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
