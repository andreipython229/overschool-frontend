import { courseStatT } from '../types/courseStatT'
import { SettingItemT, studentGroupInfoT } from '../Pages/pageTypes'
import { studentsTableInfo } from '../constants/studentTableInfo'

export const generateData = (columnsList: SettingItemT, data: courseStatT, isSuccess1: boolean, isSuccess2: boolean) => {
  const columns: Array<string> = []
  const dataToRender: any /*result[]*/ = data?.results
  const columnToRender: studentGroupInfoT[] = columnsList?.students_table_info
    ? columnsList?.students_table_info
    : studentsTableInfo.students_table_info
  const rows = []

  // isSuccess2 &&
  columnToRender.filter(({ checked, name }: studentGroupInfoT) => {
    if (checked) {
      columns.push(name)
    }
  })

  for (let i = 0; i < dataToRender?.length; i += 1) {
    rows.push({
      //[columnToRender[j].name]: dataToRender[i][columnToRender[j].name],
      Имя: dataToRender[i].student_name,
      Email: dataToRender[i].email,
      'Суммарный балл': dataToRender[i].mark_sum,
      Курс: dataToRender[i].course,
      'Последняя активность': dataToRender[i].last_active,
      Прогресс: dataToRender[i].progress,
      Комментарий: 'нет комментария',
      Группа: dataToRender[i].group,
      'Средний балл': dataToRender[i].average_mark,
      'Дата обновления': dataToRender[i].update_date,
      'Дата заверения': dataToRender[i].ending_date,
    })
  }

  return {
    columns,
    data: rows,
  }
}
