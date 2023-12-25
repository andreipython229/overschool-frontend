import { FC, memo, useEffect, useState, ReactNode } from 'react'

import { IconSvg } from '../common/IconSvg/IconSvg'
import { classesSettingIconPath } from './config/svgIconsPath'
import { generateData } from '../../utils/generateData'
import { useLazyFetchStudentsTableHeaderQuery } from '../../api/studentTableService'
import { useBoolean } from 'customHooks'
import { Portal } from '../Modal/Portal'
import { StudentInfoModal, SettingStudentTable } from 'components/Modal'
import { studentsTableInfoT, result } from 'types/courseStatT'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { GenerateRow } from './types'
import { tableFilterByNamePath, tableFilterByEmailUpPath, tableFilterByEmailDownPath } from '../../config/commonSvgIconsPath'
import * as XLSX from "xlsx"

import styles from './studentsTableBlock.module.scss'

type StudentsTableWrapperT = {
  isLoading: boolean
  tableId: number
  students: studentsTableInfoT
  handleReloadTable?: () => void
}

export const StudentsTableWrapper: FC<StudentsTableWrapperT> = memo(({ students, isLoading, tableId, handleReloadTable }) => {
  const [isModalOpen, { on, off, onToggle }] = useBoolean()
  const [isStudentModalOpen, { on: studentModalOn, off: studentModalOff, onToggle: toggleStudentInfoModal }] = useBoolean()

  const [cols, setCols] = useState<string[]>([])
  const [rows, setRows] = useState<GenerateRow[]>()
  const [selectedStuentId, setSelectedStudentId] = useState<number | null>(null)
  const [selectedStuent, setSelectedStudent] = useState<result | null>(null)
  const schoolName = window.location.href.split('/')[4]

  const [fetchTableHeader, { data: tableHeaderData, isSuccess, isFetching: isTableHeaderFetching }] = useLazyFetchStudentsTableHeaderQuery()

  const { columns, data } = generateData(tableHeaderData, students, isLoading, isSuccess)

  // состояние направления сортировки для каждого столбца
  const [sortDirection, setSortDirection] = useState<{ [key: string]: 'asc' | 'desc' }>({
    Имя: 'asc',
    Email: 'asc',
    Курс: 'asc',
    Группа: 'asc',
    'Дата Регистрации': 'asc',
    'Средний бал': 'asc',
  })

  // Функция для обработки сортировки столбцов
  const handleColumnSort = (col: string) => {
    const direction = sortDirection[col] === 'asc' ? 'desc' : 'asc'
    const sortedRows = rows?.slice().sort((a, b) => {
      if (col === 'Имя') {
        const valueA = a[col] as { text: string; image: ReactNode }
        const valueB = b[col] as { text: string; image: ReactNode }

        if (typeof a[col] === 'object' && typeof b[col] === 'object') {
          if (valueA.text < valueB.text) {
            return direction === 'asc' ? -1 : 1
          }
          if (valueA.text > valueB.text) {
            return direction === 'asc' ? 1 : -1
          }
          return 0
        } else {
          if (valueA < valueB) {
            return direction === 'asc' ? -1 : 1
          }
          if (valueA > valueB) {
            return direction === 'asc' ? 1 : -1
          }
          return 0
        }
      } else {
        if (a[col] < b[col]) {
          return direction === 'asc' ? -1 : 1
        }
        if (a[col] > b[col]) {
          return direction === 'asc' ? 1 : -1
        }
        return 0
      }
    })

    setRows(sortedRows)
    setSortDirection({ ...sortDirection, [col]: direction })
  }

  const handleCloseStudentModal = () => {
    toggleStudentInfoModal()
  }

  useEffect(() => {
    if (tableId) {
      fetchTableHeader({ id: tableId, schoolName })
    }
  }, [tableId])

  useEffect(() => {
    if (!isStudentModalOpen) {
      setSelectedStudentId(null)
      handleReloadTable && handleReloadTable()
      document.body.style.overflow = 'auto'
    }
  }, [isStudentModalOpen])

  useEffect(() => {
    students && setRows(data)
  }, [isLoading, students])

  useEffect(() => {
    setCols(columns)
  }, [isSuccess, tableHeaderData])

  useEffect(() => {
    typeof selectedStuentId === 'number' && studentModalOff()

    if (students) {
      const student = students.find((_, index) => index === selectedStuentId) || null
      typeof selectedStuentId === 'number' && setSelectedStudent(student)
    }
  }, [selectedStuentId])

  useEffect(() => {
    !isStudentModalOpen && setSelectedStudentId(null)
  }, [isStudentModalOpen])

  const handleOnExport = () => {
        const wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(students);
        XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
        XLSX.writeFile(wb, "Отчёт.xlsx");

  };

  return (
    <>
      <div className={styles.wrapper}>
        <table className={styles.table} style={{ borderCollapse: 'collapse', minHeight: isLoading ? '500px' : 0 }}>
          {(isTableHeaderFetching || isLoading) && (
            <thead className={styles.loader}>
              <tr>
                <td>
                  <SimpleLoader style={{ width: '50px', height: '50px' }} />
                </td>
              </tr>
            </thead>
          )}
          <button className={styles.table_button} onClick={handleOnExport}>отчёт
          </button>
          <thead className={styles.table_thead}>
            <tr>
              {cols.map(col => (
                <th className={styles.table_thead_td} id={col} key={col} onClick={() => handleColumnSort(col)}>
                  {sortDirection[col] && (
                    <span>
                      {sortDirection[col] === 'asc' ? (
                        <svg width="17px" height="17px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M7 3V21M7 21L3 17M7 21L11 17M15.5 14H20.5L15.5 21H20.5M16 9H20M15 10L18 3L21 10"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg width="17px" height="17px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M7 3V21M7 21L3 17M7 21L11 17M15.5 3H20.5L15.5 10H20.5M16 20H20M15 21L18 14L21 21"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                  )}
                  <span> </span>
                  {col}
                </th>
              ))}
              <td>
                <button className={styles.svgSettingsWrapper}>
                  <IconSvg functionOnClick={off} width={20} height={20} viewBoxSize={'0 0 16 15'} path={classesSettingIconPath} />
                </button>
              </td>
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
                        verticalAlign: 'center',
                      }}
                      key={col}
                    >
                      {typeof cellValue === 'object' ? (
                        <div className={styles.table_user}>
                          {cellValue.image}
                          {row['Дата удаления из группы'] !== ' ' && (
                              <div
                              style={{
                                fontSize: '10px',
                                backgroundColor: '#E23532',
                                color: 'white',
                                padding: '3px 6px 3px 6px',
                                borderRadius: '5px'
                              }}>Удалён</div>
                          )}
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
      </div>

      {isModalOpen && (
        <Portal closeModal={on}>
          <SettingStudentTable setShowModal={onToggle} tableId={tableId} />
        </Portal>
      )}

      {isStudentModalOpen && (
        <Portal closeModal={studentModalOn}>
          <StudentInfoModal closeModal={toggleStudentInfoModal} student={selectedStuent} />
        </Portal>
      )}
    </>
  )
})
