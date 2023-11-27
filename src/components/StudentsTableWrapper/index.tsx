import {FC, memo, useEffect, useState, ReactNode} from 'react'

import {IconSvg} from '../common/IconSvg/IconSvg'
import {classesSettingIconPath} from './config/svgIconsPath'
import {generateData} from '../../utils/generateData'
import {useFetchStudentsTableHeaderQuery} from '../../api/studentTableService'
import {useBoolean} from 'customHooks'
import {Portal} from '../Modal/Portal'
import {StudentInfoModal, SettingStudentTable} from 'components/Modal'
import {studentsTableInfoT, result} from 'types/courseStatT'
import {SimpleLoader} from 'components/Loaders/SimpleLoader'
import {GenerateRow} from './types'

import styles from './studentsTableBlock.module.scss'

type StudentsTableWrapperT = {
    isLoading: boolean
    tableId: number
    students: studentsTableInfoT
}

export const StudentsTableWrapper: FC<StudentsTableWrapperT> = memo(({students, isLoading, tableId}) => {
    const [isModalOpen, {on, off, onToggle}] = useBoolean()
    const [isStudentModalOpen, {on: studentModalOn, off: studentModalOff}] = useBoolean()

    const [cols, setCols] = useState<string[]>([])
    const [rows, setRows] = useState<GenerateRow[]>()
    const [selectedStuentId, setSelectedStudentId] = useState<number | null>(null)
    const [selectedStuent, setSelectedStudent] = useState<result | null>(null)

    const {
        data: tableHeaderData,
        isSuccess,
        isFetching: isTableHeaderFetching
    } = useFetchStudentsTableHeaderQuery(tableId)

    const {columns, data} = generateData(tableHeaderData, students, isLoading, isSuccess)

    const handleCloseStudentModal = () => {
        studentModalOn()
        setSelectedStudentId(null)
    }

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

    return (
        <>
            <div className={styles.wrapper}>
                <table className={styles.table} style={{borderCollapse: 'collapse', minHeight: isLoading ? '500px' : 0}}>
                    {(isTableHeaderFetching || isLoading) && (
                        <thead className={styles.loader}>
                        <tr>
                            <td>
                                <SimpleLoader style={{width: '50px', height: '50px'}}/>
                            </td>
                        </tr>
                        </thead>
                    )}
                    <thead className={styles.table_thead}>
                    <tr>
                        {cols.map(col => (
                            <th className={styles.table_thead_td} id={col} key={col}>
                                {col}
                            </th>
                        ))}
                        <td>
                            <button className={styles.svgSettingsWrapper}>
                                <IconSvg functionOnClick={off} width={20} height={20} viewBoxSize={'0 0 16 15'}
                                        path={classesSettingIconPath}/>
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
                    <SettingStudentTable setShowModal={onToggle} tableId={tableId}/>
                </Portal>
            )}

            {isStudentModalOpen && (
                <Portal closeModal={studentModalOn}>
                    <StudentInfoModal closeModal={handleCloseStudentModal} student={selectedStuent}/>
                </Portal>
            )}
        </>
    )
})
