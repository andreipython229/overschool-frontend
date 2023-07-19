import { FC } from 'react'
import { ScoresFilter } from '../components/FiltersButton/ScoresFilter/ScoresFilter'
import { CalendarFilter } from '../components/FiltersButton/CalendarFilter/CalendarFilter'
import { SearchFilter } from '../components/FiltersButton/SearchFilter/SearchFilter'
import { CoursesDataT } from '../types/CoursesT'
import { useFetchCoursesQuery } from '../api/coursesServices'
import { useFetchLessonsQuery } from 'api/modulesServices'
import { IHomework } from 'types/sectionT'

type ComponentFilterT = {
  id: string | number
  startMark?: string | number
  endMark?: string | number
  startDate?: string | number
  endDate?: string | number
  startAvg?: string | number
  endAvg?: string | number
  handleAddAvgFilter?: (start_avg: string, end_avg: string) => void
  removeLastActiveStartFilter?: () => void
  removeLastActiveEndFilter?: () => void
  addLastActiveFilter?: (data1: string, data2: string) => void
  addMarkFilter?: (start_mark: string, end_mark: string) => void
}

export const ComponentFilter: FC<ComponentFilterT> = ({
  id,
  addLastActiveFilter,
  addMarkFilter,
  handleAddAvgFilter,
  removeLastActiveStartFilter,
  removeLastActiveEndFilter,
  ...filters
}) => {
  const { data } = useFetchCoursesQuery()
  const { data: homeworks } = useFetchLessonsQuery('homework')

  const filtersMaper: { [key: string]: JSX.Element } = {
    '7': <SearchFilter key={1} data={data?.results as CoursesDataT[]} name={''} header={'ВЫБЕРИТЕ КУРСЫ'} filterTerm="course_name" />,
    '8': <SearchFilter key={2} data={[]} name={''} header={'ВЫБЕРИТЕ ГРУППЫ'} filterTerm="group_name" />,
    '9': <SearchFilter key={3} data={homeworks as IHomework[]} name={''} header={'ВЫБЕРИТЕ ЗАДАНИЯ'} filterTerm="homework_name" />,
    '10': (
      <CalendarFilter
        addLastActiveFilter={addLastActiveFilter}
        removeLastActiveStartFilter={removeLastActiveStartFilter}
        removeLastActiveEndFilter={removeLastActiveEndFilter}
        startDate={filters.startDate}
        endDate={filters.endDate}
      />
    ),
    '11': <ScoresFilter title={'ВЫБЕРИТЕ ДИАПАЗОН БАЛЛОВ'} addMarkFilter={addMarkFilter} startMark={filters.startMark} endMark={filters.endMark} />,
    '12': <ScoresFilter title={'ВЫБЕРИТЕ ДИАПАЗОН БАЛЛОВ'} addMarkFilter={addMarkFilter} startMark={filters.startMark} endMark={filters.endMark} />,
    '14': <ScoresFilter title={'ВЫБЕРИТЕ ДИАПАЗОН ПРОГРЕССА'} />,
    '15': (
      <CalendarFilter
        addLastActiveFilter={addLastActiveFilter}
        removeLastActiveStartFilter={removeLastActiveStartFilter}
        removeLastActiveEndFilter={removeLastActiveEndFilter}
        startDate={filters.startDate}
        endDate={filters.endDate}
      />
    ),
    '16': (
      <ScoresFilter title={'ВЫБЕРИТЕ ДИАПАЗОН БАЛЛОВ'} addMarkFilter={handleAddAvgFilter} startMark={filters.startAvg} endMark={filters.endAvg} />
    ),
  }

  const filterComponent = filtersMaper[String(id)]

  return <>{filterComponent}</>
}
