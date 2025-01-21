import { ChangeEvent, FC, useEffect, useState, PointerEvent } from 'react'
import { Reorder, useDragControls } from 'framer-motion'

import { studentGroupInfoT } from 'types/studentsGroup'
import { Checkbox } from '../../../common/Checkbox/Checkbox'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { checkedIconPath, doBlockIconPath } from '../config/svgIconsPath'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

import styles from './settingItem.module.scss'
import { Tooltip } from '@mui/material'

interface ISettingItem {
  item: studentGroupInfoT
  handleChecked: (e: ChangeEvent<HTMLInputElement>) => void
}

export const SettingItem: FC<ISettingItem> = ({ item, handleChecked }) => {
  const controls = useDragControls()

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
      {item.name === 'Прогресс' ? (
        <Tooltip title="При выборе этой опции возможна медленная загрузка таблицы">
          <div className={styles.wrapper}>
            {/*<IconSvg*/}
            {/*  styles={{ cursor: 'grab', width: '20px', height: '20px', position: 'absolute', top: '10px', left: '-29px', zIndex: '10' }}*/}
            {/*  width={12}*/}
            {/*  height={18}*/}
            {/*  viewBoxSize={'0 0 12 18'}*/}
            {/*  onPointerDown={onPointerDown}*/}
            {/*  path={doBlockIconPath}*/}
            {/*/>*/}
            <div className={`${styles.wrapper_item} ${item.checked ? styles.wrapper_item_checked : ' '} `}>
              <Checkbox id={item.order.toString()} name={item?.name} onChange={handleChecked} checked={item.checked}>
                <p style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                  {item.name} <ErrorOutlineIcon sx={{color: 'orange'}}/>
                </p>
                <div className={`${styles.wrapper_item_icon} ${item.checked ? styles.wrapper_item_icon_checked : ''}`}></div>
              </Checkbox>
            </div>
          </div>
        </Tooltip>
      ) : (
        <div className={styles.wrapper}>
          {/*<IconSvg*/}
          {/*  styles={{ cursor: 'grab', width: '20px', height: '20px', position: 'absolute', top: '10px', left: '-29px', zIndex: '10' }}*/}
          {/*  width={12}*/}
          {/*  height={18}*/}
          {/*  viewBoxSize={'0 0 12 18'}*/}
          {/*  onPointerDown={onPointerDown}*/}
          {/*  path={doBlockIconPath}*/}
          {/*/>*/}

          <div className={`${styles.wrapper_item} ${item.checked ? styles.wrapper_item_checked : ' '} `}>
            <Checkbox id={item.order.toString()} name={item?.name} onChange={handleChecked} checked={item.checked}>
              <p>{item.name}</p>

              <div className={`${styles.wrapper_item_icon} ${item.checked ? styles.wrapper_item_icon_checked : ''}`}></div>
            </Checkbox>
          </div>
        </div>
      )}
    </Reorder.Item>
  )
}
