import { FC, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { StudentsTableWrapper } from 'components/StudentsTableWrapper'
import { studentsTableInfoT } from 'types/courseStatT'
import { useLazyFetchStudentsPerGroupQuery } from 'api/courseStat'
import { AllStudentsBlock } from 'components/AllStudentsBlock'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { addFilters, removeFilter } from 'store/redux/filters/slice'
import { useFetchStudentsTablesHeaderQuery } from 'api/studentTableService'
import styles from "../../Pages/HomeWork/home_work.module.scss";
import {Pagination} from "../Pagination/Pagination";
import {useDebounceFunc, usePagination} from "../../customHooks";

export const StudentsPerGroup: FC = () => {
  const { group_id } = useParams()
  const dispatch = useAppDispatch()
  const schoolName = window.location.href.split('/')[4]
  const filters = useAppSelector(state => state.filters['studentsPerGroup'])
  const debounce = useDebounceFunc(dispatch)
  const { data: tablesHeader, isFetching: isTablesHeaderFetching, isSuccess } = useFetchStudentsTablesHeaderQuery(schoolName)
  const [fetchStudents, { data, isFetching }] = useLazyFetchStudentsPerGroupQuery()
  const { page, onPageChange, paginationRange } = usePagination({ totalCount: data?.count as number })

  const [tableId, setTableId] = useState<number>()

  const handleAddLastActivityFilter = (data1: string, data2: string) => {
    dispatch(addFilters({ key: 'studentsPerGroup', filters: { last_active_min: data1, last_active_max: data2 } }))
  }

  const handleRemoveLastActivityStartFilter = () => {
    dispatch(removeFilter({ key: 'studentsPerGroup', filterName: 'last_activity_min' }))
  }

  const handleRemoveLastActivityEndFilter = () => {
    dispatch(removeFilter({ key: 'studentsPerGroup', filterName: 'last_activity_max' }))
  }

  const handleAddAvgFilter = (start_avg: string, end_avg: string) => {
    dispatch(addFilters({ key: 'studentsPerGroup', filters: { average_mark_min: start_avg, average_mark_max: end_avg } }))
  }

  const handleAddMarkFilter = (start_mark: string, end_mark: string) => {
    dispatch(addFilters({ key: 'studentsPerGroup', filters: { mark_sum_min: start_mark, mark_sum_max: end_mark } }))
  }

  const handleReloadTable = () => {
    fetchStudents({ id: group_id, filters, schoolName, page })
  }

  useEffect(() => {
    handleReloadTable()
  }, [filters])

  useEffect(() => {
    if (isSuccess) {
      const id = tablesHeader.find(table => table.type === 'Group')?.students_table_info_id
      setTableId(id)
    }
  }, [isTablesHeaderFetching])

  // Поиск по студентам группы
  const [searchTerm, setSearchTerm] = useState('')

  const updateStudents = (value: string) => {
    // setSearchTerm(value)
    debounce(addFilters({ key: 'studentsPerGroup', filters: {'search_value': value } }));
  }

  const handleAddSortToFilters = (sort_by_value: string, sort_order_value: string) => {
      dispatch(addFilters({key: 'studentsPerGroup', filters: {'sort_by': sort_by_value, 'sort_order': sort_order_value}}))
  }

  // Фильтра для студентов группы
  const filteredStudents = useMemo(() => {
    if (!searchTerm) return data?.results ?? []

    return (data?.results ?? []).filter(student => {
      return (
        student.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  }, [searchTerm, data])

  // Перезагрузка после смены страницы пагинатора
  useEffect(() => {
    fetchStudents({ id: group_id, filters, schoolName, page })
  }, [page,])

  return (
    <>
      <AllStudentsBlock
        invite={true}
        headerText={'Все ученики группы'}
        addLastActiveFilter={handleAddLastActivityFilter}
        addMarkFilter={handleAddMarkFilter}
        handleAddAvgFilter={handleAddAvgFilter}
        removeLastActiveStartFilter={handleRemoveLastActivityStartFilter}
        removeLastActiveEndFilter={handleRemoveLastActivityEndFilter}
        handleReloadTable={handleReloadTable}
        filterKey={'studentsPerGroup'}
        startMark={filters?.mark_sum_min}
        endMark={filters?.mark_sum_max}
        startDate={filters?.last_active_min}
        endDate={filters?.last_active_max}
        startAvg={filters?.average_mark_min}
        endAvg={filters?.average_mark_max}
        filters={filters}
        updateStudents={updateStudents}
        all_students_count={filteredStudents?.length}
      />
      <StudentsTableWrapper
        handleReloadTable={handleReloadTable}
        students={filteredStudents as studentsTableInfoT}
        isLoading={isFetching || isTablesHeaderFetching}
        tableId={tableId as number}
        handleAddSortToFilters={handleAddSortToFilters}
      />{' '}
      <Pagination
          className={styles.pagination}
          paginationRange={paginationRange}
          currentPage={page}
          onPageChange={onPageChange}
      />
    </>
  )
}
