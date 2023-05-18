import { FC, useState, useCallback } from 'react'

import { CoursesDataT } from 'types/CoursesT'
import { Input } from 'components/common/Input/Input/Input'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Button } from 'components/common/Button/Button'
import { searchIconPath } from '../config/svgIconsPath'
import { SearchFilterT } from '../../../types/componentsTypes'
import { useDebouncedFilter, useBoolean } from 'customHooks/index'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { filtersSelector } from 'selectors/index'
import { addFilters } from 'store/redux/filters/slice'
import { commonLessonT } from 'types/sectionT'

import style from './search_filter.module.scss'

// type datatToFilter = CoursesDataT[] | commonLessonT

export const SearchFilter: FC<SearchFilterT<any>> = ({ name, header, data, filterTerm }) => {
  const dispatch = useAppDispatch()
  const { filters } = useAppSelector(filtersSelector)
  const [isFilterClosed, { off }] = useBoolean()

  const [itemForFilter, setItemFoFilter] = useState<string>(filters[filterTerm] as string)
  const [term, filteredData, handleChangeTerm] = useDebouncedFilter(data, 'name', itemForFilter)

  const handleChooseItemFoFilter = useCallback((strFoFilter: string) => {
    setItemFoFilter(strFoFilter)
  }, [])

  const handleAddFilter = () => {
    dispatch(addFilters({ [filterTerm]: term }))
    off()
  }

  const dataToShow = filteredData?.filter(item => item.name !== term)

  if (isFilterClosed) return null

  return (
    <div className={style.container}>
      <p className={style.title}>{header}</p>
      <Input name={name} type={'search'} value={term} onChange={handleChangeTerm} placeholder="Начните вводить название">
        <IconSvg width={30} height={30} viewBoxSize="0 0 20 20" path={searchIconPath} />
      </Input>
      <div className={style.wrapper}>
        {dataToShow?.map((item: any, index: number) => (
          <div className={style.category_content} key={item.name + index}>
            <p className={style.category_filter_item} onClick={() => handleChooseItemFoFilter(item.name)}>
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <Button style={{ margin: '0 20px' }} text={'Применить'} variant={'primary'} onClick={handleAddFilter} />
    </div>
  )
}
