import { studentsTableInfoT } from '../types/courseStatT'
import { studentsTableHeader, studentGroupInfoT } from 'types/studentsGroup'

export const generateData = (columnsList: studentsTableHeader | undefined, data: studentsTableInfoT, isSuccess1: boolean, isSuccess2: boolean) => {
  const columns: Array<string> = []
  const dataToRender: any /*result[]*/ = data
  const columnToRender = columnsList?.students_table_info
  const rows = []
  const ids = []

  isSuccess2 &&
    columnToRender?.filter(({ checked, name }: studentGroupInfoT) => {
      if (checked) {
        columns.push(name)
      }
    })

  for (let i = 0; i < dataToRender?.length; i += 1) {
    rows.push({
      Имя: {
        name: `${dataToRender[i].first_name || 'Без'} ${dataToRender[i].last_name || 'Имени'}`,
        avatar: dataToRender[i].avatar,
      },
      Email: dataToRender[i].email,
      'Суммарный балл': dataToRender[i].total_points,
      Курс: dataToRender[i].course_name,
      'Последняя активность': dataToRender[i].last_activity,
      // Прогресс: dataToRender[i].progress,
      Группа: dataToRender[i].group_name,
      // 'Средний балл': dataToRender[i].average_mark,
      'Дата обновления': dataToRender[i].course_updated_at,
      // 'Дата заверения': dataToRender[i].ending_date,
    })
    ids.push(dataToRender[i].id)
  }

  return {
    columns,
    data: rows,
    ids,
  }
}
