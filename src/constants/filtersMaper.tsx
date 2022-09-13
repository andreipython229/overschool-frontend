import { FC } from 'react'

import { ScoresFilter } from '../components/FiltersButton/ScoresFilter/ScoresFilter'
import { CalendarFilter } from '../components/FiltersButton/CalendarFilter/CalendarFilter'
import { SearchFilter } from '../components/FiltersButton/SearchFilter/SearchFilter'
import { allCoursesSelector } from '../selectors'
import { useAppSelector } from '../store/hooks'

type ComponentFilterT = {
  id: keyof object
}

export const ComponentFilter: FC<ComponentFilterT> = ({ id }) => {
  const { courses } = useAppSelector(allCoursesSelector)

  const filtersMaper: object = {
    7: <SearchFilter key={1} data={courses} name={''} header={'ВЫБЕРИТЕ КУРСЫ'} />,
    8: <SearchFilter key={2} data={[]} name={''} header={'ВЫБЕРИТЕ ГРУППЫ'} />,
    9: <SearchFilter key={3} data={[]} name={''} header={'ВЫБЕРИТЕ ЗАДАНИЯ'} />,
    10: <CalendarFilter />,
    11: <ScoresFilter title={'ВЫБЕРИТЕ ДИАПАЗОН БАЛЛОВ'} />,
    12: <ScoresFilter title={'ВЫБЕРИТЕ ДИАПАЗОН БАЛЛОВ'} />,
    13: <ScoresFilter title={'ВЫБЕРИТЕ ДИАПАЗОН ПРОГРЕССА'} />,
    14: <CalendarFilter />,
    15: <SearchFilter key={4} data={[]} name={''} header={'ПОИСК ПО КОММЕНТАРИЯМ'} />,
  }
  return id && filtersMaper[id]
}
