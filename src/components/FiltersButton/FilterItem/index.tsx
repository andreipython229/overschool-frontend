import React, { FC } from 'react'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { arrowIcon } from '../../../constants/iconSvgConstants'

import styles from '../FilterItem/filter_item.module.scss'

type FilterItem = {
  id: number
  title: string
}

export const FilterItem: FC<FilterItem> = ({ id, title }) => {
  return (
    <div className={styles.filter_item_container} id={id.toString()}>
      {title}
      <IconSvg width={15} height={16} fill="#9A9A9A" d={arrowIcon} viewBoxSize="0 0 11 11" />
    </div>
  )
}
