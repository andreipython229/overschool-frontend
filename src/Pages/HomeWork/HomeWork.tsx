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

  const debounce = useDebounceFunc(dispatch(addFilters))

  const { data: homeworksStats } = useFetchAllHomeworkStatsQuery(filters)
  const [fetchHomeworkStats, { data: homeworks }] = useLazyFetchHomeworkStatsQuery()

  const { page, onPageChange } = usePagination({ totalCount: homeworksStats?.count as number })

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
    termForFilter && debounce({ homework_name: termForFilter })
  }, [termForFilter])

  return (
    <>
      <FilterAndSearchBlock handleChangeTerm={handleChangeTerm} termForFilter={termForFilter} onChangeStatus={handleChangeStatus} />
      <HomeworksStatsTable homeworks={homeworks as homeworksStatsT} />
      <Pagination className={styles.pagination} totalCount={homeworksStats?.count as number} currentPage={page} onPageChange={onPageChange} />
    </>
  )
}
