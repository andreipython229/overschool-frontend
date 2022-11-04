import { FC, useState, useCallback } from 'react'

import { HomeworksStatsTableRow } from './HomeworksStatsTableRow'
import { HomeworksStatsTableHeader } from './HomeworksStatsTableHeader'
import { homeworkStatT, homeworksStatsT } from 'types/homeworkT'
import { useSortDataByProp } from 'customHooks/index'

import styles from './homeworksStatsTable.module.scss'

type homeworkStatsTableT = {
  homeworks?: homeworksStatsT
}

export const HomeworksStatsTable: FC<homeworkStatsTableT> = ({ homeworks }) => {
  const [isSortedByEmail, setIsSortedByEmail] = useState(false)

  const sortedData = useSortDataByProp(homeworks?.results as homeworkStatT[], 'email', isSortedByEmail)

  const hadleChangeProp = useCallback(() => {
    setIsSortedByEmail(prop => !prop)
  }, [])

  return (
    <table
      className={styles.table}
      style={{
        boxShadow: '0 0 5px rgb(0 0 0 / 30%)',
        backgroundColor: '#fff',
        borderRadius: '7px',
        maxWidth: '100%',
        width: '100%',
        marginTop: '25px',
      }}
    >
      <thead className={styles.table_head} style={{ height: '55px', background: '#F3F4F6', color: '#ADABB3', fontSize: '12px', fontWeight: 500 }}>
        <HomeworksStatsTableHeader hadleChangeProp={hadleChangeProp} />
      </thead>
      <tbody className={styles.table_body}>
        {sortedData?.map((homework: homeworkStatT, index: number) => (
          <HomeworksStatsTableRow key={index /*homework.user_homework*/} homeworkData={homework} index={index} />
        ))}
      </tbody>
    </table>
  )
}
