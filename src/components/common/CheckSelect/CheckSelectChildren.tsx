import { FC, memo, useState } from 'react'

import { CheckSelectChildrenPropsT } from '../commonComponentsTypes'
import { Checkbox } from 'components/common/Checkbox/Checkbox'
import { IconSvg } from '../IconSvg/IconSvg'
import { checkSelectChildIconPath } from './config/svgIconsPath'

import styles from './checkSelect.module.scss'

export const CheckSelectChildren: FC<CheckSelectChildrenPropsT> = memo(({ text }) => {
  const [checkbox, setCheckbox] = useState<boolean>(false)

  const handlerCheckbox = () => {
    setCheckbox(!checkbox)
  }
  return (
    <div style={checkbox ? { backgroundColor: '#F5EBFF', margin: '20px 0 20px 0' } : { backgroundColor: '#F6F6F6', margin: '20px 0 20px 0' } } className={styles.selectChildren}>
      <div className={styles.selectChildren_content}>
        <Checkbox id={'lesson'} name={'lesson'} checked={checkbox} onChange={handlerCheckbox} />
        <div className={styles.selectChildren_content_title}>
          <span>{text}</span>
          <div>
            <IconSvg width={21} height={21} viewBoxSize="0 0 21 21" path={checkSelectChildIconPath} />
          </div>
        </div>
      </div>
    </div>
  )
})
