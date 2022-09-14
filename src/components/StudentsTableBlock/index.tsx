import { FC, memo, useEffect, useState } from 'react'

import { IconSvg } from '../common/IconSvg/IconSvg'
import { SettingItemT } from '../../Pages/CoursesStats/CoursesStats'
import { generateData } from '../../utils/generateData'
import { classesSettingIconPath } from './config/svgIconsPath'
import { studentList } from './config/mokData'

import styles from './studentsTableBlock.module.scss'

type StudentsTableBlockT = {
  settingList?: SettingItemT[]
  setToggleSettingModal?: (arg: boolean) => void
}

export const StudentsTableBlock: FC<StudentsTableBlockT> = memo(({ settingList, setToggleSettingModal }) => {
  const [cols, setCols] = useState<string[]>([])

  const { columns, data } = generateData(studentList.length, settingList || [])
  const [rows] = useState<Array<{ [key: string]: string | number }>>(() => data)

  const openSettingsModal = () => {
    setToggleSettingModal && setToggleSettingModal(true)
  }

  useEffect(() => {
    setCols(columns)
  }, [settingList])

  return (
    <table className={styles.table} style={{ borderCollapse: 'collapse' }}>
      <thead className={styles.table_thead}>
        <tr>
          {cols.map(col => (
            <th
              style={{
                whiteSpace: 'nowrap',
                // color: '#716f88',
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
          <th>
            <IconSvg functionOnClick={openSettingsModal} width={15} height={15} viewBoxSize={'0 0 15 15'} path={classesSettingIconPath} />
          </th>
        </tr>
      </thead>
      <tbody className={styles.table_tbody}>
        {rows.map((row, id) => (
          // id has to be oraganized differently
          <tr key={id + Math.random()}>
            {Object.entries(row).map(([keyRow, valueRow], idx) => (
              <td
                style={{
                  fontSize: '14px',
                  // textAlign: 'left',
                  textTransform: 'capitalize',
                  verticalAlign: 'center',
                  // padding: '20px',
                  // borderBottom: '2px solid #eef0f5',
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
