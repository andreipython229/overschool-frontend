import { courseStatT } from '../types/courseStatT'
import { SettingItemT } from '../Pages/pageTypes'

export const generateData = (columnsList: SettingItemT[], data: courseStatT, isSuccess: boolean) => {
  const columns: Array<string> = []
  const dataToRender: any = isSuccess && data.results
  const rows = []
  columnsList &&
    columnsList.filter((item: SettingItemT) => {
      if (item.checked) {
        columns.push(item.name)
      }
    })

  for (let i = 0; i < dataToRender.length; i += 1) {
    rows.push({
      Имя: dataToRender[i].student_name,
      Email: dataToRender[i].email,
      'Суммарный балл': dataToRender[i].mark_sum,
      Курс: dataToRender[i].course_id,
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
