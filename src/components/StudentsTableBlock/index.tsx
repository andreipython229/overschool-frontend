import { FC, memo, useEffect, useState } from 'react'

import { IconSvg } from '../common/IconSvg/IconSvg'
import { generateData } from '../../utils/generateData'
import { classesSettingIconPath } from './config/svgIconsPath'
import { useFetchCourseStatQuery } from '../../api/courseStat'
import { useFetchStudentsTableHeaderQuery } from '../../api/studentsGroupService'
import { SettingItemT } from 'Pages/pageTypes'

import styles from './studentsTableBlock.module.scss'

type StudentsTableBlockT = {
  settingList?: SettingItemT[]
  setShowModal: () => void
}

export const StudentsTableBlock: FC<StudentsTableBlockT> = memo(({ setShowModal }) => {
  const [cols, setCols] = useState<string[]>([])
  const [rows, setRows] = useState<Array<{ [key: string]: string | number }>>()

  const { data: students, isSuccess: isStudentsRecieved } = useFetchCourseStatQuery(4)
  const { data: studentsTableHeader, isSuccess: isTableHeaderRecieved } = useFetchStudentsTableHeaderQuery(4)

  const { columns, data } = generateData(studentsTableHeader, students, isStudentsRecieved, isTableHeaderRecieved)

  const openSettingsModal = () => {
    setShowModal && setShowModal()
  }

  useEffect(() => {
    setRows(data)
  }, [isStudentsRecieved])

  useEffect(() => {
    setCols(columns)
  }, [isTableHeaderRecieved, studentsTableHeader])

  return (
    <table className={styles.table} style={{ borderCollapse: 'collapse' }}>
      <thead className={styles.table_thead}>
        <tr>
          {cols.map(col => (
            <th
              style={{
                whiteSpace: 'nowrap',
                letterSpacing: '1.5px',
                fontWeight: ' 400',
                fontSize: '14px',
                textAlign: 'left',
                textTransform: 'capitalize',
                verticalAlign: 'middle',
              }}
              id={col}
              key={col}
            >
              {col}
            </th>
          ))}
          <th className={styles.svgSettingsWrapper}>
            <IconSvg functionOnClick={openSettingsModal} width={20} height={20} viewBoxSize={'0 0 15 15'} path={classesSettingIconPath} />
          </th>
        </tr>
      </thead>
      <tbody className={styles.table_tbody}>
        {rows?.map((row, id) => (
          <tr key={id + Math.random()}>
            {Object.entries(row).map(([keyRow, valueRow], idx) => (
              <td
                style={{
                  fontSize: '14px',
                  textTransform: 'capitalize',
                  verticalAlign: 'center',
                }}
                key={keyRow + valueRow}
              >
                {row[cols[idx]]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
})
