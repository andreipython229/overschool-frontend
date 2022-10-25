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

export const HomeWork: FC = () => {
  const dispatch = useAppDispatch()
  const { filters } = useAppSelector(filtersSelector)

  const [arrowUsersState, setArrowUsersState] = useState<string[]>([])
  const [termForFilter, setTermForFilter] = useState<string>('')

  const debounce = useDebounceFunc(() => dispatch(addFilters({ homework_name: termForFilter })))

  const { data: homeworksStats } = useFetchAllHomeworkStatsQuery(filters)
  const [fetchHomeworkStats, { data: homeworks }] = useLazyFetchHomeworkStatsQuery()

  const { page, onPageChange } = usePagination({ totalCount: homeworksStats?.count as number })

  const handleChangeTerm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTermForFilter(e.target.value)
  }, [])

  useEffect(() => {
    fetchHomeworkStats({ filters, page })
  }, [page, filters])

  useEffect(() => {
    debounce()
  }, [termForFilter])

  return (
    <>
      <FilterAndSearchBlock handleChangeTerm={handleChangeTerm} termForFilter={termForFilter} setArrowUsersState={setArrowUsersState} />
      <HomeworksStatsTable homeworks={homeworks as homeworksStatsT} />
      <Pagination style={{ marginTop: '260px' }} totalCount={homeworksStats?.count as number} currentPage={page} onPageChange={onPageChange} />
    </>
  )
}
