import { ChangeEvent, useState } from 'react'

interface returnDataT {
  searchParams: string | number
  foundData: Array<object>
  filterData: (e: ChangeEvent<HTMLInputElement>) => void
}

export const useFilterData = (dataList: Array<object>, searchString: string): any => {
  const [searchParams, setSearchParams] = useState<string>('')
  const [foundData, setFoundData] = useState<Array<object>>(dataList)

  const filterData = (e: ChangeEvent<HTMLInputElement>) => {
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
  }
  return [searchParams, foundData, filterData]
}
