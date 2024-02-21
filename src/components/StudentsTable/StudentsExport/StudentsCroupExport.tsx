import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useLazyFetchAllStudentsPerGroupQuery } from 'api/courseStat'
import { useAppSelector } from 'store/hooks'
import { Button } from '../../common/Button/Button'
import styles from '../../../Pages/School/StudentsStats/studentsStats.module.scss'
import * as XLSX from "xlsx"

export const StudentsCroupExport: FC = () => {
    const { group_id } = useParams()
    const schoolName = window.location.href.split('/')[4]
    const filters = useAppSelector(state => state.filters['studentsPerGroup'])
    const [fetchStudents] = useLazyFetchAllStudentsPerGroupQuery()

 const handleExport = async () => {
    const response = await fetchStudents({ id: group_id, filters, schoolName });
    const allStudents = response.data ?? [];
    const wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(allStudents);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "Ученики группы.xlsx");
  };

  return (
     <Button onClick={handleExport} className={styles.students_group_header_export_button} text={''}>
         Скачать таблицу с учениками
     </Button>
 )
}