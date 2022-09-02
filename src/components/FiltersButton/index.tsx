import React, { FC, useEffect, useRef, useState } from 'react'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { filterSvgIcon } from '../../constants/iconSvgConstants'
import { FilterItem } from './FilterItem'

import styles from '../FiltersButton/filters_btn.module.scss'

interface ICategories {
  id: string | number
  title: string
  data: string
}

type FiltersButtonT = {
  filteringCategoriesList: ICategories[]
}

export const FiltersButton: FC<FiltersButtonT> = ({ filteringCategoriesList }) => {
  const [toggleDropDown, setToggleDropDown] = useState<boolean>(false)
  const [selectedFilter, setSelectedFilter] = useState<keyof object>()

  const handleToggleDropDawnBlock = () => {
    setToggleDropDown(!toggleDropDown)
  }

  const menuRef = useRef<HTMLDivElement>(null)

  const handleClick = (event: MouseEvent) => {
    const target = event?.target as HTMLHeadingElement
    if (!menuRef.current?.contains(target)) {
      setToggleDropDown(false)
    }
    //console.log(menuRef?.current?.childNodes)
  }

  const keydownHandler = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') {
      setToggleDropDown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', keydownHandler)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', keydownHandler)
    }
  }, [])

  const obj = {
    12: <div>Total score</div>,
    13: <div>Progress</div>,
    14: <div>Last activity</div>,
    15: <div>Comments</div>,
  }

  return (
    <div ref={menuRef}>
      <button className={styles.container_btn} onClick={handleToggleDropDawnBlock}>
        <IconSvg width={15} height={17} fill="#D1D5DB" d={filterSvgIcon} viewBoxSize="0 0 15 17" />
        Добавить фильтры
      </button>
      {toggleDropDown && (
        <>
          <div className={styles.drop_down_block}>
            {!selectedFilter ? (
              <>
                <p className={styles.header_dropdown_menu}>ВЫБЕРИТЕ КРИТЕРИЙ ФИЛЬТРАЦИИ</p>
                {filteringCategoriesList.map(({ id, title }: ICategories) => (
                  <FilterItem id={id} key={id} title={title} setToggleDropDown={setToggleDropDown} setSelectedFilter={setSelectedFilter} />
                ))}
              </>
            ) : (
              <div onClick={() => setSelectedFilter(undefined)}>{selectedFilter && obj[selectedFilter]}</div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
