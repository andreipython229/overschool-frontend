import React, { ChangeEvent, FC, memo } from 'react'

import {dropDownListFilterHomework, initialDropDownList} from 'constants/dropDownList'
import { SelectDropDown } from '../../../components/SelectDropDown/SelectDropDown'
import { FiltersButton } from '../../../components/FiltersButton'
// import { dropDownListFilter } from '../../../constants/dropDownList'
import { Input } from '../../../components/common/Input/Input/Input'
import { IconSvg } from '../../../components/common/IconSvg/IconSvg'
import { searchIconPath } from '../../../config/commonSvgIconsPath'
import { chipsVal } from 'components/FiltersButton/Chips/config'

import styles from '../home_work.module.scss'
import { ChipsComponent } from 'components/FiltersButton/Chips/chips'
import {StudentsHomeworkExport} from "../../../components/StudentsTable/StudentsExport/StudentHomeworkExport";

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
  handleChangeTerm: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeStatus: (status: string) => void
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
    return (
      <>
        <p className={styles.homework_header}>Входящие работы от учеников</p>
        <div style={{fontSize: "11px", color: "#3B3B3B"}}>Количество записей: {all_homeworks_count}</div>
        <StudentsHomeworkExport />
        <ChipsComponent filterKey="homework" filters={filters} chipsVal={chipsVal['homework']} />
        <div className={styles.container}>
          <div className={styles.container_1}>
          <SelectDropDown dropdownData={initialDropDownList} onChangeStatus={onChangeStatus} />
          <FiltersButton
            filteringCategoriesList={dropDownListFilterHomework}
            addLastActiveFilter={addLastActiveFilter}
            addMarkFilter={addMarkFilter}
            removeLastActiveStartFilter={removeLastActiveStartFilter}
            removeLastActiveEndFilter={removeLastActiveEndFilter}
            {...restFilters}
          />
          </div>
          <Input name="" type="search" value={termForFilter} onChange={handleChangeTerm} placeholder="Поиск по ФИО и email">
            <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={searchIconPath} />
          </Input>
        </div>
      </>
    )
  },
)
