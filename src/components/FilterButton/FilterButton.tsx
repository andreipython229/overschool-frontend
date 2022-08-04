import React, { FC, useState } from 'react'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { filterSvgIcon } from '../../constants/iconSvgConstants'
import { dropDownListFilter } from '../../constants/dropDownList'
import { ContainerFilters } from '../ContainerFilters/ContainerFilters'
import { arrowUsers } from '../../mockData/mockData'

import styles from './filter_button.module.scss'

type setArrowUsersStateT = {
  setArrowUsersState: (scoresFilterList: any) => void
}

export const FilterButton: FC<setArrowUsersStateT> = ({ setArrowUsersState }) => {
  const [toggleDropDown, setToggleDropDown] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [itemTitle, setItemTitle] = useState('')
  const [scoresStart, setScoresStart] = useState('')
  const [scoresEnd, setScoresEnd] = useState('')

  const handleApplyFilter = () => {
    const scoresFilterList = arrowUsers.filter(
      item => item.ball >= +scoresStart && item.ball <= +scoresEnd,
    )
    setArrowUsersState(scoresFilterList)
  }

  const handleDropDown = () => {
    setToggleDropDown(!toggleDropDown)
  }

  const handleToggleFilter =
    ({ id }: any) =>
    () => {
      dropDownListFilter.forEach((item: any) => (item.isOpen = false))
      const changeFilterItem = dropDownListFilter.find((item: any) => item.id === id)
      if (changeFilterItem) {
        setIsOpen((changeFilterItem.isOpen = true))
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
          {dropDownListFilter.map(({ id, title }: any) => (
            <div onClick={handleToggleFilter({ id, title })} key={id}>
              {title}
            </div>
          ))}
          {isOpen && (
            <div className={styles.inner_drop_down_block}>
              <ContainerFilters
                title={itemTitle}
                props={{ setScoresStart, setScoresEnd, scoresStart, scoresEnd, handleApplyFilter }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
