import React, { FC } from 'react'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { arrowIcon } from '../../../constants/iconSvgConstants'
import { FilterItemT } from '../../componentsTypes'

import styles from '../FilterItem/filter_item.module.scss'

export const FilterItem: FC<FilterItemT> = ({ id, title, setSelectedFilter }) => {
  const handleClick = () => {
    setSelectedFilter(id)
  }

  return (
    <div onClick={handleClick} className={styles.filter_item_container} id={id.toString()}>
      {title}
      <IconSvg width={15} height={16} fill="#9A9A9A" d={arrowIcon} viewBoxSize="0 0 11 11" />
    </div>
  )
}
