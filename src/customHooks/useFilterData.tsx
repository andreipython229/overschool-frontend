import { ChangeEvent, useCallback, useEffect, useState } from 'react'

export const useFilterData = (dataList: Array<object>, searchString: string | number): any => {
  const [searchParams, setSearchParams] = useState<string>('')
  const [foundData, setFoundData] = useState<Array<object>>(dataList)

  useEffect(() => {
    setFoundData(dataList)
  }, [dataList])

  const filterData = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value

    if (keyword !== '') {
      const results = dataList.filter((item: any) => {
        return item[searchString].toLowerCase().startsWith(keyword.toLowerCase())
      })
      setFoundData(results)
    } else {
      setFoundData(dataList)
    }

    setSearchParams(keyword)
  }, [])

  return [searchParams, foundData, filterData]
}
