import { FC, memo, useEffect, useState } from 'react'

import { IconSvg } from '../common/IconSvg/IconSvg'
import { initialDropDownList } from '../../constants/dropDownList'
import { arrowIcon, triangleDownDownIcon } from '../../constants/iconSvgConstants'
import { dropDownItem, SelectDropDownT } from '../componentsTypes'
import { useBoolean } from '../../customHooks/useBoolean'

import styles from './select_drop_down.module.scss'

const selectTheJobStatus = 'ВЫБЕРИТЕ СТАТУС РАБОТЫ'

export const SelectDropDown: FC<SelectDropDownT> = memo(({ setArrowUsersState }) => {
  const [isOpen, { onToggle, on }] = useBoolean()

  const [headerDropDown, setHeaderDropDown] = useState<dropDownItem>(initialDropDownList[0])
  const [dropDownList, setDropDownList] = useState<dropDownItem[]>([])

  const handleChangeStatus =
    ({ title }: any) =>
    () => {
      const changeFilterStatusList = initialDropDownList.find((item: dropDownItem): boolean => item.title === title)
      setHeaderDropDown(changeFilterStatusList || initialDropDownList[0])
      const changeDropDownList = initialDropDownList.filter((item: dropDownItem) => item.title !== title)
      setDropDownList(changeDropDownList)
      if (title === 'Все статусы') {
        setArrowUsersState([])
      } else {
        const newArrowUserState = [].filter(({ status }: any) => status.toLowerCase().trim() === title.toLowerCase())
        setArrowUsersState(newArrowUserState)
      }

      on()
    }

  useEffect(() => {
    const defaultDropDownHeader = initialDropDownList.find((item: dropDownItem): boolean => item.title === 'Все статусы')
    setHeaderDropDown(defaultDropDownHeader || initialDropDownList[0])
    const defaultDropDownList = initialDropDownList.filter((item: dropDownItem) => item.title !== 'Все статусы')
    setDropDownList(defaultDropDownList)
  }, [])

  return (
    <div className={styles.wrapper}>
      <p onClick={onToggle} className={`${styles[headerDropDown.bg]} ${styles.header_dropdown_menu}`}>
        <IconSvg
          width={headerDropDown.icon.width}
          height={headerDropDown.icon?.height}
          fill={headerDropDown.icon?.fill}
          d={headerDropDown.icon?.d}
          viewBoxSize={headerDropDown.viewBoxSize}
        />

        {headerDropDown?.title}
        <span className={isOpen ? styles.rotate_arrow : ''}>
          <IconSvg width={25} height={25} fill="#9A9A9A" d={arrowIcon} viewBoxSize="0 0 12 15" />
        </span>
      </p>
      {isOpen && (
        <div className={styles.drop_down_item_container}>
          <div className={styles.triangle}>
            <IconSvg width={30} height={30} fill="#FFFFFF" d={triangleDownDownIcon} viewBoxSize="0 0 20 20" />
          </div>
          <p>{selectTheJobStatus}</p>
          {dropDownList.map(({ id, icon, title }) => (
            <div onClick={handleChangeStatus({ title })} className={styles.drop_down_item} key={id}>
              <IconSvg width={icon.width} height={icon.height} d={icon.d} fill={icon.fill} />
              <span>{title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
})
