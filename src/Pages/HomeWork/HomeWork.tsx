import React, { useState } from 'react'
import { SelectDropDown } from '../../components/SelectDropDown/SelectDropDown'
import { FiltersButton } from '../../components/FiltersButton'
import { Input } from '../../components/common/Input/Input/Input'
import { searchSvgIcon } from '../../constants/iconSvgConstants'
import { IconSvg } from '../../components/common/IconSvg/IconSvg'

import styles from './home_work.module.scss'
import { dropDownListFilter } from '../../constants/dropDownList'

export const HomeWork = () => {
  const [arrowUsersState, setArrowUsersState] = useState<string[]>([])
  return (
    <>
      <h3>Входящие работы от учеников</h3>
      <div className={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <SelectDropDown setArrowUsersState={setArrowUsersState} />
          <FiltersButton filteringCategoriesList={dropDownListFilter} />
        </div>
        <Input
          name=""
          type="text"
          value=""
          onChange={() => {
            console.log(arrowUsersState)
          }}
          placeholder="Поиск по ученикам и заданиям"
        >
          <IconSvg
            width={20}
            height={20}
            viewBoxSize="0 0 20 20"
            d={searchSvgIcon}
            stroke="#D1D5DB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Input>
      </div>
      {/*<ModalCheckHomeWork />*/}
    </>
  )
}
