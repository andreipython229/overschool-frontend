import React, { FC, useState, useCallback } from 'react'
import { Button } from 'components/common/Button/Button'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { addFilters } from 'store/redux/filters/slice'
import { useBoolean } from '../../../customHooks'
import styles from '../FilterComponent/filter_component.module.scss'

interface ShowDeletedFilterProps {
  filterKey: string
}

export const ShowDeletedFilter: FC<ShowDeletedFilterProps> = ({ filterKey }) => {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(state => state.filters[filterKey])
  const [isActive, setActive] = useState<boolean>(filters ? filters['hide_deleted'] == 'true' : false)

  const handleApplyFilter = () => {
    setActive(!isActive)
    dispatch(addFilters({ key: filterKey, filters: { hide_deleted: `${!isActive}` } }))
  }

  return (
    <div className={styles.wrapper}>
      <p>Скрыть или показать удалённых студентов</p>
      <div className={styles.filterButtonContainer}>
        <Button
          className={styles.filterButton}
          text={isActive ? 'Показать удаленные' : 'Скрыть удаленные'}
          variant="newPrimary"
          onClick={handleApplyFilter}
        />
        {/*<Button text="Применить" variant="primary" onClick={handleApplyFilter} />*/}
      </div>
    </div>
  )
}
