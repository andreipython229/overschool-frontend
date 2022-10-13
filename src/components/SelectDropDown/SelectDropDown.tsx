import { FC, memo, useEffect, useState } from 'react'

import { IconSvg } from '../common/IconSvg/IconSvg'
import { initialDropDownList } from '../../constants/dropDownList'
import { arrIconPath, triangleDownIconPath } from './config/svgIconPath'
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
    const defaultDropDownHeader = initialDropDownList.find((item): boolean => item.title === 'Все статусы')
    setHeaderDropDown(defaultDropDownHeader || initialDropDownList[0])
    const defaultDropDownList = initialDropDownList.filter(item => item.title !== 'Все статусы')
    setDropDownList(defaultDropDownList)
  }, [])

  return (
    <div className={styles.wrapper}>
      <p onClick={onToggle} className={`${styles[headerDropDown.bg]} ${styles.header_dropdown_menu}`}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ marginRight: '10px', transform: 'translateY(5%)' }}> {headerDropDown.icon}</p>
          <p> {headerDropDown?.title}</p>
        </div>
        <span className={isOpen ? `${styles[headerDropDown.arrow]} ${styles.rotate_arrow}` : `${styles[headerDropDown.arrow]}`}>
          <IconSvg width={15} height={15} viewBoxSize="0 0 15 15" path={[{ d: arrIconPath[0].d, fill: headerDropDown.arrow_fill }]} />
        </span>
      </p>
      {isOpen && (
        <div className={styles.drop_down_item_container}>
          <div className={styles.triangle}>
            <IconSvg width={30} height={30} viewBoxSize="0 0 20 20" path={triangleDownIconPath} />
          </div>
          <p>{selectTheJobStatus}</p>
          {dropDownList.map(({ id, icon, title }) => (
            <div onClick={handleChangeStatus({ title })} className={styles.drop_down_item} key={id}>
              {icon}
              <span>{title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
})
