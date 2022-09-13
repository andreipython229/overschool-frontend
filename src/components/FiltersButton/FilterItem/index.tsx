import { FC } from 'react'

import { IconSvg } from '../../common/IconSvg/IconSvg'
import { arrIconPath } from '../config/svgIconsPath'

import styles from '../FilterItem/filter_item.module.scss'

type FilterItem = {
  id: string | number
  title: string
  setToggleDropDown: (args: boolean) => void
  setSelectedFilter: (args: any) => void
}

export const FilterItem: FC<FilterItem> = ({ id, title, setToggleDropDown, setSelectedFilter }) => {
  const handleClick = (event: any) => {
    setSelectedFilter(id)
    //setToggleDropDown(false)
  }

  return (
    <div onClick={handleClick} className={styles.filter_item_container} id={id.toString()}>
      {title}
      <IconSvg width={15} height={16} viewBoxSize="0 0 11 11" path={arrIconPath} />
    </div>
  )
}
