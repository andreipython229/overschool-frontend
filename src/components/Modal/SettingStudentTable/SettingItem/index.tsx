import React, { ChangeEvent, FC, useEffect, useState, PointerEvent } from 'react'
import { Reorder, useDragControls } from 'framer-motion'
import { Checkbox } from '../../../common/Checkbox/Checkbox'
import { DotBlockSvg } from './DotBlockSvg'
import { NoCheckedSvgIcon } from './NoCheckedSvgIcon'
import { CheckedSvgIcon } from './CheckedSvgIcon'
import { SettingItemT } from '../../../../Pages/CoursesStats/CoursesStats';

import styles from './settingItem.module.scss';

interface ISettingItem {
  item: SettingItemT
  settingList: SettingItemT[]
  setSettingsList: (arg: SettingItemT[]) => void
}

export const SettingItem: FC<ISettingItem> = ({ item, settingList, setSettingsList }) => {
  const [checkedList, setIsCheckedList] = useState<SettingItemT[]>([])
  const controls = useDragControls()

  const handleChecked = (event: ChangeEvent<HTMLInputElement>) => {
    if ((checkedList.length === 7 && event.target.checked) || event.target.id === '1' || event.target.id === '2') {
      return
    }
    const checkedItemsList = settingList.map(item => {
      if (item.id.toString() === event.target.id.toString()) {
        return {
          ...item,
          checked: event.target.checked,
        }
      }
      return item
    })
    setSettingsList(checkedItemsList)
  }

  useEffect(() => {
    //settingList.map((item, index) => (item.order = index + 1))
    const isCheckedListItem = settingList.filter(checkedItem => checkedItem.checked)
    setIsCheckedList(isCheckedListItem)
  }, [settingList])

  const onPointerDown = (event: PointerEvent<SVGSVGElement | SVGPathElement>) => {
    controls.start(event)
  }

  return (
    <Reorder.Item
      dragControls={controls}
      dragListener={false}
      draggable={false}
      value={item}
      whileDrag={{
        scale: 1.1,
        boxShadow: 'rgba(0,0,0, 0.12) 0px 1px 3px, rgba(0,0,0, 0.24) 0px 1px 2px',
        borderRadius: '7px',
      }}
    >
      <div className={styles.wrapper}>
        {item?.name !== 'Имя' && item?.name !== 'Email' && <DotBlockSvg onPointerDown={onPointerDown} />}

        <div className={styles.wrapper_item}>
          <Checkbox id={item?.id.toString()} name={item?.name} onChange={handleChecked} checked={item.checked}>
            <p>{item?.name}</p>
            {item.checked ? <CheckedSvgIcon /> : <NoCheckedSvgIcon />}
          </Checkbox>
        </div>
      </div>
    </Reorder.Item>
  )
}
