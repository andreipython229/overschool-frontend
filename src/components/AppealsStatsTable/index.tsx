import { FC, useState, useCallback } from 'react'

import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { HomeworksStatsTableHeader } from './AppealsStatsTableHeader'
import { useSortDataByProp } from 'customHooks/index'

import styles from './appealsStatsTable.module.scss'
import { appealStatT, appealsStatT } from 'types/schoolsT'
import { AppealsStatsTableRow } from './AppealsStatsTableRow'

type appealStatsTableT = {
  appeals?: appealsStatT
  isLoading: boolean
  refetchTable: () => void
}
type appealStatKeys = keyof appealStatT;

export const AppealsStatsTable: FC<appealStatsTableT> = ({ appeals, isLoading, refetchTable }) => {
  const [isSorted, setIsSorted] = useState(false);
  const [sortProp, setSortProp] = useState<appealStatKeys>('email');

  const sortedData = useSortDataByProp(appeals?.results as appealStatT[], sortProp, isSorted)

  const handleChangeProp = useCallback(() => {
    setSortProp('email');
    setIsSorted(prop => !prop);
  }, [])

  const handleSortByDate = useCallback(() => {
    setSortProp('created_at');
    setIsSorted(prop => !prop);
  }, []);

  const handleSortByStatus = useCallback(() => {
    setSortProp('is_read');
    setIsSorted(prop => !prop);
  }, []);

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
              <HomeworksStatsTableHeader 
                handleChangeProp={handleChangeProp}
                handleSortByDate={handleSortByDate}
                handleSortByStatus={handleSortByStatus} 
              />
            </thead>
            <tbody className={styles.table_body}>
              {sortedData?.map((appeal: appealStatT, index) => (
                <AppealsStatsTableRow key={appeal.id + index + appeal.created_at} appealData={appeal} refetchTable={refetchTable} />
              ))}
            </tbody>
          </>
        ) : (
          <tbody>
            <tr className={styles.table_no_results}>
              <td>Заявок нет</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  )
}
