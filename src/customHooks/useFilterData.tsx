import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { anyDataValueT } from '../types/dataValueT'

type dataListT = { [key: string]: anyDataValueT }
type returnableDataT = [string, dataListT[], (e: ChangeEvent<HTMLInputElement>) => void]

export const useFilterData = (dataList: dataListT[], searchString: string): returnableDataT => {
  const [searchParams, setSearchParams] = useState<string>('')
  const [foundData, setFoundData] = useState<dataListT[]>(dataList)

  useEffect(() => {
    dataList && setFoundData(dataList)
  }, [dataList])

  const filterData = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value

    if (keyword !== '') {
      const results = dataList.filter(item => {
        return `${item[searchString]}`.toLowerCase().startsWith(keyword.toLowerCase())
      })
      setFoundData(results)
    } else {
      setFoundData(dataList)
    }

    setSearchParams(keyword)
  }, [])

  return [searchParams, foundData, filterData]
}
