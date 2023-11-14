import { FC, useState, useCallback } from 'react'

import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { HomeworksStatsTableRow } from './HomeworksStatsTableRow'
import { HomeworksStatsTableHeader } from './HomeworksStatsTableHeader'
import { homeworkStatT, homeworksStatsT } from 'types/homeworkT'
import { useSortDataByProp } from 'customHooks/index'

import styles from './homeworksStatsTable.module.scss'

type homeworkStatsTableT = {
  homeworks?: homeworksStatsT
  isLoading: boolean
}

export const HomeworksStatsTable: FC<homeworkStatsTableT> = ({ homeworks, isLoading }) => {
  const [isSortedByEmail, setIsSortedByEmail] = useState(false)

  const sortedData = useSortDataByProp(homeworks?.results as homeworkStatT[], 'user_email', isSortedByEmail)

  const hadleChangeProp = useCallback(() => {
    setIsSortedByEmail(prop => !prop)
  }, [])

  return (
    <div className={styles.wrapper}>
      <table className={styles.table} style={{ minHeight: !sortedData?.length ? '295px' : 'unset' }}>
        {isLoading && (
          <tbody>
            <tr className={styles.loader_wrapper}>
              <td>
                <SimpleLoader style={{ width: '40px', height: '40px', zIndex: 1000 }} />
              </td>
            </tr>
          </tbody>
        )}
        {sortedData?.length ? (
          <>
            <thead className={styles.table_head}>
              <HomeworksStatsTableHeader hadleChangeProp={hadleChangeProp} />
            </thead>
            <tbody className={styles.table_body}>
              {sortedData?.map((homework: homeworkStatT) => (
                <HomeworksStatsTableRow key={homework.homework} homeworkData={homework} />
              ))}
            </tbody>
          </>
        ) : (
          <tbody>
            <tr className={styles.table_no_results}>
              <td>Ничего не найдено</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  )
}
