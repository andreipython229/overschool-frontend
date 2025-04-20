import { useState, ChangeEvent, useEffect } from 'react'

import { useDebounceFunc } from './useDebounceFunc'

type returnableData<T> = [string, T[], (e: ChangeEvent<HTMLInputElement>) => void]

export const useDebouncedFilter = <T, K extends keyof T>(dataToFilter: T[], termForFilter: K, defaultTerm = ''): returnableData<T> => {
  const [term, setTerm] = useState<string>(defaultTerm)
  const [filteredData, setFilteredData] = useState<T[]>(dataToFilter)

  useEffect(() => {
    dataToFilter && setFilteredData(dataToFilter)
  }, [dataToFilter])

  const handleChangeTerm = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value)
  }

  const filteredDataByTerm = dataToFilter?.filter((item: any) => String(item[termForFilter]).toLowerCase().includes(String(term).toLowerCase()))

  const debounce = useDebounceFunc(() => setFilteredData(filteredDataByTerm?.length ? filteredDataByTerm : dataToFilter))

  useEffect(() => {
    defaultTerm && setTerm(defaultTerm)
  }, [defaultTerm])

  useEffect(() => {
    dataToFilter && debounce()
  }, [term])

  return [term, filteredData, handleChangeTerm]
}
