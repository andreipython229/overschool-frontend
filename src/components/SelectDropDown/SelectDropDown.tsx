import { FC, memo, useEffect, useState } from 'react'

import { IconSvg } from '../common/IconSvg/IconSvg'
import { arrIconPath, triangleDownIconPath } from './config/svgIconPath'
import { dropDownItem, SelectDropDownT } from '../../types/componentsTypes'
import { useAppSelector } from 'store/hooks/index'
import { filtersSelector } from 'selectors'

import styles from './select_drop_down.module.scss'
import { useMissClickMenu } from '../../customHooks/useMissClickMenu'

const selectTheJobStatus = 'ВЫБЕРИТЕ СТАТУС РАБОТЫ'

export const SelectDropDown: FC<SelectDropDownT> = memo(({ dropdownData, onChangeStatus }) => {
  const {
    filters: { status },
  } = useAppSelector(filtersSelector)

  const { menuRef, isOpen, onToggle } = useMissClickMenu()

  const [headerDropDown, setHeaderDropDown] = useState<dropDownItem>(dropdownData[0])
  const [dropDownList, setDropDownList] = useState<dropDownItem[]>([])

  const changeStatus = (title: string) => {
    const changeFilterStatusList = dropdownData.find(item => item.title === title)

    setHeaderDropDown(changeFilterStatusList || dropdownData[0])

    const changeDropDownList = dropdownData.filter(item => item.title !== title)

    setDropDownList(changeDropDownList)
  }

  const handleChangeStatus = (title: string) => () => {
    changeStatus(title)

    typeof onChangeStatus !== 'undefined' && onChangeStatus(title)

    onToggle()
  }

  useEffect(() => {
    changeStatus(`${status}`)
  }, [status])

  return (
    <div ref={menuRef} className={styles.wrapper}>
      <div onClick={onToggle} className={`${styles[headerDropDown.bg]} ${styles.header_dropdown_menu}`}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ marginRight: '10px', transform: 'translateY(5%)' }}> {headerDropDown.icon}</p>
          <p> {headerDropDown?.title}</p>
        </div>
        <span className={isOpen ? `${styles[headerDropDown.arrow]} ${styles.rotate_arrow}` : `${styles[headerDropDown.arrow]}`}>
          <IconSvg width={15} height={15} viewBoxSize="0 0 15 15" path={[{ d: arrIconPath[0].d, fill: headerDropDown.arrow_fill }]} />
        </span>
      </div>
      {isOpen && (
        <div className={styles.drop_down_item_container}>
          <div className={styles.triangle}>
            <IconSvg width={30} height={30} viewBoxSize="0 0 20 20" path={triangleDownIconPath} />
          </div>
          <p>{selectTheJobStatus}</p>
          {dropDownList.map(({ id, icon, title }) => (
            <div onClick={handleChangeStatus(title)} className={styles.drop_down_item} key={id}>
              {icon}
              <span>{title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
})
