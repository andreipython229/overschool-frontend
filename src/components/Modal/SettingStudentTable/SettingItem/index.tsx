import { ChangeEvent, FC, useEffect, useState, PointerEvent, useRef } from 'react'
import { Reorder, useDragControls } from 'framer-motion'

import { studentGroupInfoT } from 'Pages/pageTypes'
import { Checkbox } from '../../../common/Checkbox/Checkbox'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { checkedIconPath, noCheckedIconPath, doBlockIconPath } from '../config/svgIconsPath'

import styles from './settingItem.module.scss'

interface ISettingItem {
  item: studentGroupInfoT
  settingList: studentGroupInfoT[]
  setSettingsList: (arg: studentGroupInfoT[]) => void
}

export const SettingItem: FC<ISettingItem> = ({ item, settingList, setSettingsList }) => {
  const [checkedList, setIsCheckedList] = useState<studentGroupInfoT[]>([])
  const controls = useDragControls()

  const handleChecked = (event: ChangeEvent<HTMLInputElement>) => {
    if ((checkedList.length === 7 && event.target.checked) || event.target.id === '1' || event.target.id === '2') {
      return
    }

    // console.log(event.target, event.currentTarget)

    const checkedItemsList = settingList.map(item => {
      if (item.order.toString() === event.target.id.toString()) {
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
      key={item.order}
      value={item}
      whileDrag={{
        scale: 1.1,
        boxShadow: 'rgba(0,0,0, 0.12) 0px 1px 3px, rgba(0,0,0, 0.24) 0px 1px 2px',
        borderRadius: '7px',
      }}
    >
      <div className={styles.wrapper}>
        {item.name !== 'Имя' && item.name !== 'Email' && (
          <IconSvg
            styles={{ cursor: 'grab', width: '20px', height: '20px', position: 'absolute', top: '10px', left: '-29px', zIndex: '10' }}
            width={12}
            height={18}
            viewBoxSize={'0 0 12 18'}
            onPointerDown={onPointerDown}
            path={doBlockIconPath}
          />
        )}

        <div className={styles.wrapper_item}>
          <Checkbox id={item.order.toString()} name={item?.name} onChange={handleChecked} checked={item.checked}>
            <p>{item.name}</p>
            {item.checked ? (
              <IconSvg width={17} height={17} viewBoxSize={'0 0 17 17'} path={checkedIconPath}>
                <circle cx="8.5" cy="8.5" r="8" fill="#E0D9FC" stroke="#BA75FF" />
              </IconSvg>
            ) : (
              <IconSvg width={17} height={17} viewBoxSize={'0 0 17 17'} path={noCheckedIconPath}>
                <circle cx="8.5" cy="8.5" r="8" fill="#F3F4F6" stroke="#9CA3AF" />
              </IconSvg>
            )}
          </Checkbox>
        </div>
      </div>
    </Reorder.Item>
  )
}
