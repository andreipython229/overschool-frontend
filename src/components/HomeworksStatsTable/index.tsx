import { FC } from 'react'
import { HomeworksStatsTableRow } from './HomeworksStatsTableRow'
import { HomeworksStatsTableHeader } from './HomeworksStatsTableHeader'
import { homeworkStatT, homeworksStatsT } from 'types/homeworkT'
import styles from './homeworksStatsTable.module.scss'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'

type homeworkStatsTableT = {
  homeworks?: homeworksStatsT
  isLoading: boolean
}

export const HomeworksStatsTable: FC<homeworkStatsTableT> = ({ homeworks, isLoading }) => {
  return (
    <div>
      <table className={styles.table} style={{ minHeight: !homeworks?.results?.length ? '295px' : 'unset' }}>
        {isLoading && (
          <tbody>
            <tr className={styles.loader_wrapper}>
              <td>
                <LoaderLayout />
              </td>
            </tr>
          </tbody>
        )}
        {homeworks?.results?.length ? (
          <>
            <thead className={styles.table_head}>
              <HomeworksStatsTableHeader />
            </thead>
            <tbody className={styles.table_body}>
              {homeworks.results?.map((homework: homeworkStatT) => (
                <HomeworksStatsTableRow key={homework.homework + homework.user_homework_id + homework.homework_name} homeworkData={homework} />
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
