import { FC } from 'react';
import { ScoresFilter } from '../components/FiltersButton/ScoresFilter/ScoresFilter';
import { CalendarFilter } from '../components/FiltersButton/CalendarFilter/CalendarFilter';
import { SearchFilter } from '../components/FiltersButton/SearchFilter/SearchFilter';
import { CoursesDataT } from '../types/CoursesT';
import { useFetchCoursesQuery } from '../api/coursesServices';
import { useFetchLessonsQuery } from 'api/modulesServices';
import { IHomework } from 'types/sectionT';

type ComponentFilterT = {
  id: string | number;
};

export const ComponentFilter: FC<ComponentFilterT> = ({ id }) => {
  const { data } = useFetchCoursesQuery();
  const { data: homeworks } = useFetchLessonsQuery('homework');

  const filtersMaper: { [key: string]: JSX.Element } = {
    '7': <SearchFilter key={1} data={data?.results as CoursesDataT[]} name={''} header={'ВЫБЕРИТЕ КУРСЫ'} filterTerm="course_name" />,
    '8': <SearchFilter key={2} data={[]} name={''} header={'ВЫБЕРИТЕ ГРУППЫ'} filterTerm="group_name" />,
    '9': <SearchFilter key={3} data={homeworks as IHomework[]} name={''} header={'ВЫБЕРИТЕ ЗАДАНИЯ'} filterTerm="homework_name" />,
    '10': <CalendarFilter />,
    '11': <ScoresFilter title={'ВЫБЕРИТЕ ДИАПАЗОН БАЛЛОВ'} />,
    '12': <ScoresFilter title={'ВЫБЕРИТЕ ДИАПАЗОН БАЛЛОВ'} />,
    '13': <ScoresFilter title={'ВЫБЕРИТЕ ДИАПАЗОН ПРОГРЕССА'} />,
    '14': <CalendarFilter />,
    '15': <SearchFilter key={4} data={[]} name={''} header={'ПОИСК ПО КОММЕНТАРИЯМ'} filterTerm="" />,
  };

  const filterComponent = filtersMaper[String(id)];

  return <>{filterComponent}</>;
};
