import { FC, memo, useEffect, useState, ReactNode } from 'react'
import {RoleE} from 'enum/roleE'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { classesSettingIconPath, downLoadIconPath } from './config/svgIconsPath'
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
import {Button} from "../common/Button/Button";
import {Chat} from "../Modal/Chat";
import {useCreatePersonalChatForAdminOrTeacherMutation} from "../../api/chatsService";
import {ChatI} from "../../types/chatsT";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {selectChat} from "../../store/redux/chats/slice";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {TRUE} from "sass";
import {selectUser} from "../../selectors";
import {setChats, addChat} from "../../store/redux/chats/chatsSlice";
import {useSelector} from "react-redux";
import {RootState} from "../../store/redux/store";

type StudentsTableWrapperT = {
  isLoading: boolean
  tableId: number
  students: studentsTableInfoT
  handleReloadTable?: () => void
  handleAddSortToFilters?: (sort_by: string, sort_order: string) => void
}

export const StudentsTableWrapper: FC<StudentsTableWrapperT> = memo(({ students, isLoading, tableId, handleReloadTable, handleAddSortToFilters }) => {
  const dispatch = useAppDispatch()
  const { role } = useAppSelector(selectUser)
  // const chats = useSelector((state: RootState) => state.chats.chats);

  const [isModalOpen, { on, off, onToggle }] = useBoolean()
  const [isStudentModalOpen, { on: studentModalOn, off: studentModalOff, onToggle: toggleStudentInfoModal }] = useBoolean()
  const [isChatOpen, { on: chatModalOff, off: chatModalOn , onToggle: toggleChatModal}] = useBoolean()

  const [cols, setCols] = useState<string[]>([])
  const [rows, setRows] = useState<GenerateRow[]>()
  const [selectedStuentId, setSelectedStudentId] = useState<number | null>(null)
  const [selectedStuent, setSelectedStudent] = useState<result | null>(null)
  const schoolName = window.location.href.split('/')[4]

  const [fetchTableHeader, { data: tableHeaderData, isSuccess, isFetching: isTableHeaderFetching }] = useLazyFetchStudentsTableHeaderQuery()

  const { columns, data } = generateData(tableHeaderData, students, isLoading, isSuccess)
  const [createPersonalChatForAdminOrTeacher, { isLoading: chatIsLoading }] = useCreatePersonalChatForAdminOrTeacherMutation()


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
    'Прогресс': 'asc',
    'Сумарный балл': 'asc'

  })

  // Функция для обработки сортировки столбцов
  const handleColumnSort = (col: string) => {
    const direction = sortDirection[col] === 'asc' ? 'desc' : 'asc'

    if (handleAddSortToFilters) {
      switch (col) {
        case 'Имя':
          handleAddSortToFilters('last_name', direction)
          break;
        case 'Email':
          handleAddSortToFilters('email', direction)
          break;
        case 'Курс':
          handleAddSortToFilters('course_name', direction)
          break;
        case 'Группа':
          handleAddSortToFilters('group_name', direction)
          break;
        case 'Дата добавления в группу':
          handleAddSortToFilters('date_added', direction)
          break;
        case 'Дата удаления из группы':
          handleAddSortToFilters('date_removed', direction)
          break;
        case 'Прогресс':
          handleAddSortToFilters('progress', direction)
          break;
        case 'Суммарный балл':
          handleAddSortToFilters('mark_sum', direction)
          break;
        case 'Средний балл':
          handleAddSortToFilters('average_mark', direction)
          break;
        case 'Дата регистрации':
          handleAddSortToFilters('last_active', direction)
          break;
      }
    }

    setSortDirection({ ...sortDirection, [col]: direction })
  }

  const handleCloseStudentModal = () => {
    toggleStudentInfoModal()
  }

  const handleToggleChatModal = (studentId: number) => {
    if (students) {
      const student = students.find((_, index) => index === studentId) || null
      if (student?.chat_uuid) {
        dispatch(selectChat(student?.chat_uuid))
        chatModalOn()
      } else if (student?.student_id) {
        const personalChatData = new FormData();
        personalChatData.append('user_id', student.student_id.toString());
        personalChatData.append('role_name', RoleE[role]);
        createPersonalChatForAdminOrTeacher(personalChatData)
            .then((async( response: { data: ChatI } | { error: FetchBaseQueryError | SerializedError })  => {
              if ('data' in response) {
                dispatch(addChat(response.data))
                dispatch(selectChat(response.data.id))
                chatModalOn()
              }
            }))
            .catch(error => {
              console.error('Произошла ошибка при создании персонального чата:', error);
            })
      }
    }
  }

  const handleRowClick = (event: any, studentId: number) => {
  // Проверка, был ли клик на кнопке "CHAT"
    if (!event.target.classList.contains(styles.chat_button)) {
      setSelectedStudentId(studentId);
    }
  };

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

          <thead className={styles.table_thead}>
            <tr>
              {cols.map(col => (
                <th className={styles.table_thead_td} id={col} key={col} onClick={() => handleColumnSort(col)}>
                  {sortDirection[col] && (
                    <span>
                      {sortDirection[col] === 'asc' ? (
                        <div className={styles.tableSortButton}>
                          <svg width="17px" height="17px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M7 3V21M7 21L3 17M7 21L11 17M15.5 14H20.5L15.5 21H20.5M16 9H20M15 10L18 3L21 10"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className={styles.tableSortButton}>
                          <svg width="17px" height="17px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M7 3V21M7 21L3 17M7 21L11 17M15.5 3H20.5L15.5 10H20.5M16 20H20M15 21L18 14L21 21"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </span>
                  )}
                  <span> </span>
                  {col}
                </th>
              ))}
              <td>
                <>
                <button className={styles.svgSettingsWrapper}>
                  <IconSvg functionOnClick={off} width={20} height={20} viewBoxSize={'0 0 16 15'} path={classesSettingIconPath} />
                </button>
                <button className={styles.svgSettings} onClick={handleOnExport}>
                  <IconSvg width={22} height={22} viewBoxSize={'0 0 18 18'} path={downLoadIconPath} />
                </button>
                </>
              </td>
            </tr>
          </thead>
          <tbody className={styles.table_tbody}>
            {rows?.map((row, id) => (
              <tr key={id} style={row['Дата удаления из группы'] !== ' ' ? {backgroundColor: '#fcf5f5'} : {}} onClick={(event) => handleRowClick(event, id)}>
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
                          {row['Дата удаления из группы'] === ' ' && (
                            <Button className={styles.chat_button} text={"CHAT"} onClick={() => handleToggleChatModal(id)}/>
                            )
                          }

                          {row['Дата удаления из группы'] !== ' ' && (
                              <div
                              style={{
                                fontSize: '10px',
                                backgroundColor: '#fa6961',
                                color:"white",
                                padding: '3px 6px 3px 6px',
                                borderRadius: '5px'
                              }}>Удалён</div>
                          )}
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

      {isChatOpen && (
        <Portal closeModal={chatModalOn}>
          <Chat closeModal={toggleChatModal} />
        </Portal>
      )}
    </>
  )
})
