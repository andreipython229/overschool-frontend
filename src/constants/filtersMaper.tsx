import { FC } from 'react'
import { ScoresFilter } from '../components/FiltersButton/ScoresFilter/ScoresFilter'
import { CalendarFilter } from '../components/FiltersButton/CalendarFilter/CalendarFilter'
import { SearchFilter } from '../components/FiltersButton/SearchFilter/SearchFilter'
import { SearchFilterGroup } from '../components/FiltersButton/SearchFilterGroup/SearchFilterGroup'
import { CoursesDataT } from '../types/CoursesT'
import { useFetchCoursesQuery } from '../api/coursesServices'
import { useFetchStudentsGroupQuery } from '../api/studentsGroupService'
import { useFetchLessonsQuery } from 'api/modulesServices'
import { IHomework } from 'types/sectionT'
import { studentsGroupsT } from 'types/studentsGroup'
import { useFetchStudentsDataPerSchoolQuery } from 'api/schoolHeaderService'
import { ShowDeletedFilter } from '../components/FiltersButton/FilterComponent/FilterComponent'
import { StatusFilter } from 'components/FiltersButton/StatusFilter'

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
  onChangeStatus?: (status: string) => void
}

export const ComponentFilter: FC<ComponentFilterT> = ({
  id,
  addLastActiveFilter,
  addMarkFilter,
  handleAddAvgFilter,
  removeLastActiveStartFilter,
  removeLastActiveEndFilter,
  onChangeStatus,
  ...filters
}) => {
  const schoolName = window.location.href.split('/')[4]
  const schoolId = localStorage.getItem('school_id')
  const { data } = useFetchCoursesQuery(schoolName)
  const { data: homeworks } = useFetchLessonsQuery({ type: 'homework', schoolName })
  const { data: groups } = useFetchStudentsGroupQuery(schoolName)
  const { data: users } = useFetchStudentsDataPerSchoolQuery({ id: schoolId })
  const firstNames = users?.results.map(user => ({ name: user.first_name }))
  const lastNames = users?.results.map(user => ({ name: user.last_name }))

  const filtersMaper: { [key: string]: JSX.Element } = {
    // Фильтра домашек
    // '5': <SearchFilter key={2} filterKey={'homework'} data={firstNames && firstNames.length > 0 ? firstNames : []} name={''} header={'ВВЕДИТЕ ИМЯ'} filterTerm="first_name" />,
    // '6': <SearchFilter key={1} filterKey={'homework'} data={lastNames && lastNames.length > 0 ? lastNames : []} name={''} header={'ВВЕДИТЕ ФАМИЛИЮ'} filterTerm="last_name" />,
    '5': <StatusFilter onChangeStatus={onChangeStatus} />,
    '7': (
      <SearchFilter
        key={1}
        filterKey={'homework'}
        data={data?.results as CoursesDataT[]}
        name={''}
        header={'ВЫБЕРИТЕ КУРСЫ'}
        filterTerm="course_name"
      />
    ),
    '8': (
      <SearchFilterGroup
        key={2}
        filterKey={'homework'}
        data={groups?.results as studentsGroupsT[]}
        name={''}
        header={'ВЫБЕРИТЕ ГРУППЫ'}
        filterTerm="group_name"
      />
    ),
    '9': (
      <SearchFilter key={3} filterKey={'homework'} data={homeworks as IHomework[]} name={''} header={'ВЫБЕРИТЕ ЗАДАНИЯ'} filterTerm="homework_name" />
    ),
    '10': (
      <CalendarFilter
        addLastActiveFilter={addLastActiveFilter}
        removeLastActiveStartFilter={removeLastActiveStartFilter}
        removeLastActiveEndFilter={removeLastActiveEndFilter}
        startDate={filters.startDate}
        endDate={filters.endDate}
      />
    ),
    '11': <ScoresFilter title={'Выберите диапазон баллов:'} addMarkFilter={addMarkFilter} startMark={filters.startMark} endMark={filters.endMark} />,
    // '21': <SearchFilter key={1} filterKey={'homework'} data={lastNames && lastNames.length > 0 ? lastNames : []} name={''} header={'ВВЕДИТЕ ФАМИЛИЮ'} filterTerm="last_name" />,
    // '22': <SearchFilter key={2} filterKey={'homework'} data={firstNames && firstNames.length > 0 ? firstNames : []} name={''} header={'ВВЕДИТЕ ИМЯ'} filterTerm="first_name" />,

    // Фильтра всех студентов школы
    '12': <ScoresFilter title={'Выберите диапазон баллов:'} addMarkFilter={addMarkFilter} startMark={filters.startMark} endMark={filters.endMark} />,
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
      <ScoresFilter title={'Выберите диапазон баллов:'} addMarkFilter={handleAddAvgFilter} startMark={filters.startAvg} endMark={filters.endAvg} />
    ),
    '17': (
      <SearchFilter
        key={3}
        filterKey={'studentsPerSchool'}
        data={data?.results as CoursesDataT[]}
        name={''}
        header={'ВЫБЕРИТЕ КУРСЫ'}
        filterTerm="course_name"
      />
    ),
    '18': (
      <SearchFilterGroup
        key={4}
        filterKey={'studentsPerSchool'}
        data={groups?.results as studentsGroupsT[]}
        name={''}
        header={'ВЫБЕРИТЕ ГРУППЫ'}
        filterTerm="group_name"
      />
    ),
    '19': (
      <SearchFilter
        key={1}
        filterKey={'studentsPerSchool'}
        data={lastNames && lastNames.length > 0 ? lastNames : []}
        name={''}
        header={'ВВЕДИТЕ ФАМИЛИЮ'}
        filterTerm="last_name"
      />
    ),
    '20': (
      <SearchFilter
        key={2}
        filterKey={'studentsPerSchool'}
        data={firstNames && firstNames.length > 0 ? firstNames : []}
        name={''}
        header={'ВВЕДИТЕ ИМЯ'}
        filterTerm="first_name"
      />
    ),

    // Фильтра всех студентов курса
    '23': <ScoresFilter title={'ВЫБЕРИТЕ ДИАПАЗОН БАЛЛОВ'} addMarkFilter={addMarkFilter} startMark={filters.startMark} endMark={filters.endMark} />,
    '24': <ScoresFilter title={'ВЫБЕРИТЕ ДИАПАЗОН ПРОГРЕССА'} />,
    '25': (
      <CalendarFilter
        addLastActiveFilter={addLastActiveFilter}
        removeLastActiveStartFilter={removeLastActiveStartFilter}
        removeLastActiveEndFilter={removeLastActiveEndFilter}
        startDate={filters.startDate}
        endDate={filters.endDate}
      />
    ),
    '26': (
      <ScoresFilter title={'ВЫБЕРИТЕ ДИАПАЗОН БАЛЛОВ'} addMarkFilter={handleAddAvgFilter} startMark={filters.startAvg} endMark={filters.endAvg} />
    ),
    '28': (
      <SearchFilterGroup
        key={4}
        filterKey={'studentsPerCourse'}
        data={groups?.results as studentsGroupsT[]}
        name={''}
        header={'ВЫБЕРИТЕ ГРУППЫ'}
        filterTerm="group_name"
      />
    ),
    '29': (
      <SearchFilter
        key={1}
        filterKey={'studentsPerCourse'}
        data={lastNames && lastNames.length > 0 ? lastNames : []}
        name={''}
        header={'ВВЕДИТЕ ФАМИЛИЮ'}
        filterTerm="last_name"
      />
    ),
    '30': (
      <SearchFilter
        key={2}
        filterKey={'studentsPerCourse'}
        data={firstNames && firstNames.length > 0 ? firstNames : []}
        name={''}
        header={'ВВЕДИТЕ ИМЯ'}
        filterTerm="first_name"
      />
    ),

    // Фильтра студентов группы
    '31': <ScoresFilter title={'ВЫБЕРИТЕ ДИАПАЗОН БАЛЛОВ'} addMarkFilter={addMarkFilter} startMark={filters.startMark} endMark={filters.endMark} />,
    '32': <ScoresFilter title={'ВЫБЕРИТЕ ДИАПАЗОН ПРОГРЕССА'} />,
    '33': (
      <CalendarFilter
        addLastActiveFilter={addLastActiveFilter}
        removeLastActiveStartFilter={removeLastActiveStartFilter}
        removeLastActiveEndFilter={removeLastActiveEndFilter}
        startDate={filters.startDate}
        endDate={filters.endDate}
      />
    ),
    '34': (
      <ScoresFilter title={'ВЫБЕРИТЕ ДИАПАЗОН БАЛЛОВ'} addMarkFilter={handleAddAvgFilter} startMark={filters.startAvg} endMark={filters.endAvg} />
    ),
    '37': (
      <SearchFilter
        key={1}
        filterKey={'studentsPerGroup'}
        data={lastNames && lastNames.length > 0 ? lastNames : []}
        name={''}
        header={'ВВЕДИТЕ ФАМИЛИЮ'}
        filterTerm="last_name"
      />
    ),
    '38': (
      <SearchFilter
        key={2}
        filterKey={'studentsPerGroup'}
        data={firstNames && firstNames.length > 0 ? firstNames : []}
        name={''}
        header={'ВВЕДИТЕ ИМЯ'}
        filterTerm="first_name"
      />
    ),

    '40': <ShowDeletedFilter filterKey={'studentsPerSchool'} />,
    '41': <ShowDeletedFilter filterKey={'studentsPerCourse'} />,
    '42': <ShowDeletedFilter filterKey={'studentsPerGroup'} />,
  }

  const filterComponent = filtersMaper[String(id)]

  return <>{filterComponent}</>
}
