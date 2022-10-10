import { useState, ChangeEvent, useEffect } from 'react'

import { useDebounceFunc } from './useDebounceFunc'

type returnableData<T> = [string, T[], (e: ChangeEvent<HTMLInputElement>) => void]

export const useDebouncedFilter = <T, K extends keyof T>(dataToFilter: T[], termForFilter: K): returnableData<T> => {
  const [term, setTerm] = useState<string>('')
  const [filteredData, setFilteredData] = useState<T[]>(dataToFilter)

  useEffect(() => {
    dataToFilter && setFilteredData(dataToFilter)
  }, [dataToFilter])

  const handleChangeTerm = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value)
  }

  const filteredDataByTerm = dataToFilter?.filter(item => item[termForFilter].toLowerCase().includes(term.toLowerCase()))

  const debounce = useDebounceFunc(() => setFilteredData(filteredDataByTerm?.length ? filteredDataByTerm : dataToFilter))

  useEffect(() => {
    dataToFilter && debounce()
  }, [term])

  return [term, filteredData, handleChangeTerm]
}
