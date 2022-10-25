import { FC, useState } from 'react'

import { IconSvg } from '../common/IconSvg/IconSvg'
import { FilterItem } from './FilterItem'
import { ComponentFilter } from 'constants/filtersMaper'
import { FiltersButtonT } from '../../types/componentsTypes'
import { filterIconPath } from './config/svgIconsPath'
import { useMissClickMenu } from '../../customHooks/useMissClickMenu'

import styles from '../FiltersButton/filters_btn.module.scss'

export const FiltersButton: FC<FiltersButtonT> = ({ filteringCategoriesList }) => {
  const [selectedFilter, setSelectedFilter] = useState<keyof object | null>()

  const { menuRef, isOpen, onToggle } = useMissClickMenu()

  const handleToggleDropDawnBlock = () => {
    onToggle()
    setSelectedFilter(null)
  }

  return (
    <div className={styles.wrapper} ref={menuRef}>
      <button className={styles.container_btn} onClick={handleToggleDropDawnBlock}>
        <IconSvg width={15} height={17} viewBoxSize="0 0 15 17" path={filterIconPath} />
        Добавить фильтры
      </button>
      {isOpen && (
        <>
          <div className={styles.drop_down_block}>
            {!selectedFilter ? (
              <>
                <p className={styles.header_dropdown_menu}>ВЫБЕРИТЕ КРИТЕРИЙ ФИЛЬТРАЦИИ</p>
                {filteringCategoriesList.map(({ id, title }) => (
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
