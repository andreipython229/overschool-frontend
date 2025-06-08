import React, { FC } from 'react'
import styles from 'components/Meetings/meetings.module.scss'
import { WebinarCard } from '../WebinarCard/WebinarCard'
import { Autowebinar } from "types/autowebinarsT"
import { Pagination } from "./Pagination"

interface WebinarListWithPaginationProps {
  currentItems: Autowebinar[]
  totalPages: number
  currentPage: number
  paginate: (page: number) => void
}

export const WebinarListWithPagination: FC<WebinarListWithPaginationProps> = ({
  currentItems,
  totalPages,
  currentPage,
  paginate,
}) => {

  return (
    <>
      <div className={styles.meetingList}>
        {currentItems.map(webinar => (
          <WebinarCard key={webinar.id} webinar={webinar} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={paginate}
      />
    </>
  )
}
