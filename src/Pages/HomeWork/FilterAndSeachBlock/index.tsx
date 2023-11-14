import React, { ChangeEvent, FC, memo } from 'react'

import { initialDropDownList } from 'constants/dropDownList'
import { SelectDropDown } from '../../../components/SelectDropDown/SelectDropDown'
import { FiltersButton } from '../../../components/FiltersButton'
import { dropDownListFilter } from '../../../constants/dropDownList'
import { Input } from '../../../components/common/Input/Input/Input'
import { IconSvg } from '../../../components/common/IconSvg/IconSvg'
import { searchIconPath } from '../../../config/commonSvgIconsPath'
import { chipsVal } from 'components/FiltersButton/Chips/config'

import styles from '../home_work.module.scss'
import { ChipsComponent } from 'components/FiltersButton/Chips/chips'

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
}

export const FilterAndSearchBlock: FC<FilterAndSearchBlockT> = memo(
  ({
    termForFilter,
    handleChangeTerm,
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
        <ChipsComponent filterKey="homework" filters={filters} chipsVal={chipsVal['homework']} />
        <div className={styles.container}>
          <div className={styles.container_1}>
          <SelectDropDown dropdownData={initialDropDownList} onChangeStatus={onChangeStatus} />
          <FiltersButton
            filteringCategoriesList={dropDownListFilter}
            addLastActiveFilter={addLastActiveFilter}
            addMarkFilter={addMarkFilter}
            removeLastActiveStartFilter={removeLastActiveStartFilter}
            removeLastActiveEndFilter={removeLastActiveEndFilter}
            {...restFilters}
          />
          </div>
          <Input name="" type="search" value={termForFilter} onChange={handleChangeTerm} placeholder="Поиск по заданиям">
            <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={searchIconPath} />
          </Input>
        </div>
      </>
    )
  },
)
