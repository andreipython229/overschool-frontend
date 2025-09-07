import React, { FC, useState, useCallback } from 'react'
import { Input } from 'components/common/Input/Input/Input'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Button } from 'components/common/Button/Button'
import { searchIconPath } from '../config/svgIconsPath'
import { SearchFilterT } from '../../../types/componentsTypes'
import { useDebouncedFilter, useBoolean } from 'customHooks/index'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { addFilters } from 'store/redux/filters/slice'
import style from '../SearchFilter/search_filter.module.scss'

export const TeacherFilter: FC<SearchFilterT<any>> = ({ name, header, data, filterTerm, filterKey }) => {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((state: { filters: { [x: string]: any } }) => state.filters['homework'])
  const [isFilterClosed, { off }] = useBoolean()

  const [itemForFilter, setItemForFilter] = useState<string>(filters[filterTerm] as string)
  const [term, filteredData, handleChangeTerm] = useDebouncedFilter(data, 'name', itemForFilter)
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const handleChooseItemForFilter = useCallback((strForFilter: string) => {
    setItemForFilter(strForFilter)
  }, [])

  const handleAddFilter = () => {
    dispatch(addFilters({ key: filterKey, filters: { [filterTerm]: term || '' } }))
    setItemForFilter('')
    setSelectedCategory('')
    off()
  }

  const dataToShow = filteredData?.filter(item => item.name !== term)

  if (isFilterClosed) return null

  return (
    <div className={style.container}>
      <p className={style.title}>{header}</p>
      <Input name={name} type="search" value={term} className={style.inputWrapper} onChange={handleChangeTerm} placeholder="Начните вводить название">
        <IconSvg width={30} height={30} viewBoxSize="0 0 20 20" path={searchIconPath} />
      </Input>
      <div className={style.wrapper}>
        {dataToShow?.map((item: any, index: number) => (
          <div className={style.category_content} key={item.name + index}>
            <p className={style.category_filter_item} onClick={() => handleChooseItemForFilter(item.id as string)}>
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <Button style={{ margin: '0 20px' }} text="Применить" variant="newPrimary" onClick={handleAddFilter} />
    </div>
  )
}
