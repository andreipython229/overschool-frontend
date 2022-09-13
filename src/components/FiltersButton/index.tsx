import { FC, useEffect, useRef, useState } from 'react'

import { IconSvg } from '../common/IconSvg/IconSvg'
import { FilterItem } from './FilterItem'
import { ComponentFilter } from 'constants/filtersMaper'
import { filterIconPath } from './config/svgIconsPath'

import styles from '../FiltersButton/filters_btn.module.scss'

interface ICategories {
  id: string | number
  title: string
}

type FiltersButtonT = {
  filteringCategoriesList: ICategories[]
}

export const FiltersButton: FC<FiltersButtonT> = ({ filteringCategoriesList }) => {
  const [toggleDropDown, setToggleDropDown] = useState<boolean>(false)
  const [selectedFilter, setSelectedFilter] = useState<keyof object | null>()

  const handleToggleDropDawnBlock = () => {
    setToggleDropDown(!toggleDropDown)
    setSelectedFilter(null)
  }
  const menuRef = useRef<HTMLDivElement>(null)

  const handleClick = (event: MouseEvent) => {
    const target = event?.target as HTMLHeadingElement

    if (target?.tagName === 'svg' || target?.tagName === 'path') {
      setToggleDropDown(false)
      return
    }

    if (!menuRef.current?.contains(target) && !target?.className?.includes('filter')) {
      setToggleDropDown(false)
    }
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

  return (
    <div className={styles.wrapper} ref={menuRef}>
      <button className={styles.container_btn} onClick={handleToggleDropDawnBlock}>
        <IconSvg width={15} height={17} viewBoxSize="0 0 15 17" path={filterIconPath} />
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
              <div ref={menuRef}>{selectedFilter && <ComponentFilter id={selectedFilter} />}</div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
