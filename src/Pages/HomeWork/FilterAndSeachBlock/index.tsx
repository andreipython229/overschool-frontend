import { FC, memo } from 'react'
import { dropDownListFilterHomework } from 'constants/dropDownList'
import { FiltersButton } from '../../../components/FiltersButton'
import { chipsVal } from 'components/FiltersButton/Chips/config'
import styles from '../home_work.module.scss'
import { ChipsComponent } from 'components/FiltersButton/Chips/chips'
import { StudentsHomeworkExport } from '../../../components/StudentsTable/StudentsExport/StudentHomeworkExport'
import { SearchBar } from 'components/SearchBar'
import { useAppDispatch } from 'store/hooks'
import { removeAllFilters } from 'store/redux/filters/slice'

type FilterAndSearchBlockT = {
  termForFilter: string
  startMark: string | number
  endMark: string | number
  startDate: string | number
  endDate: string | number
  filters: { [key: string]: string | number }
  removeLastActiveStartFilter?: () => void
  removeLastActiveEndFilter?: () => void
  addLastActiveFilter?: (data1: string, data2: string) => void
  addMarkFilter?: (start_mark: string, end_mark: string) => void
  handleChangeTerm: (value: string) => void
  onChangeStatus?: (status: string) => void
  all_homeworks_count: number
}

export const FilterAndSearchBlock: FC<FilterAndSearchBlockT> = memo(
  ({
    termForFilter,
    handleChangeTerm,
    all_homeworks_count,
    onChangeStatus,
    addLastActiveFilter,
    addMarkFilter,
    removeLastActiveStartFilter,
    removeLastActiveEndFilter,
    filters,
    ...restFilters
  }) => {
    const dispatch = useAppDispatch()

    const clearFilters = () => {
      dispatch(removeAllFilters())
    }
    return (
      <>
        <p className={styles.homework_header}>Входящие работы от учеников</p>
        <div style={{ fontSize: '11px', color: '#3B3B3B' }}>Количество записей: {all_homeworks_count}</div>
        <StudentsHomeworkExport />
        <ChipsComponent filterKey="homework" filters={filters} chipsVal={chipsVal['homework']} />
        <div className={styles.container}>
          <div className={styles.container_1}>
            <FiltersButton
              clearFilters={clearFilters}
              onChangeStatus={onChangeStatus}
              filteringCategoriesList={dropDownListFilterHomework}
              addLastActiveFilter={addLastActiveFilter}
              addMarkFilter={addMarkFilter}
              removeLastActiveStartFilter={removeLastActiveStartFilter}
              removeLastActiveEndFilter={removeLastActiveEndFilter}
              {...restFilters}
            />
          </div>
          <SearchBar searchTerm={termForFilter} onChangeInput={handleChangeTerm} />
        </div>
      </>
    )
  },
)
