import { FC, useEffect, useState } from 'react'
import { Input } from '../Input/Input/Input'
import { Button } from '../Button/Button'
import styles from '../../FiltersButton/Chips/chips.module.scss'
import { IconSvg } from '../IconSvg/IconSvg'
import { crossIconPath } from 'config/commonSvgIconsPath'

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
          type="text"
          value={queryString}
          onChange={e => setQueryString(e.target.value)}
        />
        <Button type="submit" text="Применить" onClick={handleSearch} style={{ cursor: 'pointer' }} />
      </form>
    </div>
  )
}
