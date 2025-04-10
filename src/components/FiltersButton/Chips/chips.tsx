import { FC, useEffect } from 'react'

import { removeFilter, clearFilters } from 'store/redux/filters/slice'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { crossIconPath } from 'config/commonSvgIconsPath'
import { useAppDispatch } from 'store/hooks'

import styles from './chips.module.scss'
import { CrossIconPath } from 'assets/Icons/svgIconPath'

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
        {chips?.map(
          ([filterTerm, chipText], index) =>
            filterTerm !== 'search_value' &&
            filterTerm !== 'sort_by' &&
            filterTerm !== 'sort_order' &&
            chipText && (
              <div key={String(index) + chipText}>
                <div key={index} className={styles.chip}>
                  <span className={styles.chips_filter}>
                    {filterTerm.includes('course_name') ? 'Курс' : filterTerm.includes('group_name') ? 'Группа' : chipsVal[filterTerm]}:
                  </span>
                  <span>{chipText == 'true' ? <>Да</> : chipText == 'false' ? <>Нет</>: <>{chipText}</>}</span>
                  <button className={styles.removeButton} onClick={() => handleRemoveChip(filterTerm)}>
                    <IconSvg width={8} height={8} styles={{ color: '#fff' }} viewBoxSize="0 0 18 16" path={CrossIconPath} />
                  </button>
                </div>
              </div>
            ),
        )}
        {isFiltersAdded && (
          <button className={styles.removeChips} onClick={() => dispatch(clearFilters(filterKey))}>
            <IconSvg width={12} height={12} styles={{ color: '#fff' }} viewBoxSize="0 0 18 16" path={CrossIconPath} />
          </button>
        )}
      </div>
    </>
  )
}
