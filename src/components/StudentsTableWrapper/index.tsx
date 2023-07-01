import { FC, memo, useEffect, useState } from 'react'

import { IconSvg } from '../common/IconSvg/IconSvg'
import { classesSettingIconPath } from './config/svgIconsPath'
import { generateData } from '../../utils/generateData'
import { useFetchStudentsTableHeaderQuery } from '../../api/studentsGroupService'
import { useAppSelector } from '../../store/hooks'
import { userIdSelector } from '../../selectors'
import { useBoolean } from 'customHooks'
import { Portal } from '../Modal/Portal'
import { StudentInfoModal, SettingStudentTable } from 'components/Modal'
import { studentsTableInfoT, result } from 'types/courseStatT'

import styles from './studentsTableBlock.module.scss'

type StudentsTableWrapperT = {
  isLoading: boolean
  students: studentsTableInfoT
}

type GenerateRow = {
  Имя: {
    name: string
    avatar: string
  }
  Email: string
  'Суммарный балл': string
  Курс: string
  Группа: string
  'Последняя активность': string
  'Дата обновления': string
}

export const StudentsTableWrapper: FC<StudentsTableWrapperT> = memo(({ students, isLoading }) => {
  const id = useAppSelector(userIdSelector)

  const [isModalOpen, { on, off, onToggle }] = useBoolean()
  const [isStudentModalOpen, { on: stuentModalOn, off: studentModalOff }] = useBoolean()

  const [cols, setCols] = useState<string[]>([])
  const [rows, setRows] = useState<GenerateRow[]>()
  const [selectedStuentId, setSelectedStudentId] = useState<number | null>(null)
  const [selectedStuent, setSelectedStudent] = useState<result | null>(null)

  const { data: tableHeaderData, isSuccess } = useFetchStudentsTableHeaderQuery(1)

  const { columns, data, ids } = generateData(tableHeaderData, students, isLoading, isSuccess)

  const handleCloseStuentModal = () => {
    stuentModalOn()
    setSelectedStudentId(null)
  }

  useEffect(() => {
    students && setRows(data)
  }, [isLoading])

  useEffect(() => {
    setCols(columns)
  }, [isSuccess, tableHeaderData])

  useEffect(() => {
    selectedStuentId && studentModalOff()

    if (students) {
      const student = students.find(student => student.id === selectedStuentId) || null
      selectedStuentId && setSelectedStudent(student)
    }
  }, [selectedStuentId])

  useEffect(() => {
    !isStudentModalOpen && setSelectedStudentId(null)
  }, [isStudentModalOpen])

  return (
    <>
      <table className={styles.table} style={{ borderCollapse: 'collapse' }}>
        <thead className={styles.table_thead}>
          <tr>
            {cols.map(col => (
              <th className={styles.table_thead_td} id={col} key={col}>
                {col}
              </th>
            ))}
            <button className={styles.svgSettingsWrapper}>
              <IconSvg functionOnClick={off} width={20} height={20} viewBoxSize={'0 0 16 15'} path={classesSettingIconPath} />
            </button>
          </tr>
        </thead>
        <tbody className={styles.table_tbody}>
          {rows?.map((row, id) => (
            <tr key={id + Math.random()} onClick={() => setSelectedStudentId(ids[id])}>
              {Object.entries(row).map(([keyRow, valueRow], idx: number) => {
                if (keyRow === 'Имя' && typeof valueRow === 'object') {
                  return (
                    <td
                      style={{
                        fontSize: '14px',
                        textTransform: 'capitalize',
                        verticalAlign: 'center',
                      }}
                      key={keyRow + valueRow}
                    >
                      <div className={styles.table_user}>
                        {valueRow?.avatar ? (
                          <img src={valueRow?.avatar} alt="Avatar" />
                        ) : (
                          <div className={styles.table_user_avatar}>
                            {valueRow?.name
                              .split(' ')
                              .map(value => value.charAt(0))
                              .join('')}
                          </div>
                        )}
                        <div className={styles.table_user_name}>{valueRow?.name}</div>
                      </div>
                    </td>
                  )
                } else {
                  return (
                    <td
                      style={{
                        fontSize: '14px',
                        textTransform: 'capitalize',
                        verticalAlign: 'center',
                      }}
                      key={keyRow + valueRow}
                    >
                      {/*{row[cols[idx]]}*/}
                    </td>
                  )
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <Portal closeModal={on}>
          <SettingStudentTable setShowModal={onToggle} />
        </Portal>
      )}

      {isStudentModalOpen && (
        <Portal closeModal={stuentModalOn}>
          <StudentInfoModal closeModal={handleCloseStuentModal} student={selectedStuent} />
        </Portal>
      )}
    </>
  )
})
