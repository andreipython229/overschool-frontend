import React, { FC, memo, useEffect, useState } from 'react'

import { IconSvg } from '../common/IconSvg/IconSvg'
import { classesSettingSvgIcon } from '../../constants/iconSvgConstants'
import { SettingItemT } from '../../Pages/CoursesStats/CoursesStats'
import { studentList } from './mokData'
import { generateData } from '../../utils/generateData'

type StudentsTableBlockT = {
  settingList?: SettingItemT[]
  setToggleSettingModal?: (arg: boolean) => void
}

export const StudentsTableBlock: FC<StudentsTableBlockT> = memo(({ settingList, setToggleSettingModal }) => {
  const [cols, setCols] = useState<string[]>([])

  const { columns, data } = generateData(studentList.length, settingList || [])
  const [rows] = useState<Array<object>>(() => data)

  const openSettingsModal = () => {
    setToggleSettingModal && setToggleSettingModal(true)
  }

  useEffect(() => {
    setCols(columns)
  }, [settingList])

  return (
    <table style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {cols.map(col => (
            <th
              style={{
                whiteSpace: 'nowrap',
                color: '#716f88',
                letterSpacing: '1.5px',
                fontWeight: ' 400',
                fontSize: '14px',
                textAlign: 'center',
                textTransform: 'capitalize',
                verticalAlign: 'middle',
                padding: '10px',
                borderBottom: '2px solid #eef0f5',
              }}
              id={col}
              key={col}
            >
              {col}
            </th>
          ))}
          <th>
            <IconSvg
              functionOnClick={openSettingsModal}
              width={15}
              height={15}
              viewBoxSize={'0 0 15 15'}
              fill={'#6B7280'}
              d={classesSettingSvgIcon.setting}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row: any) => (
          <tr key={row + Math.random()}>
            {Object.entries(row).map(([keyRow, valueRow]: any, idx) => (
              <td
                style={{
                  fontSize: '14px',
                  textAlign: 'center',
                  textTransform: 'capitalize',
                  verticalAlign: 'center',
                  padding: '20px',
                  borderBottom: '2px solid #eef0f5',
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
