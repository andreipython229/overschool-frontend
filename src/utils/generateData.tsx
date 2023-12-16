import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { studentsTableInfoT } from '../types/courseStatT'
import { studentsTableHeader } from 'types/studentsGroup'
import { tableBallsStarPath } from 'config/commonSvgIconsPath'
import { convertDate } from './convertDate'
import { Avatar } from 'components/Avatar'
import { GenerateRow } from 'components/StudentsTableWrapper/types'

export const generateData = (columnsList: studentsTableHeader | undefined, data: studentsTableInfoT, isSuccess1: boolean, isSuccess2: boolean) => {
  const columns: string[] = []
  const dataToRender: any /*result[]*/ = data
  const columnToRender = columnsList?.students_table_info
  const rows: GenerateRow[] = []

  isSuccess2 &&
    columnToRender?.filter(({ checked, name }) => {
      if (checked) {
        columns.push(name)
      }
    })

  for (let i = 0; i < dataToRender?.length; i += 1) {
    const { mmddyyyy, hoursAndMinutes } = convertDate(new Date(dataToRender[i].last_active || ''))

    // Дата добавления в группу
    const dateAdded = dataToRender[i].date_added;
    const { mmddyyyy: added_date, hoursAndMinutes: added_time } = dateAdded ?
          convertDate(new Date(dateAdded)) :
          { mmddyyyy: '', hoursAndMinutes: '' };

    // Дата удаления из группы
    const dateRemoved = dataToRender[i].date_removed;
    const { mmddyyyy: removed_date, hoursAndMinutes: removed_time } = dateRemoved ?
          convertDate(new Date(dateRemoved)) :
          { mmddyyyy: '', hoursAndMinutes: '' };


    const row: GenerateRow = {
      Имя: {
        // name: `${dataToRender[i].first_name || 'Без'} ${dataToRender[i].last_name || 'Имени'}`,
        name: (dataToRender[i].last_name && dataToRender[i].first_name) ? `${dataToRender[i].last_name}  ${dataToRender[i].first_name}` :
                        (dataToRender[i].last_name || dataToRender[i].first_name || "Нет имени"),
        avatar: dataToRender[i].avatar,
      },
      Email: dataToRender[i].email,
      'Суммарный балл': dataToRender[i].mark_sum ?? 0,
      'Средний балл': dataToRender[i].average_mark?.toFixed(0) ?? 0,
      Курс: dataToRender[i].course_name,
      'Дата регистрации': `${mmddyyyy} в ${hoursAndMinutes}`,
      Группа: dataToRender[i].group_name,
      'Дата добавления в группу': `${added_date} ${added_time}`,
      'Дата удаления из группы': `${removed_date} ${removed_time}`,
      'Прогресс': `${dataToRender[i].progress}%`
    }

    Object.entries(row).forEach(([key, value]) => {
      if (key === 'Имя' && typeof value === 'object') {
        const { name, avatar } = value as { name: string; avatar: string }
        const nameSurname = name.split(' ')
        row[key] = {
          text: name,
          image: <Avatar width={'2.5rem'} height={'2.5rem'} name={nameSurname[1]} surname={nameSurname[0]} avatar={avatar} />,
        }
      } else if (key === 'Суммарный балл') {
        row[key] = {
          text: value as string,
          image: <IconSvg width={16} height={15} viewBoxSize="0 0 16 15" path={tableBallsStarPath} />,
        }
      } else if (key === 'Средний балл') {
        row[key] = {
          text: value as string,
          image: <IconSvg width={16} height={15} viewBoxSize="0 0 16 15" path={tableBallsStarPath} />,
        }
      }
    })

    rows.push(row)
  }

  return {
    columns,
    data: rows,
  }
}
