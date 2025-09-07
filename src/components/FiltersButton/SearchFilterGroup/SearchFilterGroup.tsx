import React, { FC, useState, useCallback } from 'react'

import { Input } from 'components/common/Input/Input/Input'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Button } from 'components/common/Button/Button'
import { searchIconPath } from '../config/svgIconsPath'
import { SearchFilterT } from '../../../types/componentsTypes'
import { useDebouncedFilter, useBoolean } from 'customHooks/index'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { addFilters } from 'store/redux/filters/slice'

import style from './search_filter.module.scss'

export const SearchFilterGroup: FC<SearchFilterT<any>> = ({ name, header, data, filterTerm, filterKey }) => {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(state => state.filters['homework'])
  const [isFilterClosed, { off }] = useBoolean()

  // значение ключа group_name_{i}_{j}
  const [itemForFilter, setItemForFilter] = useState<string>(filters ? (filters[filterTerm] as string) : '')
  // полное наименование ключа с индексами group_name_{i}_{j}
  const [termForFilter, setTermForFilter] = useState<string>(filterTerm as string)

  // значение ключа course_name_{i}_{j}
  const [courseForFilter, setCourseForFilter] = useState<string>('')
  // полное наименование ключа с индексами course_name_{i}_{j}
  const [courseTermForFilter, setCourseTermForFilter] = useState<string>('course_name_0')

  const [term, filteredData, handleChangeTerm] = useDebouncedFilter(data, 'name', itemForFilter)

  const handleChooseItemForFilter = useCallback((groupForFilter: string, courseForFilter: string, subIndex: number, indexForFilter: number) => {
    setItemForFilter(groupForFilter)
    setTermForFilter(`${filterTerm}_${subIndex}_${indexForFilter}`)
    setCourseForFilter(courseForFilter)
    setCourseTermForFilter(`course_name_${subIndex}_${indexForFilter}`)
  }, [])

  const handleAddFilter = () => {
    // отправка в redux и последующая фильтрация по параметру group_name_{i}_{j}
    dispatch(addFilters({ key: filterKey, filters: { [termForFilter]: term || '' } }))
    // отправка в redux и последующая фильтрация по параметру course_name_{i}_{j}
    dispatch(addFilters({ key: filterKey, filters: { [courseTermForFilter]: courseForFilter || '' } }))
    setItemForFilter('')
    setTermForFilter('')
    off()
  }

  // отфилильтрованный словарь с инфой по группам
  const dataToShow = filteredData?.filter(item => item.name !== term)

  // расброска групп по крусам
  const groupByCourseName = (data: any[]) => {
    return data.reduce(
      (acc, item) => {
        const courseName = item.course_name
        if (!acc[courseName]) {
          acc[courseName] = []
        }
        acc[courseName].push(item)
        return acc
      },
      {} as { [key: string]: any[] },
    )
  }

  // отфильтрованные группы разбросанные по курсам
  const groupedData = dataToShow ? groupByCourseName(dataToShow) : null

  if (isFilterClosed) return null

  return (
    <div className={style.container}>
      <p className={style.title}>{header}</p>
      <Input name={name} type="search" value={term} className={style.inputWrapper} onChange={handleChangeTerm} placeholder="Начните вводить название">
        <IconSvg width={30} height={30} viewBoxSize="0 0 20 20" path={searchIconPath} />
      </Input>
      <div className={style.wrapper}>
        {groupedData &&
          Object.keys(groupedData).map((courseName, index) => (
            <div key={courseName + index}>
              <div className={style.category_filter_title}>{courseName}</div>
              {groupedData[courseName].map((item: any, itemIndex: number) => (
                <div className={style.category_content} key={item.name}>
                  <p className={style.category_filter_item} onClick={() => handleChooseItemForFilter(item.name, courseName, index, itemIndex)}>
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          ))}
      </div>
      <Button style={{ margin: '0 20px' }} text="Применить" variant="newPrimary" onClick={handleAddFilter} />
    </div>
  )
}
