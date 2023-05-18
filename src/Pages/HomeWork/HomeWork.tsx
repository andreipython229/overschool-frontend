import { useState, FC, useEffect, ChangeEvent, useCallback } from 'react'
import { HomeworksStatsTable } from '../../components/HomeworksStatsTable'
import { Pagination } from 'components/Pagination/Pagination'
import { usePagination, useDebounceFunc } from 'customHooks/index'
import { useFetchAllHomeworkStatsQuery, useLazyFetchHomeworkStatsQuery } from '../../api/homeworksStatsService'
import { homeworksStatsT } from 'types/homeworkT'
import { useAppSelector, useAppDispatch } from 'store/hooks/index'
import { filtersSelector } from 'selectors'
import { addFilters } from 'store/redux/filters/slice'
import { FilterAndSearchBlock } from './FilterAndSeachBlock'

import styles from './home_work.module.scss'

export const HomeWork: FC = () => {
  const dispatch = useAppDispatch()
  const { filters } = useAppSelector(filtersSelector)

  const [termForFilter, setTermForFilter] = useState<string>('')

  const debounce = useDebounceFunc(dispatch)

  const { data: homeworksStats, isLoading } = useFetchAllHomeworkStatsQuery(filters)
  const [fetchHomeworkStats, { data: homeworks, isFetching }] = useLazyFetchHomeworkStatsQuery()

  const { page, onPageChange, paginationRange } = usePagination({ totalCount: homeworksStats?.count as number })

  const handleChangeTerm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTermForFilter(e.target.value)
  }, [])

  const handleChangeStatus = useCallback((status: string) => {
    dispatch(addFilters({ status }))
  }, [])

  useEffect(() => {
    fetchHomeworkStats({ filters, page })
  }, [page, filters])

  useEffect(() => {
    debounce(addFilters({ homework_name: termForFilter }))
  }, [termForFilter])

  return (
    <>
      <FilterAndSearchBlock handleChangeTerm={handleChangeTerm} termForFilter={termForFilter} onChangeStatus={handleChangeStatus} />
      <HomeworksStatsTable homeworks={homeworks as homeworksStatsT} isLoading={isFetching || isLoading} />
      <Pagination className={styles.pagination} paginationRange={paginationRange} currentPage={page} onPageChange={onPageChange} />
    </>
  )
}
