import React from 'react'
import styles from 'components/Meetings/meetings.module.scss'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { ArrowLeftIconPath, ArrowRightIconPath } from 'assets/Icons/svgIconPath'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPages = () => {
    return Array.from({ length: totalPages }, (_, i) => {
      const pageNumber = i + 1

      if (
        pageNumber === 1 ||
        pageNumber === totalPages ||
        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
      ) {
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={currentPage === pageNumber ? styles.active : ''}
          >
            {pageNumber}
          </button>
        )
      }

      if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
        return <span key={pageNumber}>...</span>
      }

      return null
    })
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pagination_arrow_left}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <IconSvg path={ArrowLeftIconPath} viewBoxSize="0 0 9 14" height={12} width={9} />
      </button>

      {renderPages()}

      <button
        className={styles.pagination_arrow_right}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <IconSvg path={ArrowRightIconPath} viewBoxSize="0 0 9 14" height={12} width={9} />
      </button>
    </div>
  )
}
