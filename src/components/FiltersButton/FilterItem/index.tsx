import { FC } from 'react'
import { FilterItemT } from '../../../types/componentsTypes'

import styles from '../FilterItem/filter_item.module.scss'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { arrIconPath } from '../config/svgIconsPath'

export const FilterItem: FC<FilterItemT> = ({ id, title, setSelectedFilter }) => {
  const handleClick = () => {
    id && setSelectedFilter(id as keyof object)
  }

  return (
    <div onClick={handleClick} className={styles.filter_item_container} id={id.toString()}>
      <div className={styles.filter_item_content}>
        {title}
        <IconSvg width={15} height={16} viewBoxSize="0 0 11 11" path={arrIconPath} styles={{ transform: 'rotate(-90deg)' }} />
      </div>
    </div>
  )
}
