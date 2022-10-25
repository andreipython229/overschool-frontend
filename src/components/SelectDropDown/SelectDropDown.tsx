import { FC, memo, useEffect, useState } from 'react'

import { IconSvg } from '../common/IconSvg/IconSvg'
import { initialDropDownList } from '../../constants/dropDownList'
import { arrIconPath, triangleDownIconPath } from './config/svgIconPath'
import { dropDownItem, SelectDropDownT } from '../../types/componentsTypes'
import { useAppDispatch, useAppSelector } from 'store/hooks/index'
import { addFilters } from 'store/redux/filters/slice'
import { filtersSelector } from 'selectors'

import styles from './select_drop_down.module.scss'
import { useMissClickMenu } from '../../customHooks/useMissClickMenu'

const selectTheJobStatus = 'ВЫБЕРИТЕ СТАТУС РАБОТЫ'

export const SelectDropDown: FC<SelectDropDownT> = memo(({ setArrowUsersState }) => {
  const dispatch = useAppDispatch()
  const {
    filters: { status },
  } = useAppSelector(filtersSelector)

  const { menuRef, isOpen, onToggle } = useMissClickMenu()

  const [headerDropDown, setHeaderDropDown] = useState<dropDownItem>(initialDropDownList[0])
  const [dropDownList, setDropDownList] = useState<dropDownItem[]>([])

  const handleChangeStatus = (title: string) => () => {
    const changeFilterStatusList = initialDropDownList.find(item => item.title === title)

    setHeaderDropDown(changeFilterStatusList || initialDropDownList[0])

    const changeDropDownList = initialDropDownList.filter(item => item.title !== title)

    setDropDownList(changeDropDownList)

    if (title === 'Все статусы') {
      setArrowUsersState([])
    } else {
      const newArrowUserState = [].filter(({ status }: any) => status.toLowerCase().trim() === title.toLowerCase())
      setArrowUsersState(newArrowUserState)
    }

    dispatch(addFilters({ status: title }))

    onToggle()
  }

  useEffect(() => {
    const defaultDropDownHeader = initialDropDownList.find(item => item.title === status)

    setHeaderDropDown(defaultDropDownHeader || initialDropDownList[0])

    const defaultDropDownList = initialDropDownList.filter(item => item.title !== status)

    setDropDownList(defaultDropDownList)
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
