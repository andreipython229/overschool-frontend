import { useState, FC } from 'react'

import { SelectDropDown } from '../../components/SelectDropDown/SelectDropDown'
import { FiltersButton } from '../../components/FiltersButton'
import { Input } from '../../components/common/Input/Input/Input'
import { IconSvg } from '../../components/common/IconSvg/IconSvg'
import { dropDownListFilter } from '../../constants/dropDownList'
import { HomeworksStatsTable } from '../../components/HomeworksStatsTable'
import { searchIconPath } from '../../config/commonSvgIconsPath'

import styles from './home_work.module.scss'

export const HomeWork: FC = () => {
  const [arrowUsersState, setArrowUsersState] = useState<string[]>([])


  return (
    <>
      <h3>Входящие работы от учеников</h3>
      <div className={styles.container}>
        <SelectDropDown setArrowUsersState={setArrowUsersState} />
        <FiltersButton filteringCategoriesList={dropDownListFilter} />
        <Input name="" type="search" value={''} onChange={() => console.log('заглушка')} placeholder="Поиск по ученикам и заданиям">
          <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={searchIconPath} />
        </Input>
      </div>
      <HomeworksStatsTable />
    </>
  )
}
