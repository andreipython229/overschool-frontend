import { FC } from 'react'
import { useLazyFetchAllStudentsPerSchoolQuery } from 'api/schoolHeaderService'
import { useAppSelector } from 'store/hooks'
import { Button } from '../../common/Button/Button'
import styles from '../../../Pages/School/StudentsStats/studentsStats.module.scss'
import * as XLSX from "xlsx"

export const StudentsSchoolExport: FC = () => {
  const filters = useAppSelector(state => state.filters['studentsPerSchool'])
  const schoolId = localStorage.getItem('school_id')
  const [fetchStudents] = useLazyFetchAllStudentsPerSchoolQuery()

  const handleExport = async () => {
      const response = await fetchStudents({ id: Number(schoolId), filters });
      const allStudents = response.data ?? [];
      const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(allStudents);
      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
      XLSX.writeFile(wb, "Ученики платформы.xlsx")
  };

 return (
     <Button onClick={handleExport} className={styles.students_group_header_export_button} text={''}>
         Скачать таблицу с учениками
     </Button>
 )
}

