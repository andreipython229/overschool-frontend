import { FC, memo, useEffect, useState, ReactNode } from 'react'
import { RoleE } from 'enum/roleE'
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
import styles from './studentsTableBlock.module.scss'
import { Button } from '../common/Button/Button'
import { Chat } from '../Modal/Chat'
import { useCreatePersonalChatForAdminOrTeacherMutation } from '../../api/chatsService'
import { ChatI } from '../../types/chatsT'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
import { selectChat } from '../../store/redux/chats/slice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectUser, schoolSelector } from '../../selectors'
import { addChat } from '../../store/redux/chats/chatsSlice'
import { MessageSendPath } from "../../assets/Icons/svgIconPath";

type StudentsTableWrapperT = {
  isLoading: boolean
  tableId: number
  students: studentsTableInfoT
  handleReloadTable?: () => void
  handleAddSortToFilters?: (sort_by: string, sort_order: string) => void
  isGrouping?: boolean
  tableType?: string
}

export const StudentsTableWrapper: FC<StudentsTableWrapperT> = memo(
  ({ students, isLoading, tableId, handleReloadTable, handleAddSortToFilters, isGrouping, tableType }) => {
    const dispatch = useAppDispatch()
    const { role } = useAppSelector(selectUser)
    // const chats = useSelector((state: RootState) => state.chats.chats);

    const [isModalOpen, { on, off, onToggle }] = useBoolean()
    const [isStudentModalOpen, { on: studentModalOn, off: studentModalOff, onToggle: toggleStudentInfoModal }] = useBoolean()
    const [isChatOpen, { off: chatModalOn, onToggle: toggleChatModal }] = useBoolean()
    const [isStudentDeleted, setIsStudentDeleted] = useState<boolean>(false)

    const [cols, setCols] = useState<string[]>([])
    const [rows, setRows] = useState<GenerateRow[]>()
    const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null)
    const [selectedStudent, setSelectedStudent] = useState<result | null>(null)
    const {schoolName} = useAppSelector(schoolSelector);

    const [fetchTableHeader, { data: tableHeaderData, isSuccess, isFetching: isTableHeaderFetching }] = useLazyFetchStudentsTableHeaderQuery()

    const { columns, data } = generateData(tableHeaderData, students, isLoading, isSuccess)
    const [createPersonalChatForAdminOrTeacher] = useCreatePersonalChatForAdminOrTeacherMutation()

    // состояние направления сортировки для каждого столбца
    const [sortDirection, setSortDirection] = useState<{ [key: string]: 'asc' | 'desc' }>({
      Имя: 'asc',
      Email: 'asc',
      Курс: 'asc',
      Группа: 'asc',
      'Дата Регистрации': 'asc',
      'Средний балл': 'asc',
      'Дата добавления в группу': 'desc',
      'Дата удаления из группы': 'asc',
      Прогресс: 'asc',
      'Сумарный балл': 'asc',
      'Номер телефона': 'asc',
    })

    // Функция для обработки сортировки столбцов
    const handleColumnSort = (col: string) => {
      const direction = sortDirection[col] === 'asc' ? 'desc' : 'asc'

      if (handleAddSortToFilters && tableType != 'Группа') {
        switch (col) {
          case 'Имя':
            handleAddSortToFilters('students__last_name', direction)
            break
          case 'Email':
            handleAddSortToFilters('students__email', direction)
            break
          case 'Курс':
            handleAddSortToFilters('course_id__name', direction)
            break
          case 'Группа':
            handleAddSortToFilters('name', direction)
            break
          case 'Дата добавления в группу':
            handleAddSortToFilters('date_added_student', direction)
            break
          case 'Дата удаления из группы':
            handleAddSortToFilters('date_removed_student', direction)
            break
          case 'Прогресс':
            handleAddSortToFilters('progress', direction)
            break
          case 'Суммарный балл':
            handleAddSortToFilters('mark_sum', direction)
            break
          case 'Средний балл':
            handleAddSortToFilters('average_mark', direction)
            break
          case 'Дата регистрации':
            handleAddSortToFilters('students__date_joined', direction)
            break
          case 'Номер телефона':
            handleAddSortToFilters('phone_number', direction)
            break
        }
      } else if (handleAddSortToFilters && tableType == 'Группа') {
        switch (col) {
          case 'Имя':
            handleAddSortToFilters('last_name', direction)
            break
          case 'Email':
            handleAddSortToFilters('email', direction)
            break
          case 'Курс':
            handleAddSortToFilters('course_name', direction)
            break
          case 'Группа':
            handleAddSortToFilters('group_name', direction)
            break
          case 'Дата добавления в группу':
            handleAddSortToFilters('date_added', direction)
            break
          case 'Дата удаления из группы':
            handleAddSortToFilters('date_removed', direction)
            break
          case 'Прогресс':
            handleAddSortToFilters('progress', direction)
            break
          case 'Суммарный балл':
            handleAddSortToFilters('mark_sum', direction)
            break
          case 'Средний балл':
            handleAddSortToFilters('average_mark', direction)
            break
          case 'Дата регистрации':
            handleAddSortToFilters('last_active', direction)
            break
          case 'Номер телефона':
            handleAddSortToFilters('phone_number', direction)
            break
        }
      }

      setSortDirection({ ...sortDirection, [col]: direction })
    }

    const handleDeleteStudent = () => {
      setIsStudentDeleted(true)
    }

    const handleToggleChatModal = (studentId: number) => {
      if (students) {
        const student = students.find((_, index) => index === studentId) || null
        if (student?.chat_uuid) {
          dispatch(selectChat(student?.chat_uuid))
          chatModalOn()
        } else if (student?.student_id) {
          const personalChatData = new FormData()
          personalChatData.append('user_id', student.student_id.toString())
          personalChatData.append('role_name', RoleE[role])
          personalChatData.append('role_reciever', 'Student')
          createPersonalChatForAdminOrTeacher(personalChatData)
            .then(async (response: { data: ChatI } | { error: FetchBaseQueryError | SerializedError }) => {
              if ('data' in response) {
                dispatch(addChat(response.data))
                dispatch(selectChat(response.data.id))
                chatModalOn()
              }
            })
            .catch(error => {
              console.error('Произошла ошибка при создании персонального чата:', error)
            })
        }
      }
    }

    const handleRowClick = (event: any, studentId: any) => {
      // Проверка, был ли клик на кнопке "CHAT"
      if (!event.target.classList.contains(styles.chat_button)) {
        setSelectedStudentId(studentId)
      }
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
        setIsStudentDeleted(false)
      }
    }, [isStudentDeleted])

    useEffect(() => {
      students && setRows(data)
    }, [isGrouping, isLoading, students])

    useEffect(() => {
      setCols(columns)
    }, [isSuccess, tableHeaderData])

    useEffect(() => {
      typeof selectedStudentId === 'number' && studentModalOff()

      if (students) {
        const student = students.find((_, index) => index === selectedStudentId) || null
        typeof selectedStudentId === 'number' && setSelectedStudent(student)
      }
    }, [selectedStudentId])

    useEffect(() => {
      !isStudentModalOpen && setSelectedStudentId(null)
    }, [isStudentModalOpen])

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

            <thead className={styles.table_thead}>
              <tr>
                {cols.map(col => (
                  <th
                    className={styles.table_thead_td}
                    id={col}
                    key={col}
                    onClick={() => (isGrouping ? handleColumnSort('Email') : handleColumnSort(col))}
                  >
                    {col}
                  </th>
                ))}
                {/* <button className={styles.svgSettingsWrapper}>
                  <IconSvg functionOnClick={off} width={20} height={20} viewBoxSize={'0 0 16 15'} path={classesSettingIconPath} />
                </button> */}
                <th className={styles.table_thead_td}> <span> Личный чат</span></th>
              </tr>
            </thead>

            {isGrouping ? (
              <tbody className={styles.table_tbody}>
                {rows &&
                  rows
                    .sort((a: any, b: any) => (a['Email'] > b['Email'] ? 1 : -1)) // Сортировка по email
                    .map((row: any, rowIndex: number) => {
                      const email = row['Email'] as string
                      const name = row['Имя'].text as string // Получаем текст из объекта с именем
                      const rowspan = rows.filter(r => r['Email'] === email).length
                      const showEmailCell = rowspan === 1
                      return (
                        <tr
                          key={rowIndex}
                          style={row['Дата удаления из группы'] !== ' ' ? { backgroundColor: '#fcf5f5' } : {}}
                          onClick={event => handleRowClick(event, row.id)}
                        >
                          {cols.map((col: string, colIndex: number) => {
                            const cellValue = row[col] as string | number | { text: string; image: ReactNode }
                            if (col === 'Email') {
                              if (showEmailCell) {
                                return (
                                  <td
                                    style={{
                                      verticalAlign: 'center',
                                    }}
                                    rowSpan={rowspan}
                                    key={`${col}-${rowIndex}`}
                                  >
                                    {email}
                                  </td>
                                )
                              } else if (rowIndex === rows.findIndex((r: any) => r['Email'] === email && r['Имя'].text === name)) {
                                return (
                                  <td
                                    style={{
                                      verticalAlign: 'center',
                                    }}
                                    rowSpan={rowspan}
                                    key={`${col}-${rowIndex}`}
                                  >
                                    {email}
                                  </td>
                                )
                              } else {
                                return null
                              }
                            } else if (col === 'Имя') {
                              if (showEmailCell) {
                                return (
                                  <td
                                    style={{
                                      verticalAlign: 'center',
                                    }}
                                    rowSpan={rowspan}
                                    key={`${col}-${rowIndex}`}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                      <span style={{ marginLeft: '5px' }}>
                                        {cellValue && typeof cellValue === 'object' && 'image' in cellValue && cellValue.image}
                                      </span>
                                      <span style={{ marginLeft: '5px' }}>{name}</span>
                                    </div>
                                  </td>
                                )
                              } else if (rowIndex === rows.findIndex((r: any) => r['Email'] === email)) {
                                return (
                                  <td
                                    style={{
                                      verticalAlign: 'center',
                                    }}
                                    rowSpan={rowspan}
                                    key={`${col}-${rowIndex}`}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                      <span style={{ marginLeft: '5px' }}>
                                        {cellValue && typeof cellValue === 'object' && 'image' in cellValue && cellValue.image}
                                      </span>
                                      <span style={{ marginLeft: '5px' }}>{name}</span>
                                    </div>
                                  </td>
                                )
                              } else {
                                return null
                              }
                            } else {
                              return (
                                <td
                                  style={{
                                    verticalAlign: 'center',
                                  }}
                                  key={`${col}-${rowIndex}`}
                                >
                                  {typeof cellValue === 'object' ? (
                                    <div className={styles.table_user}>
                                      {row['Дата удаления из группы'] !== ' ' && (
                                        <div
                                          style={{
                                            fontSize: '10px',
                                            backgroundColor: '#fa6961',
                                            color: 'white',
                                            padding: '3px 6px 3px 6px',
                                            borderRadius: '5px',
                                          }}
                                        >
                                          Удалён
                                        </div>
                                      )}
                                      {cellValue.image}
                                      <p>{cellValue.text}</p>
                                    </div>
                                  ) : (
                                    <p>{cellValue}</p>
                                  )}
                                </td>
                              )
                            }
                          })}
                          <td>
                            <div className={styles.table_user}>
                              {row['Дата удаления из группы'] === ' ' && (
                                <div className={styles.chat_button} onClick={(event) => {event.stopPropagation(); event.preventDefault(); handleToggleChatModal(rowIndex)}}>
                                  <IconSvg width={23} height={23} viewBoxSize={'0 0 25 25'} path={MessageSendPath} />
                                </div>
                              )}

                              {row['Дата удаления из группы'] !== ' ' && (
                                <div
                                  style={{
                                    fontSize: '10px',
                                    backgroundColor: '#fa6961',
                                    color: 'white',
                                    padding: '3px 6px 3px 6px',
                                    borderRadius: '5px',
                                  }}
                                >
                                  Удалён
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
              </tbody>
            ) : (
              <tbody className={styles.table_tbody}>
                {rows?.map((row, id) => (
                  <tr
                    key={id}
                    style={row['Дата удаления из группы'] !== ' ' ? { backgroundColor: '#fcf5f5' } : {}}
                    onClick={event => handleRowClick(event, row.id)}
                  >
                    {cols.map(col => {
                      const cellValue = row[col] as string | number | { text: string; image: ReactNode }
                      return (
                        <td
                          style={{
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
                    <td>
                        <div className={styles.table_user}>
                          {row['Дата удаления из группы'] === ' ' && (
                            <div className={styles.chat_button} onClick={(event) => {event.stopPropagation(); event.preventDefault(); handleToggleChatModal(id)}}>
                              <IconSvg width={23} height={23} viewBoxSize={'0 0 25 25'} path={MessageSendPath} />
                            </div>
                          )}

                          {row['Дата удаления из группы'] !== ' ' && (
                            <div
                              style={{
                                fontSize: '10px',
                                backgroundColor: '#fa6961',
                                color: 'white',
                                padding: '3px 6px 3px 6px',
                                borderRadius: '5px',
                              }}
                            >
                              Удалён
                            </div>
                          )}
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>

        {isModalOpen && (
          <Portal closeModal={on}>
            <SettingStudentTable setShowModal={onToggle} tableId={tableId} />
          </Portal>
        )}

        {isStudentModalOpen && (
          <Portal closeModal={studentModalOn}>
            <StudentInfoModal student={selectedStudent} closeModal={toggleStudentInfoModal} isStudentDeleted={handleDeleteStudent} />
          </Portal>
        )}

        {isChatOpen && (
          <Portal closeModal={chatModalOn}>
            <Chat closeModal={toggleChatModal} />
          </Portal>
        )}
      </>
    )
  },
)
