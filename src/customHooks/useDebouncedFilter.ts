import { useState, ChangeEvent, useEffect } from 'react'

// import { useDebounceFunc } from './useDebounceFunc'

// export const useDebouncedFilter = (dataToFilter, termForFilter) => {
//   const [term, setTerm] = useState<string>('')
//   const [filteredData, setFilteredData] = useState([])

//   useEffect(() => {
//     dataToFilter && setFilteredData(dataToFilter)
//   }, [dataToFilter])

//   const handleChangeTerm = (e: ChangeEvent<HTMLInputElement>) => {
//     setTerm(e.target.value)
//   }

//   const filteredDataByTerm = dataToFilter?.filter(item => item[termForFilter].toLowerCase().includes(term))

//   useDebounceFunc(() => setFilteredData(filteredDataByTerm.length ? filteredDataByTerm : dataToFilter))

//   return [term, filteredData, handleChangeTerm]
// }
