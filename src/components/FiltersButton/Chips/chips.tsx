import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { removeFilter, clearFilters } from 'store/redux/filters/slice'
import { filtersSelector } from 'selectors/index'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { crossIconPath } from 'config/commonSvgIconsPath'

import styles from './chips.module.scss'

type ChipsVal = {
  [key: string]: string
}

const chipsVal: ChipsVal = {
  course_name: 'курс',
  homework_name: 'задание',
  start_mark: 'оценка от',
  end_mark: 'оценка до',
  start_date: 'последний ответ с',
  end_date: 'последний ответ до',
}

export const ChipsComponent = () => {
  const dispatch = useDispatch()
  const { filters } = useSelector(filtersSelector)
  const chips = Object.entries(filters).filter(([key, _]) => key !== 'status')

  const handleRemoveChip = (filterTerm: string) => {
    dispatch(removeFilter(filterTerm))
  }

  const isFiltersAdded = chips.some(([_, value]) => value !== '')

  return (
    <>
      <div className={styles.chipsContainer}>
        {chips.map(([filterTerm, chipText]) => (
          <>
            {chipText && (
              <div key={filterTerm} className={styles.chip}>
                <span className={styles.chips_filter}>{chipsVal[filterTerm]}:</span>
                <span>{chipText}</span>
                <button className={styles.removeButton} onClick={() => handleRemoveChip(filterTerm)}>
                  <IconSvg width={8} height={8} viewBoxSize="0 0 16 12" path={crossIconPath} />
                </button>
              </div>
            )}
          </>
        ))}
        {isFiltersAdded && (
          <button className={styles.removeChips} onClick={() => dispatch(clearFilters())}>
            <IconSvg width={12} height={11} viewBoxSize="0 0 15 13" path={crossIconPath} />
          </button>
        )}
      </div>
    </>
  )
}
