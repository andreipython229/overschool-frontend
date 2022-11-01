import { useState, useEffect } from 'react'

export const useSortDataByProp = <T, K extends keyof T>(dataToSort: T[] | [], propForSort: K, isSort: boolean) => {
  const [dataToReturn, setDataToReturn] = useState(dataToSort)

  useEffect(() => {
    setDataToReturn(isSort ? sortedData : dataToSort)
  }, [dataToSort, isSort])

  const sortFunc = (prevItem: T, nextItem: T) => {
    if (prevItem[propForSort] > nextItem[propForSort]) {
      return 1
    }

    if (prevItem[propForSort] < nextItem[propForSort]) {
      return -1
    }

    return 0
  }

  const sortedData = dataToReturn?.slice().sort((prevItem, nextItem) => sortFunc(prevItem, nextItem))

  return dataToReturn
}
