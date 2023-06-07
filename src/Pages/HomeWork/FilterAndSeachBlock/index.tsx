import React, { ChangeEvent, FC, memo } from 'react'

import { initialDropDownList } from 'constants/dropDownList'
import { SelectDropDown } from '../../../components/SelectDropDown/SelectDropDown'
import { FiltersButton } from '../../../components/FiltersButton'
import { dropDownListFilter } from '../../../constants/dropDownList'
import { Input } from '../../../components/common/Input/Input/Input'
import { IconSvg } from '../../../components/common/IconSvg/IconSvg'
import { searchIconPath } from '../../../config/commonSvgIconsPath'

import styles from '../home_work.module.scss'

type FilterAndSearchBlockT = {
  termForFilter: string
  handleChangeTerm: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeStatus: (status: string) => void
}

export const FilterAndSearchBlock: FC<FilterAndSearchBlockT> = memo(({ termForFilter, handleChangeTerm, onChangeStatus }) => {
  return (
    <>
      <p>Входящие работы от учеников</p>
      <div className={styles.container}>
        <SelectDropDown dropdownData={initialDropDownList} onChangeStatus={onChangeStatus} />
        <FiltersButton filteringCategoriesList={dropDownListFilter} />
        <Input name="" type="search" value={termForFilter} onChange={handleChangeTerm} placeholder="Поиск по заданиям">
          <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={searchIconPath} />
        </Input>
      </div>
    </>
  )
})
