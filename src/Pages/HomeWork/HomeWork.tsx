import { useState, FC, useEffect, ChangeEvent, useCallback } from 'react'
import { HomeworksStatsTable } from '../../components/HomeworksStatsTable'
import { Pagination } from 'components/Pagination/Pagination'
import { usePagination, useDebounceFunc } from 'customHooks/index'
import { useFetchAllHomeworkStatsQuery, useLazyFetchHomeworkStatsQuery } from '../../api/homeworksStatsService'
import { homeworksStatsT } from 'types/homeworkT'
import { useAppSelector, useAppDispatch } from 'store/hooks/index'
import { addFilters, removeFilter } from 'store/redux/filters/slice'
import { FilterAndSearchBlock } from './FilterAndSeachBlock'
import styles from './home_work.module.scss'



export const HomeWork: FC = () => {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(state => state.filters['homework'])
  const schoolName = window.location.href.split('/')[4]

  const [termForFilter, setTermForFilter] = useState<string>('')

  const debounce = useDebounceFunc(dispatch)

  const { data: homeworksStats, isLoading } = useFetchAllHomeworkStatsQuery({filters, schoolName})
  const [fetchHomeworkStats, { data: homeworks, isFetching }] = useLazyFetchHomeworkStatsQuery()

  const { page, onPageChange, paginationRange } = usePagination({ totalCount: homeworksStats?.count as number })

  const handleChangeTerm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTermForFilter(e.target.value)
  }, [])

  const handleAddLastActivityFilter = (data1: string, data2: string) => {
    dispatch(addFilters({ key: 'homework', filters: { start_date: data1, end_date: data2 } }))
  }

  const handleRemoveLastActivityStartFilter = () => {
    dispatch(removeFilter({ key: 'homework', filterName: 'start_date' }))
  }

  const handleRemoveLastActivityEndFilter = () => {
    dispatch(removeFilter({ key: 'homework', filterName: 'end_date' }))
  }

  const handleAddMarkFilter = (start_mark: string, end_mark: string) => {
    dispatch(addFilters({ key: 'homework', filters: { start_mark, end_mark } }))
  }
 
  const handleChangeStatus = useCallback((status: string) => {
    dispatch(addFilters({ key: 'homework', filters: { status } }))
  }, [])

  useEffect(() => {
    fetchHomeworkStats({ filters, page, schoolName })
  }, [page, filters])

  useEffect(() => {
    debounce(addFilters({ key: 'homework', filters: { homework_name: termForFilter } }))
  }, [termForFilter])

  return (
    <>
      <FilterAndSearchBlock
        handleChangeTerm={handleChangeTerm}
        termForFilter={termForFilter}
        onChangeStatus={handleChangeStatus}
        addLastActiveFilter={handleAddLastActivityFilter}
        addMarkFilter={handleAddMarkFilter}
        removeLastActiveStartFilter={handleRemoveLastActivityStartFilter}
        removeLastActiveEndFilter={handleRemoveLastActivityEndFilter}
        startMark={filters?.start_mark}
        endMark={filters?.end_mark}
        startDate={filters?.start_date}
        endDate={filters?.end_date}
        filters={filters}
      />
      <HomeworksStatsTable homeworks={homeworks as homeworksStatsT} isLoading={isFetching || isLoading} />
      <Pagination className={styles.pagination} paginationRange={paginationRange} currentPage={page} onPageChange={onPageChange} />
    </>
  )
}
