import { FC } from 'react'

import { HomeworksStatsTableRow } from './HomeworksStatsTableRow'
import { HomeworksStatsTableHeader } from './HomeworksStatsTableHeader'
import { homeworkStatT, homeworksStatsT } from 'types/homeworkT'

type homeworkStatsTableT = {
  homeworks: homeworksStatsT
}

export const HomeworksStatsTable: FC<homeworkStatsTableT> = ({homeworks}) => {

  return (
    <table
      style={{
        boxShadow: '0 0 5px rgb(0 0 0 / 30%)',
        backgroundColor: '#fff',
        borderRadius: '7px',
        maxWidth: '100%',
        width: '100%',
        marginTop: '25px',
      }}
    >
      <thead style={{ background: '#F3F4F6', color: '#ADABB3', fontSize: '12px', fontWeight: 500 }}>
        <HomeworksStatsTableHeader />
      </thead>
      <tbody>
        {homeworks?.results.map((homework: homeworkStatT, index: number) => (
          <HomeworksStatsTableRow key={index /*homework.user_homework*/} homeworkData={homework} />
        ))}
      </tbody>
    </table>
  )
}
