import { FC } from 'react'
import { useLazyFetchAllStudentsHomeworkQuery } from 'api/homeworksStatsService'
import { useAppSelector } from 'store/hooks'
import { Button } from '../../common/Button/Button'
import styles from '../../../Pages/School/StudentsStats/studentsStats.module.scss'
import * as XLSX from "xlsx"

export const StudentsHomeworkExport: FC = () => {
  const filters = useAppSelector(state => state.filters['homework'])
  const schoolName = localStorage.getItem('school')
  const [fetchHomeworks] = useLazyFetchAllStudentsHomeworkQuery()

  // формирование спика словарей по статистеке проверенных преподами домашек
  const getTeacherStatus = (data: any) => {
    const result: any = {};

    data.forEach((item: any) => {
      const teacherName = item.teacher_name;
      const status = item.status;

      if (!result[teacherName]) {
        result[teacherName] = {
          "Ментор": teacherName,
          "Всего заданий": 0,
          "Принято": 0,
          "Отклонено": 0,
          "Ждёт проверки": 0,
        };
      }

      result[teacherName]["Всего заданий"] += 1;

      if (status === "Ждет проверки") {
        result[teacherName]["Ждёт проверки"] += 1;
      } else if (status === "Отклонено") {
        result[teacherName]["Отклонено"] += 1;
      } else if (status === "Принято") {
        result[teacherName]["Принято"] += 1;
      }
    });

  return Object.values(result);
  }

  const handleExport = async () => {
      const response = await fetchHomeworks({ filters, schoolName });
      const allHomeworks = response.data ?? [];
      const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(getTeacherStatus(allHomeworks.results));
      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
      XLSX.writeFile(wb, "Домашние задания учеников.xlsx")
  };

 return (
     <Button onClick={handleExport} className={styles.students_group_header_export_button} text={''}>
         Скачать
     </Button>
 )
}

