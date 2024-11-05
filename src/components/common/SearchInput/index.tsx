import { FC, useEffect, useState } from 'react'
import { Input } from '../Input/Input/Input'
import { Button } from '../Button/Button'
import styles from '../../FiltersButton/Chips/chips.module.scss'
import { IconSvg } from '../IconSvg/IconSvg'
import { crossIconPath } from 'config/commonSvgIconsPath'
import { SearchIconPath } from 'assets/Icons/svgIconPath'

interface ISearchInput {
  value: string
  setValue: (arg: string) => void
}

export const SearchInput: FC<ISearchInput> = ({ value, setValue }) => {
  const [queryString, setQueryString] = useState<string>('')
  const [filterData, setFilterData] = useState<string>('')

  const handleSearch = () => {
    setFilterData(queryString)
  }

  useEffect(() => {
    if (value !== filterData) {
      setValue(filterData)
    }
  }, [filterData])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '10px' }}>
      {filterData.length > 0 && (
        <div className={styles.chip} style={{ width: 'min-content' }}>
          <span className={styles.chips_filter}>Фильтр:</span>
          <span>{filterData}</span>
          <button
            className={styles.removeButton}
            onClick={() => {
              setFilterData('')
            }}
          >
            <IconSvg width={8} height={8} viewBoxSize="0 0 16 12" path={crossIconPath} />
          </button>
        </div>
      )}
      <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', width: '100%', marginBottom: '25px', alignItems: 'center', gap: '5px' }}>
        <Input
          id="search-input"
          name="search-input"
          placeholder="Фильтр по ключевому слову"
          type="search"
          value={queryString}
          onChange={e => setQueryString(e.target.value)}
        >
          <IconSvg width={24} height={24} viewBoxSize="0 0 24 24" path={SearchIconPath} className={styles.searchIcon}>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0D28BB" />
                <stop offset="100%" stopColor="#357EEB" />
              </linearGradient>
            </defs>
          </IconSvg>
        </Input>
        <Button type="submit" variant='newPrimary' text="Применить" onClick={handleSearch} style={{ cursor: 'pointer' }} />
      </form>
    </div>
  )
}
