import { useState, FC, useEffect, ChangeEvent } from 'react'

import { SelectDropDown } from '../../components/SelectDropDown/SelectDropDown'
import { FiltersButton } from '../../components/FiltersButton'
import { Input } from '../../components/common/Input/Input/Input'
import { IconSvg } from '../../components/common/IconSvg/IconSvg'
import { dropDownListFilter } from '../../constants/dropDownList'
import { HomeworksStatsTable } from '../../components/HomeworksStatsTable'
import { searchIconPath } from '../../config/commonSvgIconsPath'
import { Pagination } from 'components/Pagination/Pagination'
import { usePagination, useDebounceFunc } from 'customHooks/index'
import { useFetchAllHomeworkStatsQuery, useLazyFetchHomeworkStatsQuery } from '../../api/homeworksStatsService'
import { homeworksStatsT } from 'types/homeworkT'
import { useAppSelector, useAppDispatch } from 'store/hooks/index'
import { filtersSelector } from 'selectors'
import { addFilters } from 'store/redux/filters/slice'

import styles from './home_work.module.scss'

export const HomeWork: FC = () => {
  const dispatch = useAppDispatch()
  const { filters } = useAppSelector(filtersSelector)

  const [arrowUsersState, setArrowUsersState] = useState<string[]>([])
  const [termForFilter, setTermForFilter] = useState<string>('')

  const debounce = useDebounceFunc(() => dispatch(addFilters({homework_name: termForFilter})))

  const { data: homeworksStats } = useFetchAllHomeworkStatsQuery(filters)
  const [fetchHomeworkStats, { data: homeworks }] = useLazyFetchHomeworkStatsQuery()

  const { page, onPageChange } = usePagination({ totalCount: homeworksStats?.count as number })

  const handleChangeTerm = (e: ChangeEvent<HTMLInputElement>) => {
    setTermForFilter(e.target.value)
  }

  useEffect(() => {
    fetchHomeworkStats({ filters, page })
  }, [page, filters])

  useEffect(() => {
    debounce()
  }, [termForFilter])

  return (
    <>
      <p>Входящие работы от учеников</p>
      <div className={styles.container}>
        <SelectDropDown setArrowUsersState={setArrowUsersState} />
        <FiltersButton filteringCategoriesList={dropDownListFilter} />
        <Input name="" type="search" value={termForFilter} onChange={handleChangeTerm} placeholder="Поиск по ученикам и заданиям">
          <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={searchIconPath} />
        </Input>
      </div>
      <HomeworksStatsTable homeworks={homeworks as homeworksStatsT} />
      <Pagination style={{ marginTop: '260px' }} totalCount={homeworksStats?.count as number} currentPage={page} onPageChange={onPageChange} />
    </>
  )
}
