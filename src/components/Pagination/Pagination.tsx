import { FC, memo } from 'react'
import classnames from 'classnames'

import { DOTS, usePagination } from '../../customHooks/usePagination'

import './pagination.scss'

type paginationT = {
  totalCount: number
  currentPage: number
  onPageChange: (pagw: number) => void
  className?: string
}

export const Pagination: FC<paginationT> = memo(({ totalCount, onPageChange, currentPage, ...props }) => {
  const { paginationRange } = usePagination({
    totalCount,
  })

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const lastPage = paginationRange && paginationRange[paginationRange?.length - 1]
  return (
    <div className={`pagination-bar ${props.className}`}>
      <p className="pagination-text">
        Всего <span className="pagination-total">{paginationRange?.slice(-1)}</span>
      </p>
      <ul className="pagination-container">
        <li
          className={classnames('pagination-item', {
            disabled: currentPage === 1,
          })}
          onClick={onPrevious}
        >
          <div className="arrow left" />
        </li>
        {paginationRange?.map(pageNumber => {
          if (pageNumber === DOTS) {
            return <li className="pagination-item dots">&#8230;</li>
          }

          return (
            <li
              key={pageNumber}
              className={classnames('pagination-item', {
                selected: pageNumber === currentPage,
              })}
              onClick={() => typeof pageNumber === 'number' && onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          )
        })}
        <li
          className={classnames('pagination-item', {
            disabled: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <div className="arrow right" />
        </li>
      </ul>
    </div>
  )
})
