import React, { FC, useEffect, useRef, useState } from 'react'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { filterSvgIcon } from '../../constants/iconSvgConstants'
import { FilterItem } from './FilterItem'
import { ComponentFilter } from 'constants/filtersMaper'
import { FiltersButtonT, ICategories } from '../componentsTypes'
import { useBoolean } from '../../customHooks/useBoolean'

import styles from '../FiltersButton/filters_btn.module.scss'

export const FiltersButton: FC<FiltersButtonT> = ({ filteringCategoriesList }) => {
  const [isOpen, { onToggle, on }] = useBoolean()

  const [selectedFilter, setSelectedFilter] = useState<keyof object | null>()

  const handleToggleDropDawnBlock = () => {
    onToggle()
    setSelectedFilter(null)
  }
  const menuRef = useRef<HTMLDivElement>(null)

  const handleClick = (event: MouseEvent) => {
    const target = event?.target as HTMLHeadingElement

    if (target?.tagName === 'svg' || target?.tagName === 'path') {
      on()
      return
    }

    if (!menuRef.current?.contains(target) && !target?.className?.includes('filter')) {
      on()
    }
  }

  const keydownHandler = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') {
      on()
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
        <IconSvg width={15} height={17} fill="#D1D5DB" d={filterSvgIcon} viewBoxSize="0 0 15 17" />
        Добавить фильтры
      </button>
      {isOpen && (
        <>
          <div className={styles.drop_down_block}>
            {!selectedFilter ? (
              <>
                <p className={styles.header_dropdown_menu}>ВЫБЕРИТЕ КРИТЕРИЙ ФИЛЬТРАЦИИ</p>
                {filteringCategoriesList.map(({ id, title }: ICategories) => (
                  <FilterItem id={id} key={id} title={title} setSelectedFilter={setSelectedFilter} />
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
