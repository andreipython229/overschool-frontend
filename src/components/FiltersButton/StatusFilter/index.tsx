import { IDropDownListItem, initialDropDownList } from 'constants/dropDownList'
import styles from './statusFilter.module.scss'
import { FC, useEffect, useState } from 'react'
import { dropDownItem } from 'types/componentsTypes'
import { useAppSelector } from 'store/hooks'
import { Button } from 'components/common/Button/Button'

interface IStatusFilter {
  onChangeStatus?: (status: string) => void
}

export const StatusFilter: FC<IStatusFilter> = ({ onChangeStatus }) => {
  const filters = useAppSelector(state => state.filters['homework'])
  const [dropDownList, setDropDownList] = useState<IDropDownListItem[]>([])
  const [headerDropDown, setHeaderDropDown] = useState<dropDownItem>(initialDropDownList[0])

  const changeStatus = (title: string) => {
    const changeFilterStatusList = initialDropDownList.find(item => item.title === title)

    setHeaderDropDown(changeFilterStatusList || initialDropDownList[0])

    const changeDropDownList = initialDropDownList.filter(item => item.title !== title)

    setDropDownList(changeDropDownList)
  }

  const handleChangeStatus = (title: string) => () => {
    changeStatus(title)

    typeof onChangeStatus !== 'undefined' && onChangeStatus(title)
  }

  useEffect(() => {
    changeStatus(`${filters?.status}`)
  }, [filters?.status])

  return (
    <div className={styles.statusContainer}>
      <p className={styles.statusContainer_title}>По статусу: </p>
      {dropDownList.map(({ id, icon, title, variant }) => (
        <Button key={id} variant={variant || 'newPrimary'} text={title} onClick={handleChangeStatus(title)} className={styles.selectButton} />
      ))}
    </div>
  )
}
