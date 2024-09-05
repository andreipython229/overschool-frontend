import { useState, FC, useEffect, ChangeEvent, useCallback } from 'react'
import { HomeworksStatsTable } from '../../components/HomeworksStatsTable'
import { Pagination } from 'components/Pagination/Pagination'
import { usePagination, useDebounceFunc } from 'customHooks/index'
import { useFetchAllHomeworkStatsQuery, useLazyFetchHomeworkStatsQuery } from '../../api/homeworksStatsService'
import { homeworksStatsT } from 'types/homeworkT'
import { useAppSelector, useAppDispatch } from 'store/hooks/index'
import { addFilters, removeFilter } from 'store/redux/filters/slice'
import { FilterAndSearchBlock } from './FilterAndSeachBlock'

import { motion } from 'framer-motion'


import styles from './home_work.module.scss'



export const HomeWork: FC = () => {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(state => state.filters['homework'])
  const schoolName = window.location.href.split('/')[4]

  const course_data = localStorage.getItem('course_data')
  const parsedCourseData = course_data ? JSON.parse(course_data) : {}
  const courseIds = Object.keys(parsedCourseData) // Извлекаем ключи (цифры)

  const [homeworksData, setHomeworksData] = useState<homeworksStatsT>()

  const [termForFilter, setTermForFilter] = useState<string>('')

  const debounce = useDebounceFunc(dispatch)

  // const { data: homeworksStats, isLoading } = useFetchAllHomeworkStatsQuery({filters, schoolName})
  const [fetchHomeworkStats, { data: homeworks, isFetching }] = useLazyFetchHomeworkStatsQuery()

  const { page, onPageChange, paginationRange } = usePagination({ totalCount: homeworks?.count as number })

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
    if (course_data) {
      fetchHomeworkStats({ filters, page, schoolName, course_data: courseIds })
    }
  }, [course_data, page, filters])

  useEffect(() => {
    debounce(addFilters({ key: 'homework', filters: { student: termForFilter } }))
  }, [termForFilter])

  useEffect(() => {
    if (!isFetching) {
      setHomeworksData(homeworks)
    }
  }, [homeworks])

  return (
    <>
    <motion.div
    initial={{
      x: -900,
      opacity: 0,
    }}
    animate={{
      x: 0,
      opacity: 1,
    }}
    exit={{
      opacity: 0,
    }}
    transition={{
      delay: 0.1,
      ease: 'easeInOut',
      duration: 0.5,
    }}
    layout >
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
        all_homeworks_count={homeworks?.count as number}
      />
      <HomeworksStatsTable homeworks={homeworksData as homeworksStatsT} isLoading={isFetching} />
      <Pagination className={styles.pagination} paginationRange={paginationRange} currentPage={page} onPageChange={onPageChange} />
      </motion.div>
    </>
  )
}
