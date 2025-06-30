import React, { FC } from 'react'
import { Button } from 'components/common/Button/Button'
import { useAppDispatch } from 'store/hooks'
import { addFilters } from 'store/redux/filters/slice'
import { useBoolean } from 'customHooks/index'

import styles from '../FilterAccess/filter_access.module.scss'

interface AccessFilterProps {
  filterKey: string
}

export const AccessFilter: FC<AccessFilterProps> = ({ filterKey }) => {
  const dispatch = useAppDispatch()
  const [isFilterClosed, { off }] = useBoolean()

  const handleAddFilter = (hasAccess: string) => {
    dispatch(addFilters({ key: filterKey, filters: { access: hasAccess, p: 1 } }))
    off()
  }
  if (isFilterClosed) return null

  return (
    <div className={styles.wrapper}>
      <p>Фильтровать студентов по наличию доступа</p>
      <div className={styles.filterButtonContainer}>
        <Button
          className={styles.filterButton}
          text={'Доступ активен'}
          variant="newPrimary"
          onClick={() => handleAddFilter('true')}
        />
        <Button
          className={styles.filterButton}
          text={'Доступ неактивен'}
          variant="newPrimary"
          onClick={() => handleAddFilter('false')}
        />
      </div>
    </div>
  )
}
