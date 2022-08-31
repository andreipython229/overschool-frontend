// Компонент на изменении и  ждёт удаления!!!
import React, { FC, useState } from 'react'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { arrowIcon, filterSvgIcon } from '../../constants/iconSvgConstants'
import { dropDownListFilter } from '../../constants/dropDownList'
import { ContainerFilters } from '../ContainerFilters/ContainerFilters'

import styles from './filter_button.module.scss'

type setArrowUsersStateT = {
  setArrowUsersState: (scoresFilterList: any) => void
}

interface IItemDropDownList {
  id: number
  title: string
  isOpen: boolean
}

export const FilterButton: FC<setArrowUsersStateT> = ({ setArrowUsersState }) => {
  const [toggleDropDown, setToggleDropDown] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [itemTitle, setItemTitle] = useState<string>('')
  const [scoresStart, setScoresStart] = useState<string>('')
  const [scoresEnd, setScoresEnd] = useState<string>('')

  const handleApplyFilter = () => {
    const scoresFilterList = [].filter(item => item)
    setArrowUsersState(scoresFilterList)
  }

  const handleDropDown = () => {
    setToggleDropDown(!toggleDropDown)
    setIsOpen(false)
  }

  const handleToggleFilter =
    ({ id }: any) =>
    () => {
      dropDownListFilter.forEach((item: IItemDropDownList) => (item.isOpen = false))
      const changeFilterItem = dropDownListFilter.find((item: IItemDropDownList) => item.id === id)
      if (changeFilterItem) {
        setIsOpen((changeFilterItem.isOpen = !isOpen))
        setItemTitle(changeFilterItem.title)
      }
    }

  return (
    <div>
      <div className={styles.container} onClick={handleDropDown}>
        <IconSvg width={15} height={17} fill="#D1D5DB" d={filterSvgIcon} viewBoxSize="0 0 15 17" />
        Добавить фильтры
      </div>
      {toggleDropDown && (
        <div className={styles.drop_down_block}>
          <h6>ВЫБЕРИТЕ КРИТЕРИЙ ФИЛЬТРАЦИИ</h6>
          {dropDownListFilter.map(({ id, title }: any) => (
            <div className={styles.item_drop_down} onClick={handleToggleFilter({ id, title })} key={id}>
              {title}
              <IconSvg width={25} height={25} fill="#9A9A9A" d={arrowIcon} viewBoxSize="0 0 12 15" />
            </div>
          ))}
          {isOpen && (
            <div className={styles.inner_drop_down_block}>
              <ContainerFilters title={itemTitle} props={{ setScoresStart, setScoresEnd, scoresStart, scoresEnd, handleApplyFilter }} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
