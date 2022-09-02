import { FC, useState } from 'react'

import { IconSvg } from '../common/IconSvg/IconSvg'
import { filterSvgIcon } from '../../constants/iconSvgConstants'
import { FilterItem } from './FilterItem'

import styles from '../FiltersButton/filters_btn.module.scss'

interface ICategories {
  id: number
  title: string
  isOpen: boolean
}

type FiltersButtonT = {
  filteringCategoriesList: ICategories[]
}

export const FiltersButton: FC<FiltersButtonT> = ({ filteringCategoriesList }) => {
  const [toggleDropDown, setToggleDropDown] = useState<boolean>(false)

  const handleToggleDropDawnBlock = () => {
    setToggleDropDown(!toggleDropDown)
  }
  return (
    <>
      <button className={styles.container_btn} onClick={handleToggleDropDawnBlock}>
        <IconSvg width={15} height={17} fill="#D1D5DB" d={filterSvgIcon} viewBoxSize="0 0 15 17" />
        Добавить фильтры
      </button>
      {toggleDropDown && (
        <div className={styles.drop_down_block}>
          <p className={styles.header_dropdown_menu}>ВЫБЕРИТЕ КРИТЕРИЙ ФИЛЬТРАЦИИ</p>
          {filteringCategoriesList.map(({ id, title }: ICategories) => (
            <FilterItem key={id} id={id} title={title} />
          ))}
        </div>
      )}
    </>
  )
}
