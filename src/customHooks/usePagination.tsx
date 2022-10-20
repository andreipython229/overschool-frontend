import { useMemo, useState, useCallback, useEffect } from 'react'

interface paginationProps {
  totalCount: number
  currentPage?: number
}

interface paginationPageToReturn {
  paginationRange: Array<number | string>
  onPageChange: (page: number) => void
  page: number
}

const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

export const DOTS = '...'

export const usePagination = ({ totalCount, currentPage = 1 }: paginationProps): paginationPageToReturn => {
  const activePage = localStorage.getItem('page') ?? currentPage

  const [page, setPage] = useState<number>(Number(activePage))
  const [total, setTotal] = useState<number>(totalCount)

  const onPageChange = useCallback(
    (pageToSet: number) => {
      setPage(pageToSet)
    },
    [page],
  )

  const siblingCount = 1

  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5
    const pagesCount = Math.round(total / 4)

    if (totalPageNumbers >= pagesCount) {
      return range(1, pagesCount)
    }

    if (pagesCount < 4) {
      return range(1, pagesCount)
    }

    const leftSiblingIndex = Math.max(page - siblingCount, 1)
    const rightSiblingIndex = Math.min(page + siblingCount, pagesCount)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < pagesCount - 1

    const firstPageIndex = 1
    const lastPageIndex = pagesCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 2 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, pagesCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 2 + 2 * siblingCount
      const rightRange = range(pagesCount - rightItemCount + 1, pagesCount)
      return [firstPageIndex, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [page, total]) as Array<number | string>

  useEffect(() => {
    return () => {
      localStorage.setItem('page', `${page}`)
    }
  }, [page])

  useEffect(() => {
    setTotal(totalCount)
  }, [totalCount])

  return { paginationRange, onPageChange, page }
}
