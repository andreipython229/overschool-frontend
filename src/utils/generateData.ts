import { studentList } from '../components/StudentsTableBlock/mokData'
import { SettingItemT } from '../Pages/CoursesStats/CoursesStats'

export const generateData = (totalRows: number, columnsList: SettingItemT[]) => {
  const columns: Array<string> = []
  const rows = []
  columnsList &&
    columnsList.filter((item: SettingItemT) => {
      if (item.checked) {
        columns.push(item.name)
      }
    })
  for (let i = 0; i < totalRows; i += 1) {
    rows.push({
      Имя: studentList[i].name,
      Email: studentList[i].email,
      'Суммарный балл': studentList[i].totalScore,
      Курс: studentList[i].course,
      'Последняя активность': studentList[i].lastActivity,
      Прогресс: studentList[i].progress,
      Комментарий: studentList[i].comments,
      Группа: studentList[i].group,
      'Средний балл': studentList[i].averageScore,
      'Дата обновления': studentList[i].updateDate,
      'Дата заверения': studentList[i].completionDate,
    })
  }

  return {
    columns,
    data: rows,
  }
}
