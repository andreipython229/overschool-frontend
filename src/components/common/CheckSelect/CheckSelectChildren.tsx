import { FC, memo, useState } from 'react'
import { CheckSelectChildrenPropsT } from '../commonComponentsTypes'
import { Checkbox } from 'components/common/Checkbox/Checkbox'
import { checkSelectChildrenSvgIcon } from './constants/svgIcons'
import { IconSvg } from '../IconSvg/IconSvg'

import styles from './checkSelect.module.scss'

export const CheckSelectChildren: FC<CheckSelectChildrenPropsT> = memo(({ text }) => {
  const [checkbox, setCheckbox] = useState<boolean>(false)

  const handlerCheckbox = () => {
    setCheckbox(!checkbox)
  }
  return (
    <div style={checkbox ? { backgroundColor: '#F5EBFF' } : { backgroundColor: '#F6F6F6' }} className={styles.selectChildren}>
      <div className={styles.selectChildren_content}>
        <Checkbox id={'lesson'} name={'lesson'} checked={checkbox} onChange={handlerCheckbox} />
        <div>
          <span>{text}</span>
          <div>
            <IconSvg
              width={21}
              height={21}
              viewBoxSize="0 0 21 21"
              stroke="#9884AC"
              d={checkSelectChildrenSvgIcon}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </div>
        </div>
      </div>
    </div>
  )
})
