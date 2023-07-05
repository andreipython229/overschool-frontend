import { FC, memo, useEffect, useState, ReactNode } from 'react'

import { IconSvg } from '../common/IconSvg/IconSvg'
import { classesSettingIconPath } from './config/svgIconsPath'
import { generateData } from '../../utils/generateData'
import { useFetchStudentsTableHeaderQuery } from '../../api/studentsGroupService'
import { useBoolean } from 'customHooks'
import { Portal } from '../Modal/Portal'
import { StudentInfoModal, SettingStudentTable } from 'components/Modal'
import { studentsTableInfoT, result } from 'types/courseStatT'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { GenerateRow } from './types'

import styles from './studentsTableBlock.module.scss'

type StudentsTableWrapperT = {
  isLoading: boolean
  students: studentsTableInfoT
}

export const StudentsTableWrapper: FC<StudentsTableWrapperT> = memo(({ students, isLoading }) => {
  const [isModalOpen, { on, off, onToggle }] = useBoolean()
  const [isStudentModalOpen, { on: stuentModalOn, off: studentModalOff }] = useBoolean()

  const [cols, setCols] = useState<string[]>([])
  const [rows, setRows] = useState<GenerateRow[]>()
  const [selectedStuentId, setSelectedStudentId] = useState<number | null>(null)
  const [selectedStuent, setSelectedStudent] = useState<result | null>(null)

  const { data: tableHeaderData, isSuccess, isFetching: isTableHeaderFetching } = useFetchStudentsTableHeaderQuery(1)

  const { columns, data } = generateData(tableHeaderData, students, isLoading, isSuccess)

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
    typeof selectedStuentId === 'number' && studentModalOff()

    if (students) {
      const student = students.find((_, index) => index === selectedStuentId) || null
      console.log(student)
      typeof selectedStuentId === 'number' && setSelectedStudent(student)
    }
  }, [selectedStuentId])

  useEffect(() => {
    !isStudentModalOpen && setSelectedStudentId(null)
  }, [isStudentModalOpen])

  return (
    <>
      <table className={styles.table} style={{ borderCollapse: 'collapse', minHeight: isLoading ? '500px' : 0 }}>
        {(isTableHeaderFetching || isLoading) && (
          <div className={styles.loader}>
            <SimpleLoader style={{ width: '50px', height: '50px' }} />
          </div>
        )}
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
            <tr key={id + Math.random()} onClick={() => setSelectedStudentId(id)}>
              {cols.map(col => {
                const cellValue = row[col] as string | number | { text: string; image: ReactNode }
                return (
                  <td
                    style={{
                      fontSize: '14px',
                      textTransform: 'capitalize',
                      verticalAlign: 'center',
                    }}
                    key={col}
                  >
                    {typeof cellValue === 'object' ? (
                      <div className={styles.table_user}>
                        {cellValue.image}
                        <p>{cellValue.text}</p>
                      </div>
                    ) : (
                      <p>{cellValue}</p>
                    )}
                  </td>
                )
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
