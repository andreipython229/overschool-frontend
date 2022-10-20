import { FC } from 'react'

import { HomeworksStatsTableRow } from './HomeworksStatsTableRow'
import { HomeworksStatsTableHeader } from './HomeworksStatsTableHeader'
import { useFetchHomeworkStatsQuery } from '../../api/homeworksStatsService'
import { homeworkStatT } from 'types/homeworkT'

import styles from './homeworksStatsTable.module.scss';

export const HomeworksStatsTable: FC = () => {
  const { data: homeworks } = useFetchHomeworkStatsQuery()

  return (
    <table className={styles.table}
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
        <HomeworksStatsTableHeader />
      </thead>
      <tbody className={styles.table_body} >
        {homeworks?.results.map((homework: homeworkStatT, index: number) => (
          <HomeworksStatsTableRow key={index /*homework.user_homework*/} homeworkData={homework} />
        ))}
      </tbody>
    </table>
  )
}
