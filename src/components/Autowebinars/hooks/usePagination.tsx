import { useState } from 'react'

export const usePagination = <T,>(data: T[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem) || []

  const paginate = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return {
    currentPage,
    totalPages,
    currentItems,
    paginate,
  }
}
