import { FC } from 'react'

import { IconSvg } from '../../common/IconSvg/IconSvg'
import { FilterItemT } from '../../componentsTypes'
import { arrIconPath } from '../config/svgIconsPath'

import styles from '../FilterItem/filter_item.module.scss'

export const FilterItem: FC<FilterItemT> = ({ id, title, setSelectedFilter }) => {
  const handleClick = () => {
    id && setSelectedFilter(id as keyof object)
  }

  return (
    <div onClick={handleClick} className={styles.filter_item_container} id={id.toString()}>
      {title}
      <IconSvg width={15} height={16} viewBoxSize="0 0 11 11" path={arrIconPath} />
    </div>
  )
}
