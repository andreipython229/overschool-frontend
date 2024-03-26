import { FC, useEffect } from 'react'
import styles from './schoolAppeals.module.scss'
import { motion } from 'framer-motion'
import { Pagination } from 'components/Pagination/Pagination'
import { AppealsStatsTable } from 'components/AppealsStatsTable'
import { appealsStatT } from 'types/schoolsT'
import { useFetchSchoolAppealsMutation } from 'api/catalogServices'
import { usePagination } from 'customHooks/index'

export const SchoolAppeals: FC = () => {
  const [fetchData, { data: appealsData, isLoading }] = useFetchSchoolAppealsMutation()
  const { page, onPageChange, paginationRange } = usePagination({ totalCount: appealsData?.count as number })
  const schoolName = window.location.href.split('/')[4]

  useEffect(() => {
    fetchData({ schoolName: schoolName, pageToFetch: page })
  }, [page])

  useEffect(() => {
    if (!appealsData && schoolName) {
      fetchData({ schoolName: schoolName, pageToFetch: page })
    }
  }, [fetchData, appealsData])

  return (
    <motion.div
      initial={{
        x: -900,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        delay: 0.1,
        ease: 'easeInOut',
        duration: 0.5,
      }}
      layout
    >
      <p
        style={{
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: '16px',
          lineHeight: '19px',
          letterSpacing: '-0.01em',
          color: '#4d5766',
          margin: '30px 0 22px 0,',
        }}
      >
        Входящие заявки о поступлении на курс
      </p>
      <AppealsStatsTable
        appeals={appealsData as appealsStatT}
        isLoading={isLoading}
        refetchTable={() => fetchData({ schoolName: schoolName, pageToFetch: page })}
      />
      <Pagination className={styles.pagination} paginationRange={paginationRange} currentPage={page} onPageChange={onPageChange} />
    </motion.div>
  )
}
