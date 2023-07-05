import { FC } from 'react'

import { removeFilter, clearFilters } from 'store/redux/filters/slice'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { crossIconPath } from 'config/commonSvgIconsPath'
import { useAppDispatch } from 'store/hooks'

import styles from './chips.module.scss'

type chipsComponentT = {
  filters: { [key: string]: string | number }
  chipsVal: { [key: string]: string }
  filterKey: string
}

export const ChipsComponent: FC<chipsComponentT> = ({ filters, filterKey, chipsVal }) => {
  const dispatch = useAppDispatch()
  const chips = filters && Object.entries(filters).filter(([key, _]) => key !== 'status')

  const handleRemoveChip = (filterTerm: string) => {
    dispatch(removeFilter({ key: filterKey, filterName: filterTerm }))
  }

  const isFiltersAdded = chips?.some(([_, value]) => value !== '')

  return (
    <>
      <div className={styles.chipsContainer}>
        {chips?.map(([filterTerm, chipText]) => (
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
          <button className={styles.removeChips} onClick={() => dispatch(clearFilters(filterKey))}>
            <IconSvg width={12} height={11} viewBoxSize="0 0 15 13" path={crossIconPath} />
          </button>
        )}
      </div>
    </>
  )
}
