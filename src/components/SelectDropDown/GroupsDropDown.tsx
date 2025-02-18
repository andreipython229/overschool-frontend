import React, { FC, memo, useEffect, useState } from 'react'

import { IconSvg } from '../common/IconSvg/IconSvg'
import { arrIconPath, triangleDownIconPath } from './config/svgIconPath'
import { GroupsDropDownT } from '../../types/componentsTypes'
import { StGroupT } from '../../types/CoursesT'
import { useAppSelector } from 'store/hooks/index'

import styles from './select_drop_down.module.scss'
import { useMissClickMenu } from '../../customHooks/useMissClickMenu'
import { crossIconPath } from '../../config/commonSvgIconsPath'

const selectGroup = 'ВЫБЕРИТЕ ГРУППУ'

export const GroupsDropDown: FC<GroupsDropDownT> = memo(({ dropdownData, course_id, selected_group, onChangeGroup }) => {
  const { menuRef, isOpen, onToggle } = useMissClickMenu()
  const [headerDropDown, setHeaderDropDown] = useState<StGroupT>()
  const [dropDownList, setDropDownList] = useState<StGroupT[]>([])

  const changeGroup = (id: number | null) => {
    const changeHeader = dropdownData.find(item => item.group_id === id)
    setHeaderDropDown(changeHeader)

    const changeDropDownList = dropdownData.filter(item => item.group_id !== id)

    setDropDownList(changeDropDownList)
  }

  const handleChangeGroup = (id: number | null) => () => {
    changeGroup(id)
    typeof onChangeGroup !== 'undefined' && onChangeGroup(course_id, id)
    onToggle()
  }

  useEffect(() => {
    changeGroup(selected_group)
  }, [selected_group])

  return (
    <div className={styles.wrapper}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div ref={menuRef} onClick={onToggle} className={`${styles['bg_color_hamburger']} ${styles.header_groups_down}`}>
          <div>
            <p style={{ marginLeft: '10px' }}> {headerDropDown ? headerDropDown.name : 'Нажмите для выбора группы'}</p>
          </div>
          {/* <span
                        className={isOpen ? `${styles['arrow_humburger']} ${styles.rotate_arrow}` : `${styles['arrow_humburger']}`}>
                     <IconSvg width={15} height={15} viewBoxSize="0 0 15 15"
                              path={[{d: arrIconPath[0].d, fill: '#9A9A9A'}]}/>
                    </span> */}
        </div>
        <div style={{ marginLeft: 10, color: 'grey' }} onClick={handleChangeGroup(null)}>
          <IconSvg width={30} height={30} viewBoxSize="0 0 64 64" path={crossIconPath} />
        </div>
      </div>
      {isOpen && (
        <div className={styles.drop_down_item_container}>
          <div className={styles.triangle}>
            <IconSvg width={30} height={30} viewBoxSize="0 0 20 20" path={triangleDownIconPath} />
          </div>
          <p>{selectGroup}</p>
          {dropDownList.map(({ group_id, name }) => (
            <div key={group_id} className={styles.drop_down_item_content}>
              <div onClick={handleChangeGroup(group_id)} className={styles.drop_down_item}>
                <span style={{ marginLeft: '10px' }}>{name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
})
