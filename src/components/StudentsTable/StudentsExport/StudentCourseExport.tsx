import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useLazyFetchAllCourseStatQuery } from 'api/courseStat'
import { useAppSelector } from 'store/hooks'
import { Button } from '../../common/Button/Button'
import styles from '../../../Pages/School/StudentsStats/studentsStats.module.scss'
import * as XLSX from "xlsx"

export const StudentsCourseExport: FC = () => {
  const { course_id } = useParams()
  const schoolName = window.location.href.split('/')[4]
  const filters = useAppSelector(state => state.filters['studentsPerCourse'])
  const [fetchStudents] = useLazyFetchAllCourseStatQuery()

  const handleOnExport = async () => {
     const response = await fetchStudents({ id: String(course_id), filters, schoolName });
     const allStudents = response.data ?? [];
     const wb = XLSX.utils.book_new(),
     ws = XLSX.utils.json_to_sheet(allStudents);
     XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
     XLSX.writeFile(wb, "Ученики курса.xlsx");
  };

   return (
    <Button onClick={handleOnExport} className={styles.students_group_header_export_button} text={''}>
        Скачать таблицу с учениками
    </Button>
 )
}
