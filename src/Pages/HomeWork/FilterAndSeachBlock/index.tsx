import React, { ChangeEvent, FC, memo } from 'react'
import styles from '../home_work.module.scss'
import { SelectDropDown } from '../../../components/SelectDropDown/SelectDropDown'
import { FiltersButton } from '../../../components/FiltersButton'
import { dropDownListFilter } from '../../../constants/dropDownList'
import { Input } from '../../../components/common/Input/Input/Input'
import { IconSvg } from '../../../components/common/IconSvg/IconSvg'
import { searchIconPath } from '../../../config/commonSvgIconsPath'

type FilterAndSearchBlockT = {
  setArrowUsersState: (arg: string[]) => void
  termForFilter: string
  handleChangeTerm: (e: ChangeEvent<HTMLInputElement>) => void
}

export const FilterAndSearchBlock: FC<FilterAndSearchBlockT> = memo(({ setArrowUsersState, termForFilter, handleChangeTerm }) => {
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
    </>
  )
})
