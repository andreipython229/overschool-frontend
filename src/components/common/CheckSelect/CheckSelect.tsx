import { FC, useState } from 'react'
import { CheckSelectPropsT } from '../../../types/commonComponentsTypes'
import { Checkbox } from 'components/common/Checkbox/Checkbox'
import { IconSvg } from '../IconSvg/IconSvg'
import { checkSelectIconPath } from './config/svgIconsPath'

import styles from './checkSelect.module.scss'

export const CheckSelect: FC<CheckSelectPropsT> = ({ text, children }) => {
  const [openChildren, setOpenChildren] = useState<boolean>(false)
  const [checkbox, setCheckbox] = useState<boolean>(false)

  const onChangeCheckbox = () => {
    setCheckbox(!checkbox)
  }

  const handleSetOpenChildren = () => {
    setOpenChildren(!openChildren)
  }

  const activeClass = openChildren ? styles.content_arrow_open : styles.content_arrow
  return (
    <>
      <div style={checkbox ? { backgroundColor: '#F5EBFF' } : { backgroundColor: '#F6F6F6' }} className={styles.container}>
        <div className={styles.content}>
          <Checkbox id={'checkbox'} name={'checkbox'} checked={checkbox} onChange={onChangeCheckbox} />
          <span>{text}</span>
          <IconSvg
            width={14}
            height={8}
            viewBoxSize="0 0 14 8"
            className={activeClass}
            functionOnClick={handleSetOpenChildren}
            path={checkSelectIconPath}
          />
        </div>
      </div>
      {children}
    </>
  )
}
