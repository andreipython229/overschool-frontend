type ChipsVal = {
  [key: string]: { [key: string]: string }
}

export const chipsVal: ChipsVal = {
  homework: {
    course_name: 'курс',
    homework_name: 'задание',
    start_mark: 'оценка от',
    end_mark: 'оценка до',
    start_date: 'последний ответ с',
    end_date: 'последний ответ до',
    teacher_id: 'преподаватель (id)',
  },
  students: {
    average_mark_min: 'средний балл от',
    average_mark_max: 'средний балл до',
    mark_sum_min: 'суммарный балл от',
    mark_sum_max: 'суммарный балл до',
    last_active_min: 'последний ответ с',
    last_active_max: 'последний ответ до',
    hide_deleted: 'Скрыть удаленные',
    first_name: 'Имя',
    last_name: 'Фамилия',
    search_value: 'Поиск',
  },
}
